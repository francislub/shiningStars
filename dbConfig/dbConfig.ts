import mongoose from "mongoose"

let isConnected = false

export async function connect() {
  try {
    if (isConnected) {
      console.log("Using existing MongoDB connection")
      return
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined")
    }

    console.log("Connecting to MongoDB...")

    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000, // Added connection timeout
      family: 4,
      retryWrites: true,
      w: "majority",
      // Add these for better Atlas connectivity
      ssl: true,
      authSource: "admin",
    })

    isConnected = true
    console.log("MongoDB connected successfully")

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: " + err)
      isConnected = false
    })

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
      isConnected = false
    })

    return connection
  } catch (error) {
    console.log("MongoDB connection failed:", error.message)
    isConnected = false

    // Provide helpful error messages
    if (error.message.includes("IP")) {
      console.log("🔧 SOLUTION: Add your IP address to MongoDB Atlas whitelist:")
      console.log("1. Go to MongoDB Atlas Dashboard")
      console.log("2. Navigate to Network Access")
      console.log("3. Click 'Add IP Address'")
      console.log("4. Add 0.0.0.0/0 for all IPs (development) or your specific IP")
      console.log("5. For production, add Vercel's IP ranges")
    }

    throw error
  }
}
