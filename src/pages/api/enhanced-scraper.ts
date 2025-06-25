import { NextApiRequest, NextApiResponse } from 'next';
import { scrapeImages, ScrapeOptions } from '../../../lib/utils/scrapeUtils';
import { downloadImage } from '../../../lib/utils/imageUtils';

export interface ScrapeApiRequest {
  url: string;
  options?: ScrapeOptions;
}

export interface ScrapeApiResponse {
  success: boolean;
  data?: {
    images: Array<{
      url: string;
      alt?: string;
      localPath?: string;
      filename?: string;
    }>;
    metadata: {
      url: string;
      title?: string;
      description?: string;
      scrapedAt: string;
      totalImages: number;
    };
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapeApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { url, options = {} }: ScrapeApiRequest = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    console.log(`Scraping images from: ${url}`);
    
    // Set default options for API usage
    const defaultApiOptions: ScrapeOptions = {
      maxImages: 20,
      minWidth: 200,
      minHeight: 200,
      downloadImages: true,
      outputDir: './public/uploads',
      timeout: 30000,
      ...options
    };

    // Scrape images using our utility
    const result = await scrapeImages(url, defaultApiOptions);

    console.log(`Successfully scraped ${result.images.length} images`);

    return res.status(200).json({
      success: true,
      data: {
        images: result.images,
        metadata: {
          ...result.metadata,
          scrapedAt: result.metadata.scrapedAt.toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Scraping error:', error);
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}

// Example usage in frontend:
/*
const response = await fetch('/api/enhanced-scraper', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    options: {
      maxImages: 10,
      minWidth: 300,
      minHeight: 300,
      downloadImages: true
    }
  })
});

const result = await response.json();
if (result.success) {
  console.log('Scraped images:', result.data.images);
} else {
  console.error('Scraping failed:', result.error);
}
*/
