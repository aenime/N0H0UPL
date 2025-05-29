import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // GET - Fetch all media files
  if (req.method === 'GET') {
    try {
      const { category, search, page = 1, limit = 20 } = req.query;
      
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { filename: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const media = await db.collection('media')
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      const total = await db.collection('media').countDocuments(query);

      return res.status(200).json({
        success: true,
        media: media.map(item => ({
          ...item,
          id: item._id.toString()
        })),
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: total
        }
      });
    } catch (error) {
      console.error('Error fetching media:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch media'
      });
    }
  }

  // POST - Upload new media file
  if (req.method === 'POST') {
    try {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      
      // Create upload directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });

      const [fields, files] = await form.parse(req);

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

      if (!file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalFilename);
      const uniqueId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      const filename = `${uniqueId}${fileExtension}`;
      const newPath = path.join(uploadDir, filename);

      // Move file to final location
      fs.renameSync(file.filepath, newPath);

      // Determine file type
      const mimeType = file.mimetype;
      let fileType = 'unknown';
      if (mimeType.startsWith('image/')) {
        fileType = 'image';
      } else if (mimeType.startsWith('video/')) {
        fileType = 'video';
      }

      // Save to database
      const mediaDoc = {
        id: uniqueId,
        filename,
        originalFilename: file.originalFilename,
        title: title || file.originalFilename,
        description: description || '',
        category: category || 'uncategorized',
        fileType,
        mimeType,
        size: file.size,
        url: `/uploads/${filename}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        usedInPosts: [],
        tags: []
      };

      await db.collection('media').insertOne(mediaDoc);

      return res.status(200).json({
        success: true,
        media: {
          ...mediaDoc,
          id: mediaDoc.id
        }
      });
    } catch (error) {
      console.error('Error uploading media:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to upload media'
      });
    }
  }

  // PUT - Update media metadata
  if (req.method === 'PUT') {
    try {
      const { id, title, description, category, tags } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Media ID is required'
        });
      }

      const updateDoc = {
        title,
        description,
        category,
        tags: tags || [],
        updatedAt: new Date()
      };

      await db.collection('media').updateOne(
        { id },
        { $set: updateDoc }
      );

      return res.status(200).json({
        success: true,
        message: 'Media updated successfully'
      });
    } catch (error) {
      console.error('Error updating media:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update media'
      });
    }
  }

  // DELETE - Delete media file
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Media ID is required'
        });
      }

      // Find media document - check both id and _id fields
      let media = await db.collection('media').findOne({ id });
      if (!media) {
        // Try finding by _id if id field doesn't exist (only if it's a valid ObjectId)
        try {
          if (ObjectId.isValid(id)) {
            media = await db.collection('media').findOne({ _id: new ObjectId(id) });
          }
        } catch (err) {
          // Invalid ObjectId, continue with original error
        }
      }
      if (!media) {
        return res.status(404).json({
          success: false,
          error: 'Media not found'
        });
      }

      // Delete file from filesystem
      const filePath = path.join(process.cwd(), 'public/uploads', media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete from database - use the _id for reliable deletion
      await db.collection('media').deleteOne({ _id: media._id });

      return res.status(200).json({
        success: true,
        message: 'Media deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting media:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to delete media'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}