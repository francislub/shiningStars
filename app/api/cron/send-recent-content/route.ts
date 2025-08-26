import { NextResponse } from "next/server"
import { sendNewsletterNotification } from "@/lib/email-service"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log("🕐 CRON JOB: Checking for recent content to send newsletters")

    // Get current time and 5 minutes ago
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    console.log(`⏰ Checking for content created between ${fiveMinutesAgo.toISOString()} and ${now.toISOString()}`)

    // Check for recent events (last 5 minutes)
    const recentEvents = await prisma.websiteEvent.findMany({
      where: {
        createdAt: {
          gte: fiveMinutesAgo,
          lte: now,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Check for recent news (last 5 minutes)
    const recentNews = await prisma.websiteNews.findMany({
      where: {
        createdAt: {
          gte: fiveMinutesAgo,
          lte: now,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log(`📅 Found ${recentEvents.length} recent events`)
    console.log(`📰 Found ${recentNews.length} recent news`)

    const results = []

    // Send newsletters for recent events
    for (const event of recentEvents) {
      try {
        console.log(`📧 Sending newsletter for event: ${event.activity}`)
        const result = await sendNewsletterNotification("event", event)
        results.push({
          type: "event",
          title: event.activity,
          id: event.id,
          result,
        })
        console.log(`✅ Newsletter sent for event: ${event.activity}`)
      } catch (error) {
        console.error(`❌ Failed to send newsletter for event ${event.activity}:`, error)
        results.push({
          type: "event",
          title: event.activity,
          id: event.id,
          error: error.message,
        })
      }
    }

    // Send newsletters for recent news
    for (const news of recentNews) {
      try {
        console.log(`📧 Sending newsletter for news: ${news.title}`)
        const result = await sendNewsletterNotification("news", news)
        results.push({
          type: "news",
          title: news.title,
          id: news.id,
          result,
        })
        console.log(`✅ Newsletter sent for news: ${news.title}`)
      } catch (error) {
        console.error(`❌ Failed to send newsletter for news ${news.title}:`, error)
        results.push({
          type: "news",
          title: news.title,
          id: news.id,
          error: error.message,
        })
      }
    }

    const totalProcessed = recentEvents.length + recentNews.length
    const successCount = results.filter((r) => r.result && r.result.success).length
    const failureCount = results.filter((r) => r.error).length

    console.log(
      `📊 CRON JOB SUMMARY: ${totalProcessed} items processed, ${successCount} successful, ${failureCount} failed`,
    )

    return NextResponse.json({
      success: true,
      message: `Processed ${totalProcessed} recent content items`,
      timestamp: now.toISOString(),
      summary: {
        totalProcessed,
        successCount,
        failureCount,
        recentEventsCount: recentEvents.length,
        recentNewsCount: recentNews.length,
      },
      results,
    })
  } catch (error) {
    console.error("❌ CRON JOB ERROR:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Also handle POST requests
export async function POST() {
  return GET()
}
