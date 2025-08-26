import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const administrator = await prisma.websiteAdmin.findUnique({
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

    if (!administrator) {
      return NextResponse.json({ error: "Administrator not found" }, { status: 404 })
    }

    return NextResponse.json(administrator)
  } catch (error) {
    console.error("Error fetching administrator:", error)
    return NextResponse.json({ error: "Failed to fetch administrator" }, { status: 500 })
  }
}
