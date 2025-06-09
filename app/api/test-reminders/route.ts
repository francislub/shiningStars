import { connect } from "../../../dbConfig/dbConfig"
import newsLetter from "../../../models/emailsModel"
import { activities } from "../../../lib/constants"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { parseISO, format, addDays, isSameDay, startOfDay } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testDate = searchParams.get("date")
    const shouldSend = searchParams.get("send") === "true"

    console.log("=== EVENT REMINDER TEST STARTED ===")
    console.log(`Test date: ${testDate || "tomorrow"}`)
    console.log(`Send emails: ${shouldSend}`)

    // Determine the target date
    let targetDate: Date
    if (testDate) {
      targetDate = addDays(new Date(testDate), 1) // Events for the day after the test date
    } else {
      targetDate = addDays(new Date(), 1) // Tomorrow
    }

    const targetStart = startOfDay(targetDate)
    console.log(`Looking for events on: ${format(targetDate, "MMM dd, yyyy")}`)

    // Debug: Show all events in the system
    console.log("📅 All events in system:")
    activities.forEach((activity, index) => {
      const eventDate = parseISO(activity.startDatetime)
      console.log(`${index + 1}. ${activity.title} - ${format(eventDate, "MMM dd, yyyy")} (${activity.startDatetime})`)
    })

    // Find events for target date
    const targetEvents = activities.filter((activity) => {
      const eventDate = parseISO(activity.startDatetime)
      const eventStart = startOfDay(eventDate)
      const isTargetDay = isSameDay(eventStart, targetStart)

      console.log(
        `Checking ${activity.title}: ${format(eventDate, "MMM dd, yyyy")} vs ${format(targetDate, "MMM dd, yyyy")} = ${isTargetDay}`,
      )

      return isTargetDay
    })

    console.log(`✅ Found ${targetEvents.length} events for target date:`)
    targetEvents.forEach((event) => {
      console.log(`- ${event.title} at ${format(parseISO(event.startDatetime), "h:mm a")}`)
    })

    if (targetEvents.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No events found for target date",
          targetDate: format(targetDate, "MMM dd, yyyy"),
          totalEvents: activities.length,
          shouldSend,
        },
        { status: 200 },
      )
    }

    if (!shouldSend) {
      return NextResponse.json(
        {
          success: true,
          message: "Events found (test mode - no emails sent)",
          eventsCount: targetEvents.length,
          targetDate: format(targetDate, "MMM dd, yyyy"),
          events: targetEvents.map((e) => ({
            title: e.title,
            time: format(parseISO(e.startDatetime), "h:mm a"),
            date: format(parseISO(e.startDatetime), "MMM dd, yyyy"),
          })),
        },
        { status: 200 },
      )
    }

    // If shouldSend is true, get subscribers and send emails
    let subscribers = []
    try {
      await connect()

      // Use aggregate instead of find to avoid type issues
      const subscriberResults = await newsLetter.aggregate([
        { $match: {} },
        { $project: { newsemail: 1, isActive: 1, _id: 1 } },
      ])

      console.log(`✅ Found ${subscriberResults.length} total subscribers`)

      // Filter active subscribers
      const activeSubscribers = subscriberResults.filter((sub) => sub.isActive !== false)
      console.log(`✅ Found ${activeSubscribers.length} active subscribers`)
      subscribers = activeSubscribers
    } catch (dbError) {
      console.log("❌ Database connection failed:", dbError.message)
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          dbError: dbError.message,
          events: targetEvents.length,
        },
        { status: 500 },
      )
    }

    if (subscribers.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No active subscribers found",
          events: targetEvents.length,
          totalSubscribers: 0,
        },
        { status: 200 },
      )
    }

    // Check email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        {
          success: false,
          error: "Email credentials not configured",
          events: targetEvents.length,
          subscribers: subscribers.length,
        },
        { status: 500 },
      )
    }

    // Create and test email transporter
    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    await transporter.verify()
    console.log("✅ Email transporter verified")

    // Send test emails
    let successCount = 0
    let failureCount = 0
    const results = []

    for (const subscriber of subscribers) {
      try {
        const emailResult = await transporter.sendMail({
          from: `"Shining Stars School" <${emailUser}>`,
          to: subscriber.newsemail,
          subject: `📅 TEST: Event Reminder for ${format(targetDate, "MMM dd, yyyy")}`,
          html: getTestEventReminderTemplate(targetEvents, targetDate),
        })

        console.log(`✅ Test reminder sent to: ${subscriber.newsemail}`)
        successCount++
        results.push({ email: subscriber.newsemail, sent: true, messageId: emailResult.messageId })

        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Failed to send test reminder to ${subscriber.newsemail}:`, error.message)
        failureCount++
        results.push({ email: subscriber.newsemail, sent: false, error: error.message })
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Test reminders sent successfully`,
        eventsCount: targetEvents.length,
        emailsSent: successCount,
        emailsFailed: failureCount,
        totalSubscribers: subscribers.length,
        targetDate: format(targetDate, "MMM dd, yyyy"),
        events: targetEvents.map((e) => ({
          title: e.title,
          time: format(parseISO(e.startDatetime), "h:mm a"),
          date: format(parseISO(e.startDatetime), "MMM dd, yyyy"),
        })),
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Error in test reminder system:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

function getTestEventReminderTemplate(events: any[], eventDate: Date) {
  const eventsHtml = events
    .map((event) => {
      const startTime = parseISO(event.startDatetime)
      const endTime = parseISO(event.endDatetime)

      return `
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #ef4444;">
        <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
          🧪 TEST: ${event.title}
        </h3>
        
        <div style="background-color: #fee2e2; color: #dc2626; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; display: inline-block; margin-bottom: 12px;">
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
    <title>TEST: Event Reminder - Shining Stars School</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
      
      <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px 20px; text-align: center;">
        <div style="width: 80px; height: 80px; background-color: white; border-radius: 50%; padding: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
          🧪
        </div>
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">TEST: Event Reminder</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Shining Stars Nursery and Primary School, Vvumba</p>
      </div>
      
      <div style="padding: 30px 25px; color: #333;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 25px; font-size: 18px; font-weight: 600;">
          🗓️ Test Date: ${format(eventDate, "EEEE, MMMM do, yyyy")}
        </div>
        
        <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 15px; margin-bottom: 25px;">
          <p style="margin: 0; color: #92400e; font-weight: 600; text-align: center;">
            🧪 This is a TEST email for the event reminder system
          </p>
        </div>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px; text-align: center;">
          This is a test of the event reminder system for the following events:
        </p>
        
        ${eventsHtml}
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
          <p style="margin: 0; color: #0369a1; font-size: 14px; font-weight: 500;">
            📍 Shining Stars Nursery and Primary School, Vvumba<br>
            📞 For more information, please contact the school office
          </p>
        </div>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
        <p>© 2024 Shining Stars Nursery and Primary School, Vvumba</p>
        <p>This is a TEST email for the event reminder system.</p>
      </div>
    </div>
  </body>
  </html>
  `
}
