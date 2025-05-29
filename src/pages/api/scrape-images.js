import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { url, filters } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required' });
  }

  try {
    // Validate URL
    const parsedUrl = new URL(url);
    
    // Set up axios with proper headers to avoid being blocked
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 30000, // 30 seconds timeout
      maxRedirects: 5,
    });

    // Parse HTML content
    const $ = cheerio.load(response.data);
    const imageUrls = [];
    const seenUrls = new Set();

    // Find all img tags
    $('img').each((index, element) => {
      const src = $(element).attr('src');
      const dataSrc = $(element).attr('data-src'); // For lazy loaded images
      const srcset = $(element).attr('srcset');
      
      const sources = [];
      
      // Add src if exists
      if (src) sources.push(src);
      
      // Add data-src if exists (lazy loading)
      if (dataSrc) sources.push(dataSrc);
      
      // Parse srcset if exists
      if (srcset) {
        const srcsetUrls = srcset.split(',').map(s => s.trim().split(' ')[0]);
        sources.push(...srcsetUrls);
      }

      sources.forEach(source => {
        if (!source || source.startsWith('data:')) return;
        
        try {
          // Make URL absolute
          const absoluteUrl = new URL(source, parsedUrl.origin).href;
          
          // Avoid duplicates
          if (seenUrls.has(absoluteUrl)) return;
          seenUrls.add(absoluteUrl);
          
          // Get file extension
          const urlPath = new URL(absoluteUrl).pathname;
          const extension = urlPath.split('.').pop()?.toLowerCase();
          
          // Check if format is allowed
          if (!filters.formats.includes(extension)) return;
          
          imageUrls.push({
            url: absoluteUrl,
            filename: urlPath.split('/').pop() || `image-${index}.${extension}`,
            extension: extension,
            alt: $(element).attr('alt') || '',
            title: $(element).attr('title') || ''
          });
        } catch (error) {
          // Skip invalid URLs
          console.warn('Skipping invalid URL:', source);
        }
      });
    });

    // Also check for CSS background images
    $('*').each((index, element) => {
      const style = $(element).attr('style');
      if (style && style.includes('background-image')) {
        const matches = style.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi);
        if (matches) {
          matches.forEach(match => {
            const urlMatch = match.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
              try {
                const absoluteUrl = new URL(urlMatch[1], parsedUrl.origin).href;
                
                if (seenUrls.has(absoluteUrl)) return;
                seenUrls.add(absoluteUrl);
                
                const urlPath = new URL(absoluteUrl).pathname;
                const extension = urlPath.split('.').pop()?.toLowerCase();
                
                if (!filters.formats.includes(extension)) return;
                
                imageUrls.push({
                  url: absoluteUrl,
                  filename: urlPath.split('/').pop() || `bg-image-${index}.${extension}`,
                  extension: extension,
                  alt: 'Background image',
                  title: 'CSS background image'
                });
              } catch (error) {
                console.warn('Skipping invalid background URL:', urlMatch[1]);
              }
            }
          });
        }
      }
    });

    // Get image metadata for filtering
    const imagePromises = imageUrls.slice(0, 50).map(async (img) => { // Limit to 50 images to avoid timeout
      try {
        const headResponse = await axios.head(img.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 10000,
        });

        const contentLength = parseInt(headResponse.headers['content-length']) || 0;
        const contentType = headResponse.headers['content-type'] || '';

        // Basic validation
        if (!contentType.startsWith('image/')) {
          return null;
        }

        const sizeInKB = Math.round(contentLength / 1024);

        // Apply size filters
        if (sizeInKB < filters.minFileSize || sizeInKB > filters.maxFileSize) {
          return null;
        }

        // Try to get image dimensions (this is a simplified approach)
        // In a real implementation, you might want to download and analyze the image
        return {
          ...img,
          size: contentLength,
          sizeKB: sizeInKB,
          contentType,
          width: null, // Would need image processing for actual dimensions
          height: null,
        };
      } catch (error) {
        console.warn('Failed to get metadata for:', img.url);
        return null;
      }
    });

    const imagesWithMetadata = (await Promise.all(imagePromises)).filter(Boolean);

    res.status(200).json({
      success: true,
      images: imagesWithMetadata,
      total: imagesWithMetadata.length,
      sourceUrl: url,
    });

  } catch (error) {
    console.error('Error scraping images:', error);
    
    let errorMessage = 'Failed to scrape images';
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Website not found. Please check the URL.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. The website may be slow or unresponsive.';
    } else if (error.response) {
      errorMessage = `Website returned error: ${error.response.status}`;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
}

export const config = {
  api: {
    responseLimit: '10mb',
  },
};
