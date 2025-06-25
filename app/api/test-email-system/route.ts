import { connect } from "../../../dbConfig/dbConfig"
import EventModel from "../../../modules/event"
import NewModel from "../../../modules/new"
import newsLetter from "../../../models/emailsModel"
import { type NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
  try {
    // Test database connections
    const eventCount = await EventModel.countDocuments()
    const newsCount = await NewModel.countDocuments()
    const subscriberCount = await newsLetter.countDocuments()

    // Get latest event and news
    const latestEvent = await EventModel.findOne().sort({ _id: -1 }).exec()
    const latestNews = await NewModel.findOne().sort({ _id: -1 }).exec()
    const subscribers = await newsLetter
      .find({ isActive: { $ne: false } })
      .limit(5)
      .exec()

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
      sampleSubscribers: subscribers.map((sub) => ({
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

    // Get the latest content
    let latestContent
    if (type === "event") {
      latestContent = await EventModel.findOne().sort({ _id: -1 }).exec()
      if (!latestContent) {
        return NextResponse.json({ error: "No events found in database" }, { status: 404 })
      }
    } else {
      latestContent = await NewModel.findOne().sort({ _id: -1 }).exec()
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
