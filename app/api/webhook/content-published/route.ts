import { NextResponse } from "next/server"
import { sendNewsletterNotification } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const { type, content } = await request.json()

    if (!type || !content || (type !== "event" && type !== "news")) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Send newsletter to all subscribers
    await sendNewsletterNotification(type, content)

    return NextResponse.json({
      success: true,
      message: `Newsletter sent for new ${type}`,
    })
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 })
  }
}
