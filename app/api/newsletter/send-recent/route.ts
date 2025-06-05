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
    const { type, days = 7 } = reqBody // Default to last 7 days

    // Validate request
    if (!type || (type !== "events" && type !== "news")) {
      return NextResponse.json({ error: "Type must be 'events' or 'news'" }, { status: 400 })
    }

    // Get all subscribers
    const subscribers = await newsLetter.find({})

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers found" }, { status: 200 })
    }

    // Calculate date range for recent items
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    let recentItems = []

    if (type === "events") {
      recentItems = await EventModel.find({
        createdAt: { $gte: dateFrom },
      })
        .sort({ createdAt: -1 })
        .limit(5)
    } else {
      recentItems = await NewModel.find({
        createdAt: { $gte: dateFrom },
      })
        .sort({ createdAt: -1 })
        .limit(5)
    }

    if (!recentItems || recentItems.length === 0) {
      return NextResponse.json({ message: `No recent ${type} found in the last ${days} days` }, { status: 200 })
    }

    const user = process.env.EMAIL_USER

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: subscriber.newsemail,
          subject:
            type === "events"
              ? `Latest Events from Shining Stars School - Vvumba`
              : `Latest News from Shining Stars School - Vvumba`,
          html: getRecentItemsEmailTemplate(type, recentItems),
        })
        return { email: subscriber.newsemail, sent: true }
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.newsemail}:`, error)
        return { email: subscriber.newsemail, sent: false, error: error.message }
      }
    })

    const results = await Promise.all(emailPromises)
    const successCount = results.filter((r) => r.sent).length

    return NextResponse.json(
      {
        success: true,
        message: `Successfully sent ${successCount} out of ${subscribers.length} emails`,
        itemsCount: recentItems.length,
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getRecentItemsEmailTemplate(type: string, items: any[]) {
  const isEvent = type === "events"
  const title = isEvent ? "Latest School Events" : "Latest School News"
  const subtitle = isEvent
    ? "Don't miss out on these exciting upcoming events!"
    : "Stay updated with what's happening at our school!"

  const itemsHtml = items
    .map((item) => {
      const itemDate = item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : ""

      return `
      <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid ${isEvent ? "#f59e0b" : "#4f46e5"};">
        ${
          item.photo
            ? `
          <div style="margin-bottom: 15px;">
            <img src="${item.photo}" alt="${isEvent ? item.activity : item.title}" style="width: 100%; max-width: 400px; border-radius: 8px; height: auto;">
          </div>
        `
            : ""
        }
        
        <h3 style="color: ${isEvent ? "#d97706" : "#4f46e5"}; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
          ${isEvent ? item.activity : item.title}
        </h3>
        
        ${
          itemDate
            ? `
          <div style="background-color: ${isEvent ? "#fef3c7" : "#ede9fe"}; color: ${isEvent ? "#92400e" : "#5b21b6"}; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; display: inline-block; margin-bottom: 12px;">
            📅 ${itemDate}
          </div>
        `
            : ""
        }
        
        ${
          item.place && isEvent
            ? `
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
            📍 <strong>Location:</strong> ${item.place}
          </div>
        `
            : ""
        }
        
        <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 15px;">
          ${item.description}
        </p>
      </div>
    `
    })
    .join("")

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Shining Stars School</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
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
            ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
        };
        padding: 30px 20px;
        text-align: center;
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
      
      .subtitle {
        font-size: 18px;
        color: #6b7280;
        text-align: center;
        margin-bottom: 30px;
        line-height: 1.5;
      }
      
      .footer {
        background-color: #f3f4f6;
        padding: 20px;
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
      }
      
      .logo {
        width: 80px;
        height: 80px;
        background-color: white;
        border-radius: 50%;
        padding: 10px;
        margin: 0 auto 15px;
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
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">
          <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841947c00006b45cc93/view?project=683381d6001779054d64&mode=admin" alt="Shining Stars Logo" style="width: 100%; height: auto; border-radius: 50%;">
        </div>
        <h1>${title}</h1>
        <p>Shining Stars Nursery and Primary School, Vvumba</p>
      </div>
      
      <div class="content">
        <div class="subtitle">${subtitle}</div>
        
        ${itemsHtml}
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            Visit our website for more information about Shining Stars School
          </p>
        </div>
      </div>
      
      <div class="footer">
        <p>© 2024 Shining Stars Nursery and Primary School, Vvumba</p>
        <p>You're receiving this email because you subscribed to our newsletter.</p>
        <div class="social-links">
          <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `
}
