import { connect } from "../../../dbConfig/dbConfig"
import mongoose from "mongoose"
import { type NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
  try {
    // Use direct database access to avoid TypeScript issues
    const db = mongoose.connection.db

    if (!db) {
      throw new Error("Database connection not established")
    }

    // Get collections
    const eventsCollection = db.collection("events")
    const newsCollection = db.collection("news")
    const subscribersCollection = db.collection("newsletters")

    // Test database connections
    const eventCount = await eventsCollection.countDocuments()
    const newsCount = await newsCollection.countDocuments()
    const subscriberCount = await subscribersCollection.countDocuments()

    // Get latest event and news
    const latestEvent = await eventsCollection.findOne({}, { sort: { _id: -1 } })
    const latestNews = await newsCollection.findOne({}, { sort: { _id: -1 } })
    const subscribers = await subscribersCollection
      .find({ isActive: { $ne: false } })
      .limit(5)
      .toArray()

    return NextResponse.json({
      success: true,
      database: {
        events: eventCount,
        news: newsCount,
        subscribers: subscriberCount,
      },
      latestContent: {
        event: latestEvent
          ? {
              id: latestEvent._id,
              activity: latestEvent.activity,
              date: latestEvent.date,
              place: latestEvent.place,
            }
          : null,
        news: latestNews
          ? {
              id: latestNews._id,
              title: latestNews.title,
              date: latestNews.date,
            }
          : null,
      },
      sampleSubscribers: subscribers.map((sub: any) => ({
        email: sub.newsemail,
        isActive: sub.isActive,
      })),
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Database test error:", error)
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

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json()

    if (!type || (type !== "event" && type !== "news")) {
      return NextResponse.json({ error: "Type must be 'event' or 'news'" }, { status: 400 })
    }

    // Use direct database access
    const db = mongoose.connection.db

    if (!db) {
      throw new Error("Database connection not established")
    }

    // Get the latest content
    let latestContent
    if (type === "event") {
      const eventsCollection = db.collection("events")
      latestContent = await eventsCollection.findOne({}, { sort: { _id: -1 } })
      if (!latestContent) {
        return NextResponse.json({ error: "No events found in database" }, { status: 404 })
      }
    } else {
      const newsCollection = db.collection("news")
      latestContent = await newsCollection.findOne({}, { sort: { _id: -1 } })
      if (!latestContent) {
        return NextResponse.json({ error: "No news found in database" }, { status: 404 })
      }
    }

    // Test sending notification with latest content
    const response = await fetch(`${request.nextUrl.origin}/api/newsletter/send-new-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        contentId: latestContent._id.toString(),
      }),
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: `Test email sent for latest ${type}`,
      contentUsed: {
        id: latestContent._id,
        title: type === "event" ? latestContent.activity : latestContent.title,
        date: latestContent.date,
      },
      emailResult: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Test email error:", error)
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
