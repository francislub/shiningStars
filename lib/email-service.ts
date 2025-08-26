import nodemailer from "nodemailer"

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send comment notification to admin
export async function sendCommentNotification(
  type: "event" | "news",
  contentTitle: string,
  contentId: string,
  commenterName: string,
  commenterEmail: string,
  comment: string,
) {
  const transporter = createTransporter()
  const adminEmail = process.env.ADMIN_EMAIL || "info@shiningstarsvvumba.com"

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Comment Notification - Shining Stars School</title>
      <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .comment-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
        .btn { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 New Comment Notification</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Shining Stars Nursery & Primary School Vvumba</p>
        </div>
        
        <div class="content">
          <h2>New Comment on ${type === "event" ? "Event" : "News"}</h2>
          <p><strong>${type === "event" ? "Event" : "News"} Title:</strong> ${contentTitle}</p>
          
          <div class="comment-box">
            <h3>Comment Details:</h3>
            <p><strong>Name:</strong> ${commenterName}</p>
            <p><strong>Email:</strong> ${commenterEmail}</p>
            <p><strong>Comment:</strong></p>
            <p style="font-style: italic; background: white; padding: 15px; border-radius: 6px;">"${comment}"</p>
          </div>
          
          <p>Please review and approve this comment if appropriate.</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${type}s/${contentId}" class="btn">
            View ${type === "event" ? "Event" : "News"}
          </a>
        </div>
        
        <div class="footer">
          <p><strong>Shining Stars Nursery & Primary School Vvumba</strong></p>
          <p>P.O Box 170262 Luwero, Uganda</p>
          <p>Reception: 0393102603 | HeadTeacher: 0393102604</p>
          <p>Email: info@shiningstarsvvumba.com</p>
          <p style="margin-top: 15px;">© ${new Date().getFullYear()} Shining Stars Nursery & Primary School Vvumba</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"Shining Stars School" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `New Comment on ${type === "event" ? "Event" : "News"}: ${contentTitle}`,
    html: emailHtml,
  })
}

// Send newsletter notification to all subscribers
export async function sendNewsletterNotification(type: "event" | "news", content: any) {
  try {
    console.log(
      `📧 Starting newsletter notification for ${type}: ${type === "event" ? content.activity : content.title}`,
    )

    const transporter = createTransporter()

    // Verify transporter configuration
    await transporter.verify()
    console.log("✅ Email transporter verified successfully")

    // Get all newsletter subscribers
    const { prisma } = await import("@/lib/prisma")
    const subscribers = await prisma.newsletter.findMany({
      select: { email: true },
    })

    console.log(`📋 Found ${subscribers.length} subscribers`)

    if (subscribers.length === 0) {
      console.log("⚠️ No subscribers found")
      return { success: true, message: "No subscribers to notify" }
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${type === "event" ? "New Event" : "Latest News"} - Shining Stars School</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: ${type === "event" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"}; padding: 30px; text-align: center; color: white; }
          .logo { width: 80px; height: 80px; background-color: white; border-radius: 50%; padding: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
          .content { padding: 30px; color: #333; }
          .content-card { background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid ${type === "event" ? "#10b981" : "#3b82f6"}; }
          .content-title { color: ${type === "event" ? "#059669" : "#1d4ed8"}; margin: 0 0 15px 0; font-size: 24px; font-weight: 700; }
          .content-image { width: 100%; max-width: 500px; border-radius: 10px; margin: 20px 0; height: auto; }
          .cta-section { text-align: center; margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 12px; }
          .cta-button { display: inline-block; background: ${type === "event" ? "#10b981" : "#3b82f6"}; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 16px; }
          .footer { background-color: #f3f4f6; padding: 25px; text-align: center; font-size: 14px; color: #6b7280; }
          .meta-item { background-color: ${type === "event" ? "#ecfdf5" : "#eff6ff"}; color: ${type === "event" ? "#065f46" : "#1e40af"}; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; display: inline-block; margin: 5px; }
          .no-comments-notice { background-color: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⭐</div>
            <h1>${type === "event" ? "🎉 New Event Alert!" : "📰 Latest News Update!"}</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Shining Stars Nursery & Primary School Vvumba</p>
          </div>
          
          <div class="content">
            <div style="background-color: ${type === "event" ? "#dcfce7" : "#dbeafe"}; color: ${type === "event" ? "#166534" : "#1e40af"}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px;">
              ${type === "event" ? "📅 NEW EVENT ANNOUNCED" : "🔥 BREAKING NEWS"}
            </div>
            
            <div class="content-card">
              <h2 class="content-title">
                ${type === "event" ? content.activity : content.title}
              </h2>
              
              <div style="margin-bottom: 15px;">
                ${content.date ? `<span class="meta-item">📅 ${new Date(content.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>` : ""}
                ${type === "event" && content.place ? `<span class="meta-item">📍 ${content.place}</span>` : ""}
                <span class="meta-item">⭐ Shining Stars School</span>
              </div>
              
              ${content.photo ? `<img src="${content.photo}" alt="${type === "event" ? content.activity : content.title}" class="content-image">` : ""}
              
              <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0;">
                ${content.description}
              </p>
            </div>

            <div class="no-comments-notice">
              <strong>📝 Please Note:</strong> This is an informational ${type === "event" ? "event announcement" : "news update"}. 
              Please do not reply to this email or attempt to comment on this ${type}. 
              For inquiries, contact us directly at info@shiningstarsvvumba.com or call 0393102603.
            </div>
            
            <div class="cta-section">
              <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px;">
                ${type === "event" ? "Don't miss out on this exciting event! Mark your calendar and join us." : "Stay connected with all the latest happenings at Shining Stars School."}
              </p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${type}s/${content.id}" class="cta-button">
                ${type === "event" ? "View Event Details" : "Read Full Story"}
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 25px; padding: 20px; background-color: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
              <p style="margin: 0; color: #0369a1; font-size: 14px; font-weight: 500;">
                📍 Shining Stars Nursery and Primary School, Vvumba<br>
                📞 Contact us for more information about our programs and activities
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px; font-weight: 600;"><strong>Shining Stars Nursery & Primary School Vvumba</strong></p>
            <p style="margin: 0 0 5px;">P.O Box 170262 Luwero, Uganda</p>
            <p style="margin: 0 0 5px;">📞 Reception: 0393102603 | HeadTeacher: 0393102604</p>
            <p style="margin: 0 0 15px;">📧 Email: info@shiningstarsvvumba.com</p>
            <p style="margin: 0 0 15px;">You're receiving this because you subscribed to our newsletter.</p>
            <p style="margin-top: 15px;">© ${new Date().getFullYear()} Shining Stars Nursery & Primary School Vvumba</p>
            <p style="font-size: 12px; margin-top: 15px; color: #9ca3af;">
              <a href="#" style="color: #6b7280;">Unsubscribe</a> | 
              <a href="#" style="color: #6b7280;">Update Preferences</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send emails in batches to avoid overwhelming SMTP server
    const batchSize = 10
    let successCount = 0
    let failureCount = 0

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize)
      console.log(
        `📤 Sending batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(subscribers.length / batchSize)} (${batch.length} emails)`,
      )

      const batchPromises = batch.map(async (subscriber) => {
        try {
          await transporter.sendMail({
            from: `"Shining Stars School" <${process.env.EMAIL_USER}>`,
            to: subscriber.email,
            subject:
              type === "event"
                ? `🎉 New Event: ${content.activity || content.title} - Shining Stars School`
                : `📰 Latest News: ${content.title} - Shining Stars School`,
            html: emailHtml,
          })
          console.log(`✅ Email sent to: ${subscriber.email}`)
          return { success: true, email: subscriber.email }
        } catch (error) {
          console.error(`❌ Failed to send email to ${subscriber.email}:`, error)
          return { success: false, email: subscriber.email, error: error.message }
        }
      })

      const batchResults = await Promise.allSettled(batchPromises)

      batchResults.forEach((result) => {
        if (result.status === "fulfilled" && result.value.success) {
          successCount++
        } else {
          failureCount++
        }
      })

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < subscribers.length) {
        console.log("⏳ Waiting 2 seconds before next batch...")
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    console.log(
      `📊 Newsletter summary: ${successCount} sent, ${failureCount} failed out of ${subscribers.length} total`,
    )

    return {
      success: true,
      message: `Newsletter sent to ${successCount} out of ${subscribers.length} subscribers`,
      emailsSent: successCount,
      emailsFailed: failureCount,
      totalSubscribers: subscribers.length,
    }
  } catch (error) {
    console.error("❌ Error in sendNewsletterNotification:", error)
    throw error
  }
}
