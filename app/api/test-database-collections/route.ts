import { connect } from "../../../dbConfig/dbConfig"
import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

connect()

export async function GET(request: NextRequest) {
  try {
    const db = mongoose.connection.db
    if (!db) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    // List all collections
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((col) => col.name)

    // Get sample data from each collection
    const sampleData: any = {}

    for (const collectionName of collectionNames) {
      try {
        const collection = db.collection(collectionName)
        const count = await collection.countDocuments()
        const sample = await collection.findOne()

        sampleData[collectionName] = {
          count,
          sampleDocument: sample,
        }
      } catch (error) {
        sampleData[collectionName] = {
          error: error.message,
        }
      }
    }

    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: collectionNames,
      sampleData,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Database inspection error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
