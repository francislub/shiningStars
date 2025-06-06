import { connect } from "../../../../dbConfig/dbConfig"
import newsLetter from "../../../../models/emailsModel"
import EventModel from "../../../../modules/event"
import NewModel from "../../../../modules/new"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
const currentYear = new Date().getFullYear();

connect()

export async function POST(request: NextRequest) {
  try {
    // Check if subscribers exist first
    const subscriberCount = await newsLetter.countDocuments({})

    if (subscriberCount === 0) {
      return NextResponse.json({ message: "No subscribers found" }, { status: 200 })
    }

    // Get all subscribers using type assertion
    const subscribers = await (newsLetter as any).find({})

    // Check if events exist, then get the latest one
    const eventCount = await (EventModel as any).countDocuments({})
    let latestEvent = null
    if (eventCount > 0) {
      latestEvent = await (EventModel as any).findOne().sort({ createdAt: -1 })
    }

    // Check if news exist, then get the latest one
    const newsCount = await (NewModel as any).countDocuments({})
    let latestNews = null
    if (newsCount > 0) {
      latestNews = await (NewModel as any).findOne().sort({ createdAt: -1 })
    }

    if (!latestEvent && !latestNews) {
      return NextResponse.json({ message: "No events or news found" }, { status: 200 })
    }

    const user = process.env.EMAIL_USER

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: process.env.EMAIL_PASS,
      },
    })

    let emailsSent = 0
    const results = []

    // Send latest event if exists
    if (latestEvent) {
      const eventEmailPromises = subscribers.map(async (subscriber) => {
        try {
          await transporter.sendMail({
            from: `"Shining Stars School" <${user}>`,
            to: subscriber.newsemail,
            subject: `New Event: ${latestEvent.activity} - Shining Stars School`,
            html: getSingleItemEmailTemplate("event", latestEvent),
          })
          return { email: subscriber.newsemail, type: "event", sent: true }
        } catch (error) {
          console.error(`Failed to send event email to ${subscriber.newsemail}:`, error)
          return { email: subscriber.newsemail, type: "event", sent: false, error: error.message }
        }
      })

      const eventResults = await Promise.all(eventEmailPromises)
      results.push(...eventResults)
      emailsSent += eventResults.filter((r) => r.sent).length
    }

    // Send latest news if exists
    if (latestNews) {
      const newsEmailPromises = subscribers.map(async (subscriber) => {
        try {
          await transporter.sendMail({
            from: `"Shining Stars School" <${user}>`,
            to: subscriber.newsemail,
            subject: `Latest News: ${latestNews.title} - Shining Stars School`,
            html: getSingleItemEmailTemplate("news", latestNews),
          })
          return { email: subscriber.newsemail, type: "news", sent: true }
        } catch (error) {
          console.error(`Failed to send news email to ${subscriber.newsemail}:`, error)
          return { email: subscriber.newsemail, type: "news", sent: false, error: error.message }
        }
      })

      const newsResults = await Promise.all(newsEmailPromises)
      results.push(...newsResults)
      emailsSent += newsResults.filter((r) => r.sent).length
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully sent ${emailsSent} emails to ${subscribers.length} subscribers`,
        latestEvent: latestEvent ? latestEvent.activity : null,
        latestNews: latestNews ? latestNews.title : null,
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getSingleItemEmailTemplate(type: string, item: any) {
  const isEvent = type === "event"
  const title = isEvent ? item.activity : item.title
  const content = item.description
  const imageUrl = item.photo
  const date = item.date

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
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
    <title>${isEvent ? "New Event" : "Latest News"} from Shining Stars School</title>
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
      
      .image-container {
        margin-bottom: 25px;
        text-align: center;
      }
      
      .image-container img {
        max-width: 100%;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 15px;
        color: ${isEvent ? "#d97706" : "#4f46e5"};
      }
      
      .date {
        display: inline-block;
        background-color: ${isEvent ? "#fef3c7" : "#ede9fe"};
        color: ${isEvent ? "#92400e" : "#5b21b6"};
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      
      .location {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 15px;
      }
      
      .description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
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
        <h1>${isEvent ? "New School Event" : "Latest School News"}</h1>
        <p>Shining Stars Nursery and Primary School, Vvumba</p>
      </div>
      
      <div class="content">
        <div class="title">${title}</div>
        
        ${formattedDate ? `<div class="date">📅 ${formattedDate}</div>` : ""}
        
        ${item.place && isEvent ? `<div class="location">📍 <strong>Location:</strong> ${item.place}</div>` : ""}
        
        ${
          imageUrl
            ? `
        <div class="image-container">
          <img src="${imageUrl}" alt="${title}">
        </div>
        `
            : ""
        }
        
        <div class="description">
          ${content}
        </div>
      </div>
      
      <div class="footer">
        <p>© ${currentYear} Shining Stars Nursery and Primary School, Vvumba</p>
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
