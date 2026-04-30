import { NextResponse } from "next/server"
import { getNewsById, getRelatedNews } from "@/lib/api"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const news = await getNewsById(id)

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    const relatedNews = await getRelatedNews(id)

    return NextResponse.json({ news, relatedNews })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}