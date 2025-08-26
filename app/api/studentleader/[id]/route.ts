import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const prefect = await prisma.websitePrefect.findUnique({
      where: { id: params.id },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!prefect) {
      return NextResponse.json({ error: "pupils leader not found" }, { status: 404 })
    }

    return NextResponse.json(prefect)
  } catch (error) {
    console.error("Error fetching pupils leader:", error)
    return NextResponse.json({ error: "Failed to fetch pupils leader" }, { status: 500 })
  }
}
