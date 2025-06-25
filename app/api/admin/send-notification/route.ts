import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { type, contentData } = reqBody

    // Validate admin request
    if (!type || !contentData) {
      return NextResponse.json({ error: "Missing type or contentData" }, { status: 400 })
    }

    // Prepare the notification data
    const notificationData = {
      type: type, // 'event' or 'news'
      contentId: contentData._id || contentData.id || Date.now().toString(),
      title: contentData.title || contentData.activity,
      description: contentData.description,
      date: contentData.date,
      photo: contentData.photo,
      place: contentData.place,
    }

    // Call the newsletter API
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to send notifications")
    }

    return NextResponse.json({
      success: true,
      message: `${type} notification sent to all subscribers`,
      details: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Admin notification failed:", error)
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
