const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testDatabaseConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set');
    return;
  }

  console.log('🔄 Testing MongoDB connection...');
  console.log('📍 Database URI:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials
  
  let client;
  
  try {
    // Create client
    client = new MongoClient(MONGODB_URI);
    
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    
    // Test the connection
    console.log('✅ Connected successfully to MongoDB!');
    
    // Get database instance
    const db = client.db('NGO');
    
    // Test database access
    console.log('📊 Testing database access...');
    const collections = await db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test a simple operation
    const adminStats = await db.stats();
    console.log('📈 Database stats:', {
      collections: adminStats.collections,
      objects: adminStats.objects,
      dataSize: `${Math.round(adminStats.dataSize / 1024)} KB`
    });
    
    console.log('✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error details:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    // Common error suggestions
    if (error.message.includes('authentication failed')) {
      console.log('💡 Suggestion: Check your MongoDB username and password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Suggestion: Check your internet connection and MongoDB cluster URL');
    } else if (error.message.includes('timeout')) {
      console.log('💡 Suggestion: Check if your IP is whitelisted in MongoDB Atlas');
    }
    
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
}

// Run the test
testDatabaseConnection().catch(console.error);