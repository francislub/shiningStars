import { NextResponse } from "next/server"
import { getEvents } from "@/lib/api"
import { PrismaClient } from "@prisma/client"
import { sendNewsletterNotification } from "@/lib/email-service"

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log("[v0] Starting events fetch...")

    const events = await getEvents()

    console.log("[v0] Successfully fetched events:", events?.length || 0)
    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error("[v0] Error fetching events:", error)

    if (error instanceof Error) {
      if (
        error.message.includes("connect") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Database connection failed. Please check MONGODB_URI environment variable.",
          },
          { status: 503 },
        )
      }
      if (error.message.includes("timeout") || error.message.includes("ETIMEDOUT")) {
        return NextResponse.json(
          {
            success: false,
            error: "Database query timed out. Please try again.",
          },
          { status: 504 },
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events. Please try again later.",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { activity, description, date, place, photos, createdBy } = body

    // Validate required fields
    if (!activity || !description || !date || !place) {
      return NextResponse.json({ error: "Activity, description, date, and place are required" }, { status: 400 })
    }

    // Create the event using Prisma
    const newEvent = await prisma.websiteEvent.create({
      data: {
        activity,
        description,
        date,
        place,
        photos: photos || [],
        createdBy,
      },
      include: {
        creator: {
          select: { name: true },
        },
      },
    })

    // Trigger email notification to newsletter subscribers
    try {
      await sendNewsletterNotification("event", {
        id: newEvent.id,
        activity: newEvent.activity,
        description: newEvent.description,
        date: newEvent.date,
        place: newEvent.place,
        photo: newEvent.photos[0] || null,
      })
      console.log(`📧 Newsletter notification sent for event: ${newEvent.activity}`)
    } catch (emailError) {
      console.error("Failed to send newsletter notification:", emailError)
      // Don't fail the event creation if email fails
    }

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: "Event created and newsletter sent successfully",
    })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 })
  }
}
