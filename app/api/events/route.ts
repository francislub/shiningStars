import { NextResponse } from "next/server"
import { getEvents } from "@/lib/api"

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error in events API:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
