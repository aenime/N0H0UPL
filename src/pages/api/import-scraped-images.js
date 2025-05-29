import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ success: false, message: 'Images array is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const importedImages = [];
    let successCount = 0;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const image of images) {
      try {
        // Download the image
        const response = await axios.get(image.url, {
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 30000,
        });

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substr(2, 9);
        const extension = image.extension || 'jpg';
        const filename = `scraped_${timestamp}_${randomId}.${extension}`;
        const filePath = path.join(uploadsDir, filename);

        // Process image with Sharp to get dimensions and optimize
        const imageBuffer = Buffer.from(response.data);
        const sharpImage = sharp(imageBuffer);
        const metadata = await sharpImage.metadata();

        // Apply basic optimization
        let processedBuffer;
        if (extension === 'jpg' || extension === 'jpeg') {
          processedBuffer = await sharpImage
            .jpeg({ quality: 85, progressive: true })
            .toBuffer();
        } else if (extension === 'png') {
          processedBuffer = await sharpImage
            .png({ compressionLevel: 6 })
            .toBuffer();
        } else if (extension === 'webp') {
          processedBuffer = await sharpImage
            .webp({ quality: 85 })
            .toBuffer();
        } else {
          processedBuffer = imageBuffer; // Keep original for other formats
        }

        // Save the processed image
        fs.writeFileSync(filePath, processedBuffer);

        // Create media document
        const mediaDocument = {
          filename: filename,
          originalName: image.filename || filename,
          size: processedBuffer.length,
          mimetype: `image/${extension}`,
          path: `/uploads/${filename}`,
          url: `/uploads/${filename}`,
          width: metadata.width || null,
          height: metadata.height || null,
          alt: image.alt || '',
          title: image.title || '',
          category: 'scraped',
          tags: ['scraped', 'imported'],
          source: 'website-scraper',
          sourceUrl: image.url,
          uploadedAt: new Date(),
          uploadedBy: 'admin',
          status: 'active',
          metadata: {
            format: metadata.format,
            space: metadata.space,
            channels: metadata.channels,
            density: metadata.density,
            hasProfile: metadata.hasProfile,
            hasAlpha: metadata.hasAlpha,
          }
        };

        // Insert into database
        const result = await db.collection('media').insertOne(mediaDocument);
        
        if (result.insertedId) {
          importedImages.push({
            ...mediaDocument,
            _id: result.insertedId
          });
          successCount++;
        }

      } catch (error) {
        console.error('Error importing image:', image.url, error);
        // Continue with next image instead of failing the whole operation
      }
    }

    // Update media categories if 'scraped' category doesn't exist
    const existingCategory = await db.collection('mediaCategories').findOne({ name: 'scraped' });
    if (!existingCategory) {
      await db.collection('mediaCategories').insertOne({
        name: 'scraped',
        description: 'Images imported from website scraper',
        color: '#8B5CF6',
        createdAt: new Date(),
        status: 'active'
      });
    }

    res.status(200).json({
      success: true,
      imported: successCount,
      total: images.length,
      images: importedImages,
      message: `Successfully imported ${successCount} out of ${images.length} images`
    });

  } catch (error) {
    console.error('Error importing scraped images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import images',
      error: error.message
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
    responseLimit: '50mb',
  },
};
