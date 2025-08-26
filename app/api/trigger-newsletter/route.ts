import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("🔄 Manual trigger: Checking for recent content")

    // Call the cron job endpoint
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/cron/send-recent-content`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    console.log("📧 Manual trigger result:", result)

    return NextResponse.json({
      success: true,
      message: "Newsletter trigger executed successfully",
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error("❌ Manual trigger failed:", error)
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

// Also handle GET requests for testing
export async function GET() {
  return POST()
}
