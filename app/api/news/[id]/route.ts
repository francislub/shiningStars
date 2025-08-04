import { NextResponse } from "next/server"
import { getNewsById } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const news = await getNewsById(params.id)
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error in news API:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
