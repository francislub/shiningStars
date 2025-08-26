import { NextResponse } from "next/server"
import { getEventById, getRelatedEvents } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await getEventById(params.id)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const relatedEvents = await getRelatedEvents(params.id)

    return NextResponse.json({
      event,
      relatedEvents,
    })
  } catch (error) {
    console.error("Error fetching event:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}
