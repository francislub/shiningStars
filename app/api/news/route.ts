import { NextResponse } from "next/server"
import { getNews } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { sendNewsletterNotification } from "@/lib/email-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 50) // Max 50 items
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const includeComments = searchParams.get("includeComments") === "true"

    const news = await getNews(limit, offset, includeComments)
    // Wrap response in success object format expected by components
    return NextResponse.json({ success: true, news })
  } catch (error) {
    console.error("Error fetching news:", error)
    // Return consistent error format
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, photos, createdBy } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Create the news article using Prisma
    const newNews = await prisma.websiteNews.create({
      data: {
        title,
        description,
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
      await sendNewsletterNotification("news", {
        id: newNews.id,
        title: newNews.title,
        description: newNews.description,
        photo: newNews.photos[0] || null,
        date: newNews.createdAt,
      })
      console.log(`📧 Newsletter notification sent for news: ${newNews.title}`)
    } catch (emailError) {
      console.error("Failed to send newsletter notification:", emailError)
      // Don't fail the news creation if email fails
    }

    return NextResponse.json({
      success: true,
      news: newNews,
      message: "News created and newsletter sent successfully",
    })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ success: false, error: "Failed to create news" }, { status: 500 })
  }
}
