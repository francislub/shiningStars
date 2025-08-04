import { NextResponse } from "next/server"
import { getEventById } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await getEventById(params.id)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error("Error in event API:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}
