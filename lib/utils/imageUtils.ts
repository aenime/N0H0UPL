import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface ImageDownloadResult {
  success: boolean;
  localPath?: string;
  filename?: string;
  error?: string;
}

export async function downloadImage(
  imageUrl: string,
  outputDir: string = './public/uploads',
  filename?: string
): Promise<ImageDownloadResult> {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Generate filename if not provided
    if (!filename) {
      const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
      filename = `downloaded_${Date.now()}_${uuidv4().slice(0, 8)}${extension}`;
    }

    const localPath = path.join(outputDir, filename);

    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(localPath, Buffer.from(buffer));

    return {
      success: true,
      localPath,
      filename
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export function validateImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

export function normalizeImageUrl(url: string, baseUrl?: string): string {
  try {
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a protocol-relative URL, add https
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // If it's a relative URL and we have a base URL, resolve it
    if (baseUrl) {
      return new URL(url, baseUrl).href;
    }
    
    return url;
  } catch {
    return url;
  }
}

export function getImageExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const extension = path.extname(pathname).toLowerCase();
    
    // Common image extensions
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    
    if (validExtensions.includes(extension)) {
      return extension;
    }
    
    // Default to .jpg if no valid extension found
    return '.jpg';
  } catch {
    return '.jpg';
  }
}

export interface ImageMetadata {
  width?: number;
  height?: number;
  size?: number;
  format?: string;
}

export async function extractImageMetadata(imagePath: string): Promise<ImageMetadata> {
  try {
    const stats = await fs.stat(imagePath);
    return {
      size: stats.size,
      format: path.extname(imagePath).toLowerCase().slice(1)
    };
  } catch {
    return {};
  }
}
