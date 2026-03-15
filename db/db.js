import { MongoClient } from "mongodb";

// MongoDB Atlas Connection String
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Validate required environment variables
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

if (!dbName) {
  throw new Error("MONGODB_DB environment variable is not defined");
}

// MongoDB Client Configuration
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  retryWrites: true,
});

// Global variable to cache the database connection
let cachedDb = null;

/**
 * Connect to MongoDB Atlas and retrieve the database instance
 * @returns {Promise<Object>} MongoDB database instance
 */
export default async function getDb() {
  try {
    // Return cached database if client is already connected
    if (cachedDb && client.topology?.isConnected()) {
      console.log("Using cached MongoDB connection");
      return cachedDb;
    }

    // Connect to MongoDB Atlas
    if (!client.topology?.isConnected()) {
      console.log("Connecting to MongoDB Atlas...");
      await client.connect();
      console.log("Successfully connected to MongoDB Atlas");
    }

    // Get and cache the database instance
    cachedDb = client.db(dbName);
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

/**
 * Close the MongoDB connection
 */
export async function closeDb() {
  try {
    if (client.topology?.isConnected()) {
      await client.close();
      cachedDb = null;
      console.log("MongoDB connection closed");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}