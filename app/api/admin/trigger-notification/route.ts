import { connect } from "../../../../dbConfig/dbConfig"
import EventModel from "../../../../modules/event"
import NewModel from "../../../../modules/new"
import { type NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { type, contentId } = reqBody

    // Validate request
    if (!type || (type !== "event" && type !== "news")) {
      return NextResponse.json({ error: "Type must be 'event' or 'news'" }, { status: 400 })
    }

    if (!contentId) {
      return NextResponse.json({ error: "contentId is required" }, { status: 400 })
    }

    // Verify content exists in database
    let content
    if (type === "event") {
      content = await EventModel.findById(contentId)
      if (!content) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 })
      }
    } else {
      content = await NewModel.findById(contentId)
      if (!content) {
        return NextResponse.json({ error: "News not found" }, { status: 404 })
      }
    }

    // Trigger notification
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        contentId: contentId,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to send notifications")
    }

    return NextResponse.json({
      success: true,
      message: `${type} notification triggered successfully`,
      contentTitle: type === "event" ? content.activity : content.title,
      emailResult: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Admin trigger failed:", error)
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

export async function GET() {
  return NextResponse.json({
    message: "Admin notification trigger endpoint",
    usage: "POST with type and contentId to trigger email notifications",
    example: {
      type: "event",
      contentId: "507f1f77bcf86cd799439011",
    },
  })
}
