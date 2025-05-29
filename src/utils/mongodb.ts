import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'NGO';

// Check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global object to store the MongoDB connection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Create a MongoDB client promise for NextAuth
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI as string);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  const client = new MongoClient(MONGODB_URI as string);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise };

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no connection exists, use the client promise
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);

  // Cache the client and db connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
