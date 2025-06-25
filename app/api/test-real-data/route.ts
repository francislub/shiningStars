import { connect } from "../../../dbConfig/dbConfig"
import EventModel from "../../../modules/event"
import NewModel from "../../../modules/new"
import newsLetter from "../../../models/emailsModel"
import { type NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
  try {
    // Get latest event and news from database
    const latestEvent = await EventModel.findOne().sort({ _id: -1 }).populate("creator")
    const latestNews = await NewModel.findOne().sort({ _id: -1 }).populate("creator")
    const subscriberCount = await newsLetter.countDocuments({ isActive: { $ne: false } })

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: {
        subscriberCount,
        latestEvent: latestEvent
          ? {
              id: latestEvent._id,
              activity: latestEvent.activity,
              description: latestEvent.description,
              date: latestEvent.date,
              place: latestEvent.place,
              photo: latestEvent.photo,
            }
          : null,
        latestNews: latestNews
          ? {
              id: latestNews._id,
              title: latestNews.title,
              description: latestNews.description,
              photo: latestNews.photo,
            }
          : null,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Database test failed:", error)
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
    const reqBody = await request.json()
    const { type } = reqBody

    if (!type || (type !== "event" && type !== "news")) {
      return NextResponse.json({ error: "Type must be 'event' or 'news'" }, { status: 400 })
    }

    // Get the latest content from database
    let content
    if (type === "event") {
      content = await EventModel.findOne().sort({ _id: -1 }).populate("creator")
      if (!content) {
        return NextResponse.json({ error: "No events found in database" }, { status: 404 })
      }
    } else {
      content = await NewModel.findOne().sort({ _id: -1 }).populate("creator")
      if (!content) {
        return NextResponse.json({ error: "No news found in database" }, { status: 404 })
      }
    }

    // Test sending notification with real data
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        contentId: content._id.toString(),
      }),
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: `Test ${type} notification sent using real database data`,
      contentUsed: {
        id: content._id,
        title: type === "event" ? content.activity : content.title,
        description: content.description,
      },
      emailResult: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Test failed:", error)
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
