import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

interface ScrapedMedia {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  dimensions?: { width: number; height: number };
  fileSize: number;
  alt: string;
}

interface ImportedMedia {
  id: string;
  name: string;
  path: string;
  category: string;
  description: string;
  fileSize: number;
  dimensions?: { width: number; height: number };
  alt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { media, category }: { media: ScrapedMedia[]; category: string } = req.body;

    if (!media || !Array.isArray(media) || media.length === 0) {
      return res.status(400).json({ message: 'Media array is required' });
    }

    const imported: ImportedMedia[] = [];
    const errors: { id: string; error: string }[] = [];

    // Create storage directory
    const storageDir = path.join(process.cwd(), 'public', 'images', 'scraped');
    const categoryDir = path.join(storageDir, category.toLowerCase().replace(/\s+/g, '-'));
    
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Process each media item
    for (const mediaItem of media) {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const originalName = mediaItem.name.split('.')[0];
        const extension = mediaItem.name.split('.').pop()?.toLowerCase() || 'jpg';
        const filename = `${originalName}-${timestamp}.${extension}`;
        const filepath = path.join(categoryDir, filename);
        const publicPath = `/images/scraped/${category.toLowerCase().replace(/\s+/g, '-')}/${filename}`;

        // Download the media file
        const response = await axios.get(mediaItem.url, {
          responseType: 'arraybuffer',
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        let buffer = Buffer.from(response.data);
        let dimensions = mediaItem.dimensions;
        let finalFileSize = buffer.length;

        // Process images with sharp
        if (mediaItem.type === 'image' && ['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
          try {
            const image = sharp(buffer);
            const metadata = await image.metadata();
            
            dimensions = {
              width: metadata.width || 0,
              height: metadata.height || 0
            };

            // Optimize image: resize if too large, compress
            let processedImage = image;
            
            if (metadata.width && metadata.width > 1920) {
              processedImage = processedImage.resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
              });
            }

            // Convert to optimal format and compress
            if (extension === 'png') {
              buffer = await processedImage
                .png({ quality: 90, compressionLevel: 9 })
                .toBuffer();
            } else if (extension === 'webp') {
              buffer = await processedImage
                .webp({ quality: 90 })
                .toBuffer();
            } else {
              buffer = await processedImage
                .jpeg({ quality: 90, progressive: true })
                .toBuffer();
            }

            finalFileSize = buffer.length;
          } catch (sharpError) {
            console.warn('Sharp processing failed, using original:', sharpError);
            // Continue with original buffer if sharp fails
          }
        }

        // Save file to disk
        fs.writeFileSync(filepath, buffer);

        const importedItem: ImportedMedia = {
          id: `imported-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
          name: filename,
          path: publicPath,
          category,
          description: `Imported from ${new URL(mediaItem.url).hostname}`,
          fileSize: finalFileSize,
          dimensions,
          alt: mediaItem.alt || `Imported image: ${originalName}`
        };

        imported.push(importedItem);

        // Here you would typically save to database
        // await saveMediaToDatabase(importedItem);

      } catch (error) {
        console.error(`Failed to import media ${mediaItem.id}:`, error);
        errors.push({
          id: mediaItem.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    res.status(200).json({
      success: true,
      imported,
      errors,
      totalRequested: media.length,
      totalImported: imported.length,
      totalErrors: errors.length
    });

  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({
      message: 'Failed to import media',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
