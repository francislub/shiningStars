import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    const administrators = await prisma.websiteAdmin.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    const total = await prisma.websiteAdmin.count()

    return NextResponse.json({
      administrators,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        hasNext: skip + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching administrators:", error)
    return NextResponse.json({ error: "Failed to fetch administrators" }, { status: 500 })
  }
}
