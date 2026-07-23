import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Public endpoint: the homepage hero slider is shown to every visitor,
// so no session/auth check is needed here (unlike the admin CRUD routes).
export async function GET() {
  try {
    const slides = await prisma.websiteSlider.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        photo: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ slides })
  } catch (error) {
    console.error("Error fetching website sliders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}