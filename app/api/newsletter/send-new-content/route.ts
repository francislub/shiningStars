import { connect } from "../../../../dbConfig/dbConfig"
import newsLetter from "../../../../models/emailsModel"
import EventModel from "../../../../modules/event"
import NewModel from "../../../../modules/new"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { type, contentId } = reqBody

    // Validate request
    if (!type || (type !== "event" && type !== "news")) {
      return NextResponse.json({ error: "Type must be 'event' or 'news'" }, { status: 400 })
    }

    if (!contentId) {
      return NextResponse.json({ error: "Missing required field: contentId" }, { status: 400 })
    }

    // Fetch the actual content from database
    let content
    if (type === "event") {
      content = await EventModel.findById(contentId).populate("creator")
      if (!content) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 })
      }
    } else {
      content = await NewModel.findById(contentId).populate("creator")
      if (!content) {
        return NextResponse.json({ error: "News not found" }, { status: 404 })
      }
    }

    // Get all active subscribers from database
    const subscribers = await newsLetter.find({ isActive: { $ne: false } })

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers found" }, { status: 200 })
    }

    // Check email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        {
          success: false,
          error: "Email credentials not configured",
        },
        { status: 500 },
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Verify transporter
    await transporter.verify()

    // Prepare content data for email template
    const contentData = {
      title: type === "event" ? content.activity : content.title,
      description: content.description,
      date: content.date,
      photo: content.photo,
      place: type === "event" ? content.place : null,
      contentId: content._id,
    }

    // Send emails to all subscribers
    let successCount = 0
    let failureCount = 0
    const results = []

    console.log(`📧 Sending ${type} notification to ${subscribers.length} subscribers...`)
    console.log(`📄 Content: ${contentData.title}`)

    for (const subscriber of subscribers) {
      try {
        const emailResult = await transporter.sendMail({
          from: `"Shining Stars Nursery and Primary School, Vvumba" <${emailUser}>`,
          to: subscriber.newsemail,
          subject:
            type === "event"
              ? `🎉 New Event: ${contentData.title} - Shining Stars Nursery and Primary School, Vvumba`
              : `📰 Latest News: ${contentData.title} - Shining Stars Nursery and Primary School, Vvumba`,
          html: getNewContentEmailTemplate(type, contentData),
        })

        console.log(`✅ ${type} notification sent to: ${subscriber.newsemail}`)
        successCount++
        results.push({
          email: subscriber.newsemail,
          sent: true,
          messageId: emailResult.messageId,
        })

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Failed to send ${type} notification to ${subscriber.newsemail}:`, error.message)
        failureCount++
        results.push({
          email: subscriber.newsemail,
          sent: false,
          error: error.message,
        })
      }
    }

    console.log(`📧 ${type} notification summary: ${successCount} sent, ${failureCount} failed`)

    return NextResponse.json(
      {
        success: true,
        message: `Successfully sent ${successCount} out of ${subscribers.length} ${type} notifications`,
        type,
        title: contentData.title,
        emailsSent: successCount,
        emailsFailed: failureCount,
        totalSubscribers: subscribers.length,
        results,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(`❌ Error sending content notification:`, error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

function getNewContentEmailTemplate(type: string, content: any) {
  const isEvent = type === "event"
  const currentYear = new Date().getFullYear()

  const contentDate = content.date
    ? new Date(content.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${isEvent ? "New Event" : "Latest News"} - Shining Stars Nursery and Primary School, Vvumba</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        line-height: 1.6;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      
      .header {
        background: ${
          isEvent
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
        };
        padding: 30px 20px;
        text-align: center;
        color: white;
      }
      
      .logo {
        width: 80px;
        height: 80px;
        background-color: white;
        border-radius: 50%;
        padding: 10px;
        margin: 0 auto 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
      }
      
      .header h1 {
        color: white;
        margin: 0;
        font-size: 28px;
        font-weight: 700;
      }
      
      .header p {
        color: rgba(255, 255, 255, 0.9);
        margin: 10px 0 0;
        font-size: 16px;
      }
      
      .content {
        padding: 30px 25px;
        color: #333;
      }
      
      .announcement-badge {
        background: ${isEvent ? "#dcfce7" : "#dbeafe"};
        color: ${isEvent ? "#166534" : "#1e40af"};
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 20px;
      }
      
      .content-card {
        background-color: #f8fafc;
        border-radius: 12px;
        padding: 25px;
        margin-bottom: 25px;
        border-left: 4px solid ${isEvent ? "#10b981" : "#3b82f6"};
      }
      
      .content-title {
        color: ${isEvent ? "#059669" : "#1d4ed8"};
        margin: 0 0 15px 0;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.3;
      }
      
      .content-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
      }
      
      .meta-item {
        background-color: ${isEvent ? "#ecfdf5" : "#eff6ff"};
        color: ${isEvent ? "#065f46" : "#1e40af"};
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      
      .content-description {
        color: #374151;
        font-size: 16px;
        line-height: 1.7;
        margin: 0;
      }
      
      .content-image {
        width: 100%;
        max-width: 500px;
        border-radius: 10px;
        margin: 20px 0;
        height: auto;
      }
      
      .cta-section {
        text-align: center;
        margin-top: 30px;
        padding: 25px;
        background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        border-radius: 12px;
      }
      
      .cta-button {
        display: inline-block;
        background: ${isEvent ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 12px 30px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease;
      }
      
      .footer {
        background-color: #f3f4f6;
        padding: 25px;
        text-align: center;
        font-size: 14px;
        color: #6b7280;
      }
      
      .social-links {
        margin-top: 15px;
      }
      
      .social-links a {
        display: inline-block;
        margin: 0 10px;
        color: #4f46e5;
        text-decoration: none;
        font-weight: 500;
      }
      
      @media only screen and (max-width: 600px) {
        .container {
          width: 100%;
          border-radius: 0;
        }
        
        .header {
          padding: 20px 15px;
        }
        
        .header h1 {
          font-size: 24px;
        }
        
        .content {
          padding: 20px 15px;
        }
        
        .content-title {
          font-size: 20px;
        }
        
        .content-meta {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">
          ⭐
        </div>
        <h1>${isEvent ? "🎉 New Event Alert!" : "📰 Latest News Update!"}</h1>
        <p>Shining Stars Nursery and Primary School, Vvumba</p>
      </div>
      
      <div class="content">
        <div class="announcement-badge">
          ${isEvent ? "📅 NEW EVENT ANNOUNCED" : "🔥 BREAKING NEWS"}
        </div>
        
        <div class="content-card">
          <h2 class="content-title">${content.title}</h2>
          
          <div class="content-meta">
            ${contentDate ? `<span class="meta-item">📅 ${contentDate}</span>` : ""}
            ${content.place && isEvent ? `<span class="meta-item">📍 ${content.place}</span>` : ""}
            <span class="meta-item">⭐ Shining Stars Nursery and Primary School, Vvumba</span>
          </div>
          
          ${content.photo ? `<img src="${content.photo}" alt="${content.title}" class="content-image">` : ""}
          
          <p class="content-description">${content.description}</p>
        </div>
        
        <div class="cta-section">
          <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px;">
            ${
              isEvent
                ? "Don't miss out on this exciting event! Mark your calendar and join us."
                : "Stay connected with all the latest happenings at Shining Stars Nursery and Primary School, Vvumba."
            }
          </p>
          <a href="https://www.shiningstarsvvumba.com/${isEvent ? `events/${content.contentId}` : `news/${content.contentId}`}" class="cta-button">
            ${isEvent ? "View Event Details" : "Read Full Story"}
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
        <p style="margin: 0 0 10px; font-weight: 600;">© ${currentYear} Shining Stars Nursery and Primary School, Vvumba</p>
        <p style="margin: 0 0 15px;">You're receiving this because you subscribed to our newsletter.</p>
        <div class="social-links">
          <a href="#">Facebook</a> | 
          <a href="#">Twitter</a> | 
          <a href="#">Instagram</a> | 
          <a href="#">Website</a>
        </div>
        <p style="font-size: 12px; margin-top: 15px; color: #9ca3af;">
          <a href="#" style="color: #6b7280;">Unsubscribe</a> | 
          <a href="#" style="color: #6b7280;">Update Preferences</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `
}
