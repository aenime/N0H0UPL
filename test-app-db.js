import { connectToDatabase } from './src/utils/mongodb.js';

async function testAppDatabaseConnection() {
  console.log('🔄 Testing application database connection...');
  
  try {
    const { client, db } = await connectToDatabase();
    
    console.log('✅ Application connected to database successfully!');
    console.log('🏷️  Database name:', db.databaseName);
    
    // Test some collections that the app uses
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('📚 Available collections:', collectionNames);
    
    // Check specific collections used by the app
    const appCollections = ['media', 'mediaCategories', 'posts', 'users', 'donations'];
    const missingCollections = appCollections.filter(col => !collectionNames.includes(col));
    
    if (missingCollections.length > 0) {
      console.log('⚠️  Missing collections:', missingCollections);
    } else {
      console.log('✅ All required collections are present');
    }
    
    // Test media collection specifically (for MediaManager)
    const mediaCollection = db.collection('media');
    const mediaCount = await mediaCollection.countDocuments();
    console.log('🖼️  Media files in database:', mediaCount);
    
    const categoriesCollection = db.collection('mediaCategories');
    const categoriesCount = await categoriesCollection.countDocuments();
    console.log('📁 Media categories in database:', categoriesCount);
    
  } catch (error) {
    console.error('❌ Application database connection failed:', error.message);
  }
}

testAppDatabaseConnection().catch(console.error);
