import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export interface FeedbackMailOptions {
  to: string
  applicantName: string
  jobTitle: string
  status: string
  subject: string
  message: string
}

function statusColor(status: string): string {
  const map: Record<string, string> = {
    SHORTLISTED:          "#16a34a",
    INTERVIEW_SCHEDULED:  "#2563eb",
    INTERVIEWED:          "#7c3aed",
    OFFERED:              "#0891b2",
    HIRED:                "#15803d",
    REJECTED:             "#dc2626",
    UNDER_REVIEW:         "#d97706",
    WITHDRAWN:            "#6b7280",
  }
  return map[status] ?? "#1e3a8a"
}

function statusLabel(status: string): string {
  return status.replace(/_/g, " ")
}

export async function sendApplicationFeedback(opts: FeedbackMailOptions) {
  const color = statusColor(opts.status)
  const label = statusLabel(opts.status)

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${opts.subject}</title>
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
                Application Status Update
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">
                ${opts.jobTitle}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Dear <strong>${opts.applicantName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
                Thank you for applying for the <strong style="color:#1e3a8a;">${opts.jobTitle}</strong> position.
                We would like to update you on the current status of your application.
              </p>

              <!-- Status Badge -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:${color}15;border:1.5px solid ${color}40;border-radius:10px;padding:14px 22px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${color}80;">
                      Current Status
                    </p>
                    <p style="margin:4px 0 0;font-size:16px;font-weight:800;color:${color};">
                      ${label}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background:#f8fafc;border-left:4px solid ${color};border-radius:0 10px 10px 0;padding:18px 20px;margin:0 0 28px;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;white-space:pre-line;">${opts.message}</p>
              </div>

              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;line-height:1.6;">
                If you have any questions, please don't hesitate to reach out to our HR team.
              </p>
              <p style="margin:0;font-size:13px;color:#9ca3af;">
                Reply to this email or contact us at
                <a href="mailto:${process.env.EMAIL_USER}" style="color:#2563eb;text-decoration:none;">${process.env.EMAIL_USER}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                This is an automated message from the Shining Stars HR system.<br/>
                Please do not reply directly to this notification.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  await transporter.sendMail({
    from: `"Shining Stars HR" <${process.env.EMAIL_USER}>`,
    to: opts.to,
    subject: opts.subject,
    html,
  })
}