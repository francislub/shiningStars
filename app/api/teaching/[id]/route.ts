import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const staff = await prisma.websiteStaff.findUnique({
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

    if (!staff) {
      return NextResponse.json({ error: "Teaching staff member not found" }, { status: 404 })
    }

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching teaching staff member:", error)
    return NextResponse.json({ error: "Failed to fetch teaching staff member" }, { status: 500 })
  }
}
