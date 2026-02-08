import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const connectionUri = process.env.MONGODB_URI;
    if (!connectionUri) {
      throw new Error("MONGODB_URI is not set in environment variables");
    }

    try {
      cached.promise = mongoose.connect(connectionUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
    } catch (err) {
      cached.promise = null;
      throw err;
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw new Error(`Database connection failed: ${err.message}`);
  }
}
