// ============================================================
// FILE: app/api/careers/jobs/public/route.ts
// ROUTE: GET /api/careers/jobs/public
// ============================================================
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search       = searchParams.get("search")?.trim() || ""
    const category     = searchParams.get("category")?.trim() || ""
    const employmentType = searchParams.get("employmentType")?.trim() || ""

    // Build where clause — NO deadline filter so we don't accidentally hide jobs
    const where: any = {
      status: "PUBLISHED",
    }

    if (search) {
      where.OR = [
        { title:      { contains: search, mode: "insensitive" } },
        { department: { contains: search, mode: "insensitive" } },
        { location:   { contains: search, mode: "insensitive" } },
      ]
    }

    if (category)       where.category       = category
    if (employmentType) where.employmentType = employmentType

    console.log("[JOBS_PUBLIC] where:", JSON.stringify(where, null, 2))

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id:                    true,
        title:                 true,
        department:            true,
        category:              true,
        employmentType:        true,
        location:              true,
        vacancies:             true,
        salaryMin:             true,
        salaryMax:             true,
        minimumQualification:  true,
        experienceRequired:    true,
        applicationDeadline:   true,
        status:                true,
        createdAt:             true,
        _count: { select: { applications: true } },
      },
    })

    const total = await prisma.job.count({ where })

    console.log(`[JOBS_PUBLIC] Found ${jobs.length} jobs (total: ${total})`)

    return NextResponse.json(
      { success: true, data: jobs, total },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        },
      }
    )
  } catch (error: any) {
    console.error("[JOBS_PUBLIC] Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch jobs", data: [], total: 0 },
      { status: 500 }
    )
  }
}