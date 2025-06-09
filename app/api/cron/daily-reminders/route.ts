import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("🕐 CRON JOB: Daily event reminders triggered")
    console.log(`Timestamp: ${new Date().toISOString()}`)

    // Call the event reminders API
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/event-reminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    console.log("📧 Cron job result:", result)

    return NextResponse.json({
      success: true,
      message: "Daily reminder cron job executed",
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error("❌ Cron job failed:", error)
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
export async function POST(request: NextRequest) {
  return GET(request)
}
