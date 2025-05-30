import { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { URL } from 'url';

interface ScrapeFilters {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  minFileSize: number; // in KB
  maxFileSize: number; // in KB
  formats: string[];
  includeAltText: boolean;
  includeVideos: boolean;
}

interface ScrapedMedia {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  dimensions?: { width: number; height: number };
  fileSize: number;
  alt: string;
  selected: boolean;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, filters }: { url: string; filters?: ScrapeFilters } = req.body;
    
    console.log('Scraper API called with:', { url, filters });

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Provide default filters if not provided
    const defaultFilters: ScrapeFilters = {
      minWidth: 0,
      maxWidth: 5000,
      minHeight: 0,
      maxHeight: 5000,
      minFileSize: 0,
      maxFileSize: 10000,
      formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg'],
      includeAltText: true,
      includeVideos: false
    };

    const activeFilters = filters ? { ...defaultFilters, ...filters } : defaultFilters;

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 30000,
      maxRedirects: 10,
      validateStatus: function (status) {
        return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
      }
    });

    const $ = cheerio.load(response.data);
    const scrapedMedia: ScrapedMedia[] = [];

    // Extract images
    $('img').each((index, element) => {
      const $img = $(element);
      let src = $img.attr('src') || $img.attr('data-src') || $img.attr('data-lazy');
      
      if (!src) return;

      // Convert relative URLs to absolute
      if (src.startsWith('//')) {
        src = parsedUrl.protocol + src;
      } else if (src.startsWith('/')) {
        src = `${parsedUrl.protocol}//${parsedUrl.host}${src}`;
      } else if (!src.startsWith('http')) {
        src = `${parsedUrl.protocol}//${parsedUrl.host}/${src}`;
      }

      const alt = activeFilters.includeAltText ? ($img.attr('alt') || '') : '';
      const name = src.split('/').pop()?.split('?')[0] || `image-${index}`;
      
      // Check file format
      const extension = name.split('.').pop()?.toLowerCase();
      if (extension && !activeFilters.formats.includes(extension)) {
        return;
      }

      scrapedMedia.push({
        id: `img-${index}-${Date.now()}`,
        url: src,
        name,
        type: 'image',
        fileSize: 0, // Will be determined when actually downloading
        alt,
        selected: false
      });
    });

    // Extract videos if enabled
    if (activeFilters.includeVideos) {
      $('video source, video').each((index, element) => {
        const $video = $(element);
        let src = $video.attr('src');
        
        if (!src) return;

        // Convert relative URLs to absolute
        if (src.startsWith('//')) {
          src = parsedUrl.protocol + src;
        } else if (src.startsWith('/')) {
          src = `${parsedUrl.protocol}//${parsedUrl.host}${src}`;
        } else if (!src.startsWith('http')) {
          src = `${parsedUrl.protocol}//${parsedUrl.host}/${src}`;
        }

        const name = src.split('/').pop()?.split('?')[0] || `video-${index}`;

        scrapedMedia.push({
          id: `video-${index}-${Date.now()}`,
          url: src,
          name,
          type: 'video',
          fileSize: 0,
          alt: '',
          selected: false
        });
      });
    }

    // Validate and get metadata for each media item
    const validatedMedia = await Promise.all(
      scrapedMedia.slice(0, 50).map(async (media) => { // Limit to 50 items for performance
        try {
          const headResponse = await axios.head(media.url, {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const contentLength = parseInt(headResponse.headers['content-length'] || '0');
          const fileSizeKB = Math.round(contentLength / 1024);

          // Apply size filters
          if (fileSizeKB < activeFilters.minFileSize || fileSizeKB > activeFilters.maxFileSize) {
            return null;
          }

          // For images, try to get dimensions
          if (media.type === 'image') {
            // This is a simplified approach - in a real implementation, 
            // you might want to use a library like sharp or jimp to get actual dimensions
            return {
              ...media,
              fileSize: fileSizeKB,
              dimensions: { width: 0, height: 0 } // Placeholder
            };
          }

          return {
            ...media,
            fileSize: fileSizeKB
          };
        } catch (error) {
          return {
            ...media,
            error: 'Failed to load media',
            fileSize: 0
          };
        }
      })
    );

    // Filter out null results and apply additional filters
    const finalMedia = validatedMedia
      .filter((media): media is ScrapedMedia => media !== null)
      .filter(media => {
        if (media.error) return true; // Keep error items to show user

        // Apply dimension filters for images
        if (media.type === 'image' && media.dimensions) {
          const { width, height } = media.dimensions;
          if (width < activeFilters.minWidth || width > activeFilters.maxWidth ||
              height < activeFilters.minHeight || height > activeFilters.maxHeight) {
            return false;
          }
        }

        return true;
      });

    res.status(200).json({
      success: true,
      media: finalMedia,
      totalFound: scrapedMedia.length,
      totalValid: finalMedia.filter(m => !m.error).length
    });
    
    console.log('Scraper completed successfully:', {
      totalFound: scrapedMedia.length,
      totalValid: finalMedia.filter(m => !m.error).length
    });

  } catch (error) {
    console.error('Scraping error:', error);
    
    let errorMessage = 'Failed to scrape media';
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ENOTFOUND') {
        errorMessage = 'Website not found. Please check the URL.';
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage = 'Request timed out. The website may be slow or unresponsive.';
      } else if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          errorMessage = 'Access denied. The website may be blocking automated requests.';
        } else if (status === 404) {
          errorMessage = 'Page not found. Please check the URL.';
        } else if (status >= 500) {
          errorMessage = 'The website is experiencing server issues.';
        } else {
          errorMessage = `Website returned error: ${status}`;
        }
      } else {
        errorMessage = 'Network error. Please check your connection.';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
