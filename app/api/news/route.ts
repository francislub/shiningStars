import { NextResponse } from "next/server"
import { getNews } from "@/lib/api"

export async function GET() {
  try {
    const news = await getNews()
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error in news API:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
