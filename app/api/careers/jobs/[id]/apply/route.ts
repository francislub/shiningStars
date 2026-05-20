// ============================================================
// FILE: app/api/careers/jobs/[id]/apply/route.ts
// ROUTE: POST /api/careers/jobs/[id]/apply
// ============================================================
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export const dynamic = "force-dynamic"

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-UG", {
      day: "numeric", month: "long", year: "numeric",
    })
  } catch { return "—" }
}

// ── Nodemailer transporter ────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })
}

// ── Thank-you email ───────────────────────────────────────────────────────────

async function sendThankYouEmail({
  applicantName,
  applicantEmail,
  jobTitle,
  department,
  location,
  deadline,
  applicationId,
}: {
  applicantName: string
  applicantEmail: string
  jobTitle: string
  department: string
  location: string
  deadline: string
  applicationId: string
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("[APPLY] EMAIL_USER or EMAIL_PASS not set — skipping thank-you email")
    return
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Application Received — ${jobTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f2554 0%,#1e4db7 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#93c5fd;">
                Shining Stars Primary School
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">
                Application Received!
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">
                Thank you for applying — we'll be in touch soon.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Success badge -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:#16a34a;font-weight:600;">
                      ✅ Your application has been successfully submitted.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Dear <strong>${applicantName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
                We have received your application for the position below at
                <strong style="color:#1e3a8a;">Shining Stars Primary School</strong>.
                Our HR team will review your application and reach out if you are shortlisted.
              </p>

              <!-- Job Card -->
              <table cellpadding="0" cellspacing="0" width="100%"
                style="margin:0 0 28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;
                               text-transform:uppercase;color:#94a3b8;">
                      Position Applied For
                    </p>
                    <h2 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#0f2554;">
                      ${jobTitle}
                    </h2>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;white-space:nowrap;">
                          <strong>Department:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${department}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;white-space:nowrap;">
                          <strong>Location:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${location}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;white-space:nowrap;">
                          <strong>Deadline:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${deadline}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;white-space:nowrap;">
                          <strong>Application ID:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:11px;color:#9ca3af;font-family:monospace;">${applicationId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's next -->
              <table cellpadding="0" cellspacing="0" width="100%"
                style="margin:0 0 24px;background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:1.5px;
                               text-transform:uppercase;color:#3b82f6;">
                      What happens next?
                    </p>
                    <ol style="margin:0;padding:0 0 0 18px;font-size:13px;color:#374151;line-height:2;">
                      <li>Our HR team reviews all applications after the deadline.</li>
                      <li>Shortlisted candidates are contacted for interviews.</li>
                      <li>A final decision is communicated to all applicants.</li>
                    </ol>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                If you have any questions, please contact our HR department directly.
                Keep this email for your records — your application ID is
                <strong style="color:#6b7280;font-family:monospace;">${applicationId}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                This is an automated message from the Shining Stars HR system.<br/>
                Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"Shining Stars HR" <${process.env.EMAIL_USER}>`,
    to: applicantEmail,
    subject: `Application Received: ${jobTitle} — Shining Stars Primary School`,
    html,
    text: `Dear ${applicantName},\n\nThank you for applying for ${jobTitle} (${department}) at Shining Stars Primary School.\n\nYour application has been received. We will review it and contact you if shortlisted.\n\nApplication ID: ${applicationId}\nDeadline: ${deadline}\n\nBest regards,\nShining Stars HR Team`,
  })
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params

    // ── Verify job exists and is still open ───────────────────────────────
    const job = await prisma.job.findFirst({
      where: { id: jobId, status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        applicationDeadline: true,
      },
    })

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found or not published" },
        { status: 404 }
      )
    }

    if (new Date(job.applicationDeadline) < new Date()) {
      return NextResponse.json(
        { success: false, error: "The application deadline for this position has passed" },
        { status: 400 }
      )
    }

    // ── Parse JSON body ───────────────────────────────────────────────────
    // The client pre-uploads files via UploadThing and sends only URLs here.
    let body: Record<string, any>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      )
    }

    // ── Required fields ───────────────────────────────────────────────────
    const fullName = (body.fullName as string | undefined)?.trim() ?? ""
    const phone    = (body.phone    as string | undefined)?.trim() ?? ""
    const email    = (body.email    as string | undefined)?.trim() ?? ""

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "fullName, phone, and email are required" },
        { status: 400 }
      )
    }

    if (!body.consentGiven) {
      return NextResponse.json(
        { success: false, error: "Applicant must give consent to submit the application" },
        { status: 400 }
      )
    }

    // ── Duplicate check ───────────────────────────────────────────────────
    const existing = await prisma.jobApplication.findUnique({
      where: { jobId_email: { jobId, email } },
      select: { id: true },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: "An application with this email already exists for this position" },
        { status: 409 }
      )
    }

    // ── Optional scalar fields ────────────────────────────────────────────
    const gender             = (body.gender             as string | undefined) || null
    const dateOfBirth        = (body.dateOfBirth        as string | undefined) || null
    const nationality        = (body.nationality        as string | undefined) || null
    const physicalAddress    = (body.physicalAddress    as string | undefined) || null
    const certifications     = (body.certifications     as string | undefined) || null
    const languages          = (body.languages          as string | undefined) || null
    const whyShouldWeHireYou = (body.whyShouldWeHireYou as string | undefined) || null
    const expectedSalaryStr  = (body.expectedSalary     as string | undefined) || null
    const availableStartDate = (body.availableStartDate as string | undefined) || null

    // skills arrives as a comma-separated string or an array
    const skillsRaw = body.skills
    const skills: string[] = Array.isArray(skillsRaw)
      ? skillsRaw.map((s: string) => s.trim()).filter(Boolean)
      : typeof skillsRaw === "string"
        ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
        : []

    // educationBackground / workExperience arrive as arrays (already parsed JSON)
    const educationBackground = Array.isArray(body.educationBackground)
      ? body.educationBackground
      : null

    const workExperience = Array.isArray(body.workExperience)
      ? body.workExperience
      : null

    // ── File URLs (pre-uploaded by client, arrive as plain strings) ───────
    const cvUrl                = (body.cvUrl                as string | null) || null
    const academicDocumentsUrl = (body.academicDocumentsUrl as string | null) || null
    const nationalIdUrl        = (body.nationalIdUrl        as string | null) || null
    const coverLetterUrl       = (body.coverLetterUrl       as string | null) || null
    const passportPhotoUrl     = (body.passportPhotoUrl     as string | null) || null

    // CV is required
    if (!cvUrl) {
      return NextResponse.json(
        { success: false, error: "A CV / Resume upload is required" },
        { status: 400 }
      )
    }

    // ── Create the application record ─────────────────────────────────────
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        fullName,
        phone,
        email,
        gender:               (gender as any) ?? undefined,
        dateOfBirth:          dateOfBirth ? new Date(dateOfBirth) : undefined,
        nationality,
        physicalAddress,
        educationBackground,
        workExperience,
        skills,
        certifications,
        languages,
        whyShouldWeHireYou,
        expectedSalary:       expectedSalaryStr ? parseFloat(expectedSalaryStr) : undefined,
        availableStartDate:   availableStartDate ? new Date(availableStartDate) : undefined,
        cvUrl,
        academicDocumentsUrl,
        nationalIdUrl,
        coverLetterUrl,
        passportPhotoUrl,
        consentGiven:         true,
        consentGivenAt:       new Date(),
        status:               "SUBMITTED",
      },
      select: { id: true },
    })

    console.log(`[APPLY] Application ${application.id} created for job ${jobId} by ${email}`)

    // ── Send thank-you email (non-fatal) ──────────────────────────────────
    try {
      await sendThankYouEmail({
        applicantName:  fullName,
        applicantEmail: email,
        jobTitle:       job.title,
        department:     job.department,
        location:       job.location,
        deadline:       fmtDate(job.applicationDeadline.toISOString()),
        applicationId:  application.id,
      })
      console.log(`[APPLY] Thank-you email sent to ${email}`)
    } catch (mailErr: any) {
      console.error("[APPLY] Thank-you email failed:", mailErr.message)
    }

    return NextResponse.json(
      { success: true, data: { applicationId: application.id } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[APPLY] Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit application" },
      { status: 500 }
    )
  }
}