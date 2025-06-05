import { connect } from "../../../../dbConfig/dbConfig"
import newsLetter from "../../../../models/emailsModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { type, title, content, imageUrl, date, link } = reqBody

    // Validate request
    if (!type || !title || !content) {
      return NextResponse.json({ error: "Type, title and content are required" }, { status: 400 })
    }

    // Get all subscribers
    const subscribers = await newsLetter.find({})

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers found" }, { status: 200 })
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

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: subscriber.newsemail,
          subject:
            type === "event"
              ? `New Event: ${title} - Shining Stars School`
              : `Latest News: ${title} - Shining Stars School`,
          html: getEmailTemplate(type, title, content, imageUrl, date, link),
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
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getEmailTemplate(
  type: string,
  title: string,
  content: string,
  imageUrl?: string,
  date?: string,
  link?: string,
) {
  const isEvent = type === "event"
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
      
      .description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
      }
      
      .cta-button {
        display: inline-block;
        background-color: ${isEvent ? "#f59e0b" : "#4f46e5"};
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: 500;
        margin-top: 10px;
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
        
        ${date ? `<div class="date">${formattedDate}</div>` : ""}
        
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
        
        ${
          link
            ? `
        <a href="${link}" class="cta-button">
          ${isEvent ? "Learn More About This Event" : "Read Full Article"}
        </a>
        `
            : ""
        }
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
