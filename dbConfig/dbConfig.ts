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
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
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
    throw error
  }
}
