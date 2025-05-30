const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function initializeDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  console.log('Initializing database connection...');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    
    const db = client.db();
    
    // Create collections if they don't exist
    const collections = ['donations', 'animals', 'users', 'media'];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      await collection.createIndex({ createdAt: 1 });
      console.log(`✅ Collection '${collectionName}' initialized`);
    }
    
    console.log('✅ Database initialization completed');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initializeDatabase();
