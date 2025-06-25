import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { type, contentId, action } = reqBody

    // Validate webhook payload
    if (!type || !contentId || action !== "created") {
      return NextResponse.json(
        { error: "Invalid webhook payload. Required: type, contentId, action='created'" },
        { status: 400 },
      )
    }

    // Only process new content creation
    if (action !== "created") {
      return NextResponse.json({ message: "Action not processed" }, { status: 200 })
    }

    // Prepare data for email notification (only need type and contentId)
    const emailData = {
      type: type, // 'event' or 'news'
      contentId: contentId, // The actual MongoDB ObjectId
    }

    // Call the newsletter API to send emails
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to send notifications")
    }

    console.log(`✅ Webhook processed: ${type} notifications sent for contentId: ${contentId}`, result)

    return NextResponse.json({
      success: true,
      message: `${type} notifications sent successfully`,
      contentId,
      emailResult: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Webhook processing failed:", error)
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

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint is active",
    timestamp: new Date().toISOString(),
    usage: "POST to this endpoint when new content is created",
    expectedPayload: {
      type: "event | news",
      action: "created",
      contentId: "MongoDB ObjectId of the created content",
    },
    example: {
      type: "event",
      action: "created",
      contentId: "507f1f77bcf86cd799439011",
    },
  })
}
