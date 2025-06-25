import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface ScrapedImage {
  url: string;
  alt?: string;
  localPath?: string;
  filename?: string;
}

export interface ScrapeResult {
  images: ScrapedImage[];
  metadata: {
    url: string;
    title?: string;
    description?: string;
    scrapedAt: Date;
    totalImages: number;
  };
}

export interface ScrapeOptions {
  maxImages?: number;
  minWidth?: number;
  minHeight?: number;
  downloadImages?: boolean;
  outputDir?: string;
  timeout?: number;
  waitForSelector?: string;
  userAgent?: string;
}

const DEFAULT_OPTIONS: Required<ScrapeOptions> = {
  maxImages: 50,
  minWidth: 100,
  minHeight: 100,
  downloadImages: true,
  outputDir: './public/uploads',
  timeout: 30000,
  waitForSelector: 'img',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

export async function scrapeImages(url: string, options: ScrapeOptions = {}): Promise<ScrapeResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  console.log(`Starting scrape of: ${url}`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent(opts.userAgent);
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the page
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: opts.timeout 
    });
    
    // Wait for images to load
    try {
      await page.waitForSelector(opts.waitForSelector, { timeout: 5000 });
    } catch (e) {
      console.warn('Timeout waiting for selector, continuing anyway');
    }
    
    // Get page metadata
    const metadata = await page.evaluate(() => {
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || undefined
      };
    });
    
    // Extract image information
    const images = await page.evaluate((minWidth: number, minHeight: number) => {
      const imgElements = Array.from(document.querySelectorAll('img'));
      
      return imgElements
        .map(img => {
          // Get computed style to check actual dimensions
          const rect = img.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(img);
          
          return {
            url: img.src,
            alt: img.alt || undefined,
            width: rect.width,
            height: rect.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayStyle: computedStyle.display
          };
        })
        .filter(img => 
          img.url && 
          img.url.startsWith('http') &&
          img.naturalWidth >= minWidth && 
          img.naturalHeight >= minHeight &&
          img.displayStyle !== 'none'
        )
        .map(img => ({
          url: img.url,
          alt: img.alt
        }));
    }, opts.minWidth, opts.minHeight);
    
    console.log(`Found ${images.length} qualifying images`);
    
    // Limit the number of images
    const limitedImages = images.slice(0, opts.maxImages);
    
    let processedImages: ScrapedImage[] = limitedImages;
    
    // Download images if requested
    if (opts.downloadImages) {
      processedImages = await downloadImages(limitedImages, opts.outputDir);
    }
    
    const result: ScrapeResult = {
      images: processedImages,
      metadata: {
        url,
        title: metadata.title,
        description: metadata.description,
        scrapedAt: new Date(),
        totalImages: limitedImages.length
      }
    };
    
    console.log(`Scrape completed. Processed ${processedImages.length} images`);
    return result;
    
  } finally {
    await browser.close();
  }
}

async function downloadImages(images: ScrapedImage[], outputDir: string): Promise<ScrapedImage[]> {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  const downloadPromises = images.map(async (image) => {
    try {
      console.log(`Downloading: ${image.url}`);
      
      const response = await fetch(image.url);
      if (!response.ok) {
        console.warn(`Failed to download ${image.url}: ${response.status}`);
        return image;
      }
      
      const buffer = await response.arrayBuffer();
      
      // Generate filename
      const urlObj = new URL(image.url);
      const originalExt = path.extname(urlObj.pathname) || '.jpg';
      const filename = `scraped_${Date.now()}_${uuidv4().substring(0, 9)}${originalExt}`;
      const localPath = path.join(outputDir, filename);
      
      // Save file
      await fs.writeFile(localPath, Buffer.from(buffer));
      
      console.log(`Saved: ${filename}`);
      
      return {
        ...image,
        filename,
        localPath: localPath.replace(/^\.\/public/, '') // Remove ./public prefix for web access
      };
      
    } catch (error) {
      console.error(`Error downloading ${image.url}:`, error);
      return image;
    }
  });
  
  return Promise.all(downloadPromises);
}

export async function scrapeWebsite(url: string, options: ScrapeOptions = {}): Promise<ScrapeResult> {
  try {
    // Validate URL
    new URL(url);
    
    return await scrapeImages(url, options);
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error(`Failed to scrape ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function normalizeImageUrl(imageUrl: string, baseUrl: string): string {
  try {
    return new URL(imageUrl, baseUrl).href;
  } catch {
    return imageUrl;
  }
}

export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    
    return imageExtensions.some(ext => pathname.endsWith(ext)) ||
           urlObj.hostname.includes('images') ||
           urlObj.pathname.includes('/image') ||
           urlObj.searchParams.has('format');
  } catch {
    return false;
  }
}

export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Server-side - use a placeholder or implement server-side image analysis
      resolve({ width: 0, height: 0 });
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}
