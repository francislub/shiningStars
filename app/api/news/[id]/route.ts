import { NextResponse } from "next/server"
import { getNewsById, getRelatedNews } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const news = await getNewsById(params.id)
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    const relatedNews = await getRelatedNews(params.id)

    return NextResponse.json({
      news,
      relatedNews,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
