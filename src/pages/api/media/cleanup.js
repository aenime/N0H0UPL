import { connectToDatabase } from '../../../utils/mongodb';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Get all media entries from database
    const mediaEntries = await db.collection('media').find({}).toArray();
    
    let removedCount = 0;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Check each media entry to see if the file actually exists
    for (const media of mediaEntries) {
      const filename = media.filename;
      if (!filename) {
        // Remove entries without filename
        await db.collection('media').deleteOne({ _id: media._id });
        removedCount++;
        continue;
      }
      
      const filePath = path.join(uploadDir, filename);
      
      // Check if file exists on filesystem
      if (!fs.existsSync(filePath)) {
        // File doesn't exist, remove from database
        await db.collection('media').deleteOne({ _id: media._id });
        removedCount++;
        console.log(`Removed orphaned entry: ${filename}`);
      }
    }
    
    return res.status(200).json({
      success: true,
      removed: removedCount,
      message: `Cleaned up ${removedCount} orphaned media entries`
    });
    
  } catch (error) {
    console.error('Error during cleanup:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to cleanup media entries'
    });
  }
}
