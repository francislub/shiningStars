import { NextResponse } from "next/server"
import { getNewsletterSubscribers, getEventById, getNewsById } from "@/lib/api"
import { sendNewsletterUpdate } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const { type, contentId } = await request.json()

    if (!type || !contentId || !["event", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
    }

    // Get content details
    let content
    if (type === "event") {
      content = await getEventById(contentId)
    } else {
      content = await getNewsById(contentId)
    }

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Get all newsletter subscribers
    const subscribers = await getNewsletterSubscribers()
    const emailList = subscribers.map((sub) => sub.email)

    if (emailList.length === 0) {
      return NextResponse.json({ message: "No subscribers found" })
    }

    // Send newsletter update
    await sendNewsletterUpdate(type, content, emailList)

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${emailList.length} subscribers`,
      subscriberCount: emailList.length,
    })
  } catch (error) {
    console.error("Newsletter notification error:", error)
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 })
  }
}
