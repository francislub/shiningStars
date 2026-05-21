// ============================================================
// FILE: app/api/careers/jobs/[id]/refer/route.ts
// ROUTE: POST /api/careers/jobs/[id]/refer
// ============================================================
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export const dynamic = "force-dynamic"

// ── Nodemailer transporter ────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host:   "smtp.gmail.com",
    port:   465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout:   10_000,
    socketTimeout:     15_000,
  })
}

// ── Referral email → recipient ────────────────────────────────────────────────

async function sendReferralEmail({
  recipientName,
  recipientEmail,
  jobTitle,
  department,
  location,
  deadline,
  jobUrl,
}: {
  recipientName: string
  recipientEmail: string
  jobTitle: string
  department: string
  location: string
  deadline: string
  jobUrl: string
}) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Job Referral — ${jobTitle}</title>
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
                      ${jobTitle}
                    </h2>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;">
                          <strong>Department:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${department}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;">
                          <strong>Location:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">${location}</td>
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
                This is an automated referral from the Shining Stars Management system.<br/>
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
    from:    `"Shining Stars Management" <${process.env.EMAIL_USER}>`,
    to:      recipientEmail,
    subject: `Job Opportunity: ${jobTitle} at Shining Stars Primary School`,
    html,
    text: `Hi ${recipientName},\n\nYou've been referred for: ${jobTitle} (${department})\nLocation: ${location}\nDeadline: ${deadline}\n\nApply here: ${jobUrl}`,
  })
}

// ── Admin referral alert email → all ADMIN users ──────────────────────────────

async function sendAdminReferralAlert({
  adminEmail,
  adminName,
  recipientName,
  recipientEmail,
  jobTitle,
  department,
  location,
  deadline,
  jobUrl,
}: {
  adminEmail: string
  adminName: string | null
  recipientName: string
  recipientEmail: string
  jobTitle: string
  department: string
  location: string
  deadline: string
  jobUrl: string
}) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Job Referral Alert — ${jobTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0f2554 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#93c5fd;">
                Shining Stars Management System
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">
                🔔 Job Referral Notification
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">
                A candidate has been referred for an open position.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Hi <strong>${adminName ?? "Admin"}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
                A referral email has been sent to a candidate for an open position at
                <strong style="color:#1e3a8a;">Shining Stars Primary School</strong>.
                Here are the details:
              </p>

              <!-- Referred Candidate Card -->
              <table cellpadding="0" cellspacing="0" width="100%"
                style="margin:0 0 24px;background:#fefce8;border:1px solid #fde68a;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;
                               text-transform:uppercase;color:#d97706;">
                      Referred Candidate
                    </p>
                    <h2 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#92400e;">
                      ${recipientName}
                    </h2>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 12px 4px 0;font-size:13px;color:#6b7280;white-space:nowrap;">
                          <strong>Email:</strong>
                        </td>
                        <td style="padding:4px 0;font-size:13px;color:#374151;">
                          <a href="mailto:${recipientEmail}" style="color:#1e4db7;text-decoration:none;">${recipientEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Job Card -->
              <table cellpadding="0" cellspacing="0" width="100%"
                style="margin:0 0 28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;
                               text-transform:uppercase;color:#94a3b8;">
                      Position
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
                        <td style="padding:4px 0;font-size:13px;color:#dc2626;font-weight:700;">${deadline}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- View Job Link -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="background:#0f2554;border-radius:10px;">
                    <a href="${jobUrl}"
                       style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;
                              color:#ffffff;text-decoration:none;">
                      View Job Posting &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                The referred candidate has been emailed the job details and a direct link to apply.
                No action is required on your part unless you wish to follow up.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                This is an automated admin alert from the Shining Stars Management system.<br/>
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
    from:    `"Shining Stars Management System" <${process.env.EMAIL_USER}>`,
    to:      adminEmail,
    subject: `[Referral Alert] ${recipientName} was referred for ${jobTitle}`,
    html,
    text: `Hi ${adminName ?? "Admin"},\n\nA referral has been sent.\n\nReferred Candidate: ${recipientName}\nEmail: ${recipientEmail}\n\nPosition: ${jobTitle}\nDepartment: ${department}\nLocation: ${location}\nDeadline: ${deadline}\n\nJob URL: ${jobUrl}\n\n— Shining Stars Management System`,
  })
}

// ── Main handler ──────────────────────────────────────────────────────────────

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

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[REFER] EMAIL_USER or EMAIL_PASS env vars are missing")
      return NextResponse.json(
        { success: false, error: "Mail server not configured" },
        { status: 500 }
      )
    }

    // ── Verify job exists ─────────────────────────────────────────────────
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

    // ── Fetch all ADMIN users ─────────────────────────────────────────────
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { email: true, name: true },
    })

    // ── Send referral email to recipient ──────────────────────────────────
    try {
      await sendReferralEmail({
        recipientName:  recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        jobTitle:       job.title,
        department:     job.department,
        location:       job.location,
        deadline,
        jobUrl:         jobUrl ?? "",
      })
      console.log(`[REFER] Referral email sent to recipient ${recipientEmail}`)
    } catch (err: any) {
      console.error("[REFER] Referral email to recipient failed:", err.message)
      // If the primary referral email fails, return an error (this is the core purpose of the route)
      return NextResponse.json(
        { success: false, error: "Failed to send referral email" },
        { status: 500 }
      )
    }

    // ── Send admin alert emails (non-fatal, parallel) ─────────────────────
    if (admins.length > 0) {
      const adminEmailPromises = admins.map((admin) =>
        sendAdminReferralAlert({
          adminEmail:     admin.email,
          adminName:      admin.name,
          recipientName:  recipientName.trim(),
          recipientEmail: recipientEmail.trim(),
          jobTitle:       job.title,
          department:     job.department,
          location:       job.location,
          deadline,
          jobUrl:         jobUrl ?? "",
        }).catch((err: any) => {
          console.error(`[REFER] Admin alert to ${admin.email} failed:`, err.message)
        })
      )
      await Promise.allSettled(adminEmailPromises)
      console.log(`[REFER] Admin referral alerts dispatched to ${admins.length} admin(s)`)
    } else {
      console.warn("[REFER] No ADMIN users found — skipping admin referral alert emails")
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("[REFER] Error:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send referral" },
      { status: 500 }
    )
  }
}