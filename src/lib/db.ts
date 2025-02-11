import mongoose from "mongoose";

// bring MONGODB_URI from the env file
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Connection failed due to the absense of secure-string!");
}

// check for existing db-connection globally
let dbConnectionCache = global.dbConnection;
if (!dbConnectionCache) {
  dbConnectionCache = global.dbConnection = { connection: null, promise: null };
}

// Function to connect to the database
export async function connectToDatabase() {
  // check if connection already exists
  if (dbConnectionCache.connection) {
    return dbConnectionCache.connection;
  }
  // connect to the database
  // if conncetion request is not created yet, create one
  if (!dbConnectionCache.promise) {
    // options for creating db connection
    const options = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    // create connection promise
    dbConnectionCache.promise = mongoose
      .connect(MONGODB_URI, options)
      .then(() => mongoose.connection);
  }
  // wait for the establishment of connection
  try {
    dbConnectionCache.connection = await dbConnectionCache.promise;
  } catch (error) {
    // clear dbConnectionCache promise
    dbConnectionCache.promise = null;
    // throw error or exit process
    console.error("Database connection failed!\n", error);
    process.exit(1);
  }
  // return the connection
  return dbConnectionCache.connection;
}
