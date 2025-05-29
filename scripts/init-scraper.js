// Script to initialize the scraped images category in the database
const { MongoClient } = require('mongodb');

async function initializeScrapedCategory() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/karuna');
  
  try {
    await client.connect();
    const db = client.db();
    
    // Check if scraped category exists
    const existingCategory = await db.collection('mediaCategories').findOne({ name: 'scraped' });
    
    if (!existingCategory) {
      // Create scraped category
      await db.collection('mediaCategories').insertOne({
        id: 'scraped',
        name: 'Scraped Images',
        description: 'Images imported from website scraper',
        color: '#8B5CF6',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active'
      });
      
      console.log('✅ Created "scraped" category in media categories');
    } else {
      console.log('✅ "scraped" category already exists');
    }
    
    // Ensure uploads directory exists
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Created uploads directory');
    } else {
      console.log('✅ Uploads directory already exists');
    }
    
  } catch (error) {
    console.error('❌ Error initializing scraped category:', error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (require.main === module) {
  initializeScrapedCategory();
}

module.exports = { initializeScrapedCategory };
