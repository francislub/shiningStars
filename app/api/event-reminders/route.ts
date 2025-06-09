import { connect } from "../../../dbConfig/dbConfig"
import newsLetter from "../../../models/emailsModel"
import { activities } from "../../../lib/constants"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { parseISO, format, addDays, isSameDay, startOfDay } from "date-fns"

export async function POST(request: NextRequest) {
  try {
    console.log("=== EVENT REMINDER SYSTEM STARTED ===")
    console.log(`Current time: ${new Date().toISOString()}`)

    // Get tomorrow's date
    const tomorrow = addDays(new Date(), 1)
    const tomorrowStart = startOfDay(tomorrow)
    console.log(`Checking for events on: ${format(tomorrow, "MMM dd, yyyy")}`)

    // Debug: Show all events in the system
    console.log("📅 All events in system:")
    activities.forEach((activity, index) => {
      const eventDate = parseISO(activity.startDatetime)
      console.log(`${index + 1}. ${activity.title} - ${format(eventDate, "MMM dd, yyyy")} (${activity.startDatetime})`)
    })

    // Find events happening tomorrow
    const tomorrowEvents = activities.filter((activity) => {
      const eventDate = parseISO(activity.startDatetime)
      const eventStart = startOfDay(eventDate)
      const isTomorrow = isSameDay(eventStart, tomorrowStart)

      console.log(
        `Checking ${activity.title}: ${format(eventDate, "MMM dd, yyyy")} vs ${format(tomorrow, "MMM dd, yyyy")} = ${isTomorrow}`,
      )

      return isTomorrow
    })

    console.log(`✅ Found ${tomorrowEvents.length} events for tomorrow:`)
    tomorrowEvents.forEach((event) => {
      console.log(`- ${event.title} at ${format(parseISO(event.startDatetime), "h:mm a")}`)
    })

    if (tomorrowEvents.length === 0) {
      console.log("ℹ️ No events tomorrow, no reminders needed")
      return NextResponse.json(
        {
          success: true,
          message: "No events tomorrow, no reminders sent",
          date: format(tomorrow, "MMM dd, yyyy"),
          totalEvents: activities.length,
          checkedDate: tomorrow.toISOString(),
        },
        { status: 200 },
      )
    }

    // Try to connect to database and get subscribers
    let subscribers = []
    try {
      await connect()

      // Use aggregate instead of find to avoid type issues
      const subscriberResults = await newsLetter.aggregate([
        { $match: {} }, // Get all documents
        { $project: { newsemail: 1, isActive: 1, _id: 1 } }, // Only get needed fields
      ])

      console.log(`✅ Found ${subscriberResults.length} total subscribers`)

      // Filter active subscribers (those without isActive: false)
      const activeSubscribers = subscriberResults.filter((sub) => sub.isActive !== false)
      console.log(`✅ Found ${activeSubscribers.length} active subscribers`)
      subscribers = activeSubscribers
    } catch (dbError) {
      console.log("❌ Database connection failed:", dbError.message)
      console.log("⚠️ Cannot send reminders without subscriber list")
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed - cannot access subscribers",
          events: tomorrowEvents.length,
          dbError: dbError.message,
        },
        { status: 500 },
      )
    }

    if (subscribers.length === 0) {
      console.log("⚠️ No active subscribers found")
      return NextResponse.json(
        {
          success: true,
          message: "No active subscribers found",
          events: tomorrowEvents.length,
          totalSubscribers: 0,
        },
        { status: 200 },
      )
    }

    // Check email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      console.log("❌ Email credentials not found")
      console.log("EMAIL_USER:", emailUser ? "✅ Set" : "❌ Missing")
      console.log("EMAIL_PASS:", emailPass ? "✅ Set" : "❌ Missing")

      return NextResponse.json(
        {
          success: false,
          error: "Email credentials not configured",
          events: tomorrowEvents.length,
          subscribers: subscribers.length,
          emailUser: !!emailUser,
          emailPass: !!emailPass,
        },
        { status: 500 },
      )
    }

    // Create email transporter
    let transporter
    try {
      transporter = nodemailer.createTransporter({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      })

      // Test the connection
      await transporter.verify()
      console.log("✅ Email transporter created and verified successfully")
    } catch (emailError) {
      console.log("❌ Email transporter failed:", emailError.message)
      return NextResponse.json(
        {
          success: false,
          error: "Email configuration failed",
          emailError: emailError.message,
          events: tomorrowEvents.length,
          subscribers: subscribers.length,
        },
        { status: 500 },
      )
    }

    // Send reminder emails to all subscribers
    let successCount = 0
    let failureCount = 0
    const results = []

    console.log(`📧 Starting to send emails to ${subscribers.length} subscribers...`)

    for (const subscriber of subscribers) {
      try {
        const emailResult = await transporter.sendMail({
          from: `"Shining Stars School" <${emailUser}>`,
          to: subscriber.newsemail,
          subject: `📅 Event Reminder: Tomorrow's Activities at Shining Stars`,
          html: getEventReminderTemplate(tomorrowEvents, tomorrow),
        })

        console.log(`✅ Reminder sent to: ${subscriber.newsemail} (MessageId: ${emailResult.messageId})`)
        successCount++
        results.push({ email: subscriber.newsemail, sent: true, messageId: emailResult.messageId })

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Failed to send reminder to ${subscriber.newsemail}:`, error.message)
        failureCount++
        results.push({ email: subscriber.newsemail, sent: false, error: error.message })
      }
    }

    console.log(`📧 Email Summary: ${successCount} sent, ${failureCount} failed`)

    return NextResponse.json(
      {
        success: true,
        message: `Event reminders processed successfully`,
        eventsCount: tomorrowEvents.length,
        emailsSent: successCount,
        emailsFailed: failureCount,
        totalSubscribers: subscribers.length,
        date: format(tomorrow, "MMM dd, yyyy"),
        events: tomorrowEvents.map((e) => ({
          title: e.title,
          time: format(parseISO(e.startDatetime), "h:mm a"),
          date: format(parseISO(e.startDatetime), "MMM dd, yyyy"),
        })),
        results,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Critical error in event reminder system:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Manual trigger endpoint (GET request)
export async function GET() {
  console.log("📅 Manual event reminder check triggered via GET")
  const request = new Request("https://www.shiningstarsvvumba.com/api/event-reminders", {
    method: "POST",
  })
  return POST(request as NextRequest)
}

function getEventReminderTemplate(events: any[], eventDate: Date) {
  const eventsHtml = events
    .map((event) => {
      const startTime = parseISO(event.startDatetime)
      const endTime = parseISO(event.endDatetime)

      return `
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
        <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
          📅 ${event.title}
        </h3>
        
        <div style="background-color: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; display: inline-block; margin-bottom: 12px;">
          ⏰ ${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}
        </div>
        
        <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 15px;">
          ${event.description}
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
    <title>Tomorrow's Events - Shining Stars School</title>
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
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
      
      .date-banner {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: white;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 25px;
        font-size: 18px;
        font-weight: 600;
      }
      
      .footer {
        background-color: #f3f4f6;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #6b7280;
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
          ⭐
        </div>
        <h1>📅 Event Reminder</h1>
        <p>Shining Stars Nursery and Primary School, Vvumba</p>
      </div>
      
      <div class="content">
        <div class="date-banner">
          🗓️ Tomorrow: ${format(eventDate, "EEEE, MMMM do, yyyy")}
        </div>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px; text-align: center;">
          Don't forget about these important events happening tomorrow at Shining Stars School!
        </p>
        
        ${eventsHtml}
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
          <p style="margin: 0; color: #0369a1; font-size: 14px; font-weight: 500;">
            📍 Shining Stars Nursery and Primary School, Vvumba<br>
            📞 For more information, please contact the school office
          </p>
        </div>
      </div>
      
      <div class="footer">
        <p>© 2024 Shining Stars Nursery and Primary School, Vvumba</p>
        <p>You're receiving this reminder because you subscribed to our newsletter.</p>
        <p style="font-size: 12px; margin-top: 10px;">
          <a href="#" style="color: #6b7280;">Unsubscribe</a> | 
          <a href="#" style="color: #6b7280;">Update Preferences</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `
}
