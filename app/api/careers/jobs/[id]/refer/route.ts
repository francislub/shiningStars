// app/api/careers/jobs/[id]/refer/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export const dynamic = "force-dynamic"

// ── Create transporter using Gmail SSL (port 465) ──────────────────────────
// NOTE: port 587 + STARTTLS is blocked on Vercel. Port 465 + SSL works.
function createTransporter() {
  return nodemailer.createTransport({
    host:   "smtp.gmail.com",
    port:   465,
    secure: true,                    // SSL — required for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (16 chars, no spaces)
    },
    tls: {
      rejectUnauthorized: true,
    },
    // Increase timeouts for Vercel's cold-start environment
    connectionTimeout: 10_000,
    greetingTimeout:   10_000,
    socketTimeout:     15_000,
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params
    const body = await req.json()

    const { recipientName, recipientEmail, jobUrl } = body

    if (!recipientName?.trim() || !recipientEmail?.trim()) {
      return NextResponse.json(
        { success: false, error: "recipientName and recipientEmail are required" },
        { status: 400 }
      )
    }

    // Verify env vars are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[REFER] EMAIL_USER or EMAIL_PASS env vars are missing")
      return NextResponse.json(
        { success: false, error: "Mail server not configured" },
        { status: 500 }
      )
    }

    // Verify job exists
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
        { success: false, error: "Job not found" },
        { status: 404 }
      )
    }

    const deadline = new Date(job.applicationDeadline).toLocaleDateString("en-UG", {
      day: "numeric", month: "long", year: "numeric",
    })

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Job Referral — ${job.title}</title>
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
                You've Been Referred for a Job!
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">
                Someone thinks you'd be a great fit
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Dear <strong>${recipientName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
                Someone thought you'd be a great fit for a position at
                <strong style="color:#1e3a8a;">Shining Stars Primary School</strong>.
                We'd love for you to apply!
              </p>

              <!-- Job Card -->
              <table cellpadding="0" cellspacing="0" width="100%"
                style="margin:0 0 28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;
                               text-transform:uppercase;color:#94a3b8;">
                      Open Position
                    </p>
                    <h2 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#0f2554;">
                      ${job.title}
                    </h2>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;">
                          <strong>Department:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${job.department}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;">
                          <strong>Location:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${job.location}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#dc2626;">
                          <strong>Deadline:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;font-weight:700;color:#dc2626;">
                          ${deadline}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:#1e4db7;border-radius:10px;">
                    <a href="${jobUrl}"
                       style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;
                              color:#ffffff;text-decoration:none;">
                      View Job &amp; Apply &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                Don't miss out — deadline is <strong style="color:#dc2626;">${deadline}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;
                       padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                This is an automated referral from the Shining Stars HR system.<br/>
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

    const info = await transporter.sendMail({
      from:    `"Shining Stars HR" <${process.env.EMAIL_USER}>`,
      to:      recipientEmail,
      subject: `Job Opportunity: ${job.title} at Shining Stars Primary School`,
      html,
      text: `Hi ${recipientName},\n\nYou've been referred for: ${job.title} (${job.department})\nLocation: ${job.location}\nDeadline: ${deadline}\n\nApply here: ${jobUrl}`,
    })

    console.log(`[REFER] Email sent to ${recipientEmail} — messageId: ${info.messageId}`)
    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("[REFER] Error sending email:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send referral" },
      { status: 500 }
    )
  }
}