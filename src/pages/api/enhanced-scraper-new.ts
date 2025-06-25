import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';
import { connectToDB } from '../../../lib/utils/database';
import Image, { IImage } from '../../../lib/models/Image';
import { validateUrl, normalizeImageUrl, isValidImageUrl } from '../../../lib/utils/scrapeUtils';
import { downloadImage } from '../../../lib/utils/imageUtils';

interface ApiResponse {
  success: boolean;
  message?: string;
  images?: Partial<IImage>[];
  count?: number;
  downloaded?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { url, downloadImages = false } = req.body;

  if (!url || !validateUrl(url)) {
    return res.status(400).json({ success: false, message: 'Valid URL is required' });
  }

  try {
    await connectToDB();

    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const images: Partial<IImage>[] = [];
    let downloadCount = 0;

    $('img').each((_, element) => {
      const imgSrc = $(element).attr('src');
      const imgAlt = $(element).attr('alt') || '';
      
      if (imgSrc) {
        const fullUrl = normalizeImageUrl(imgSrc, url);
        
        if (isValidImageUrl(fullUrl)) {
          images.push({
            url: fullUrl,
            sourceUrl: url,
            altText: imgAlt,
            scrapedAt: new Date()
          });
        }
      }
    });

    // Save to database
    if (images.length > 0) {
      await Image.insertMany(images);
    }

    // Download images if requested
    if (downloadImages && images.length > 0) {
      const downloadDir = path.join(process.cwd(), 'public', 'uploads');
      
      for (const image of images.slice(0, 10)) { // Limit to 10 downloads
        try {
          if (image.url) {
            const filename = `scraped_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
            await downloadImage(image.url, filename, downloadDir);
            downloadCount++;
          }
        } catch (error) {
          console.error('Download failed:', error);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: `Scraped ${images.length} images from ${url}`,
      images,
      count: images.length,
      downloaded: downloadCount
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to scrape images',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
