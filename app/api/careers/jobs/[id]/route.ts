// ============================================================
// FILE: app/api/careers/jobs/[id]/route.ts
// ROUTE: GET /api/careers/jobs/[id]
// ============================================================
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      )
    }

    const job = await prisma.job.findFirst({
      where: {
        id,
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        department: true,
        category: true,
        employmentType: true,
        location: true,
        vacancies: true,
        salaryMin: true,
        salaryMax: true,
        genderPreference: true,
        experienceRequired: true,
        minimumQualification: true,
        applicationDeadline: true,
        interviewDate: true,
        rolesAndResponsibilities: true,
        requirements: true,
        skillsNeeded: true,
        benefits: true,
        workingHours: true,
        jobDescriptionPdf: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found or not published" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, data: job },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        },
      }
    )
  } catch (error: any) {
    console.error("[JOB_BY_ID] Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch job" },
      { status: 500 }
    )
  }
}