import { connect } from "../../../dbConfig/dbConfig"
import newsLetter from "../../../models/emailsModel"
import { activities } from "../../../lib/constants"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { parseISO, format, addDays, isSameDay, startOfDay } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    console.log("=== TEST REMINDER SYSTEM ===")

    const url = new URL(request.url)
    const testDate = url.searchParams.get("date") // Format: YYYY-MM-DD
    const sendEmail = url.searchParams.get("send") === "true"

    let targetDate
    if (testDate) {
      targetDate = new Date(testDate)
      console.log(`Testing for specific date: ${format(targetDate, "MMM dd, yyyy")}`)
    } else {
      targetDate = addDays(new Date(), 1) // Tomorrow
      console.log(`Testing for tomorrow: ${format(targetDate, "MMM dd, yyyy")}`)
    }

    // Debug: Show all events
    console.log("📅 All events in system:")
    activities.forEach((activity, index) => {
      const eventDate = parseISO(activity.startDatetime)
      console.log(`${index + 1}. ${activity.title} - ${format(eventDate, "MMM dd, yyyy")}`)
    })

    // Find events for target date
    const targetEvents = activities.filter((activity) => {
      const eventDate = parseISO(activity.startDatetime)
      const eventStart = startOfDay(eventDate)
      const targetStart = startOfDay(targetDate)
      return isSameDay(eventStart, targetStart)
    })

    console.log(`Found ${targetEvents.length} events for ${format(targetDate, "MMM dd, yyyy")}:`)
    targetEvents.forEach((event) => {
      console.log(`- ${event.title}`)
    })

    if (!sendEmail) {
      return NextResponse.json({
        success: true,
        message: "Test completed (no emails sent)",
        targetDate: format(targetDate, "MMM dd, yyyy"),
        eventsFound: targetEvents.length,
        events: targetEvents.map((e) => ({
          title: e.title,
          date: format(parseISO(e.startDatetime), "MMM dd, yyyy"),
          time: format(parseISO(e.startDatetime), "h:mm a"),
        })),
        note: "Add ?send=true to actually send test emails",
      })
    }

    // If sending emails, get subscribers
    await connect()
    const subscribers = await newsLetter.find({})
    const activeSubscribers = subscribers.filter((sub) => sub.isActive !== false)

    console.log(`Found ${activeSubscribers.length} active subscribers`)

    if (activeSubscribers.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No active subscribers found",
        eventsFound: targetEvents.length,
      })
    }

    if (targetEvents.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No events found for target date",
        targetDate: format(targetDate, "MMM dd, yyyy"),
        subscribersFound: activeSubscribers.length,
      })
    }

    // Send test emails
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      return NextResponse.json({
        success: false,
        error: "Email credentials not configured",
      })
    }

    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Send to first 3 subscribers only (for testing)
    const testSubscribers = activeSubscribers.slice(0, 3)
    const results = []

    for (const subscriber of testSubscribers) {
      try {
        await transporter.sendMail({
          from: `"Shining Stars School (TEST)" <${emailUser}>`,
          to: subscriber.newsemail,
          subject: `🧪 TEST: Event Reminder for ${format(targetDate, "MMM dd, yyyy")}`,
          html: getTestEmailTemplate(targetEvents, targetDate),
        })

        console.log(`✅ Test email sent to: ${subscriber.newsemail}`)
        results.push({ email: subscriber.newsemail, sent: true })
      } catch (error) {
        console.error(`❌ Failed to send to ${subscriber.newsemail}:`, error.message)
        results.push({ email: subscriber.newsemail, sent: false, error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Test emails sent",
      targetDate: format(targetDate, "MMM dd, yyyy"),
      eventsFound: targetEvents.length,
      emailsSent: results.filter((r) => r.sent).length,
      totalSubscribers: activeSubscribers.length,
      testSubscribers: testSubscribers.length,
      events: targetEvents.map((e) => ({
        title: e.title,
        date: format(parseISO(e.startDatetime), "MMM dd, yyyy"),
        time: format(parseISO(e.startDatetime), "h:mm a"),
      })),
      results,
    })
  } catch (error) {
    console.error("❌ Test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

function getTestEmailTemplate(events: any[], eventDate: Date) {
  const eventsHtml = events
    .map((event) => {
      const startTime = parseISO(event.startDatetime)
      const endTime = parseISO(event.endDatetime)

      return `
      <div style="background-color: #fff3cd; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
        <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
          🧪 TEST: ${event.title}
        </h3>
        
        <div style="background-color: #ffeaa7; color: #856404; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; display: inline-block; margin-bottom: 12px;">
          ⏰ ${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}
        </div>
        
        <p style="color: #856404; line-height: 1.6; margin: 0; font-size: 15px;">
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
      
      <div style="background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%); padding: 30px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🧪 TEST EMAIL</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Event Reminder System Test</p>
      </div>
      
      <div style="padding: 30px 25px; color: #333;">
        <div style="background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%); color: white; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 25px; font-size: 18px; font-weight: 600;">
          🗓️ Test Date: ${format(eventDate, "EEEE, MMMM do, yyyy")}
        </div>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px; text-align: center;">
          This is a test of the event reminder system. The following events were found:
        </p>
        
        ${eventsHtml}
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #fff3cd; border-radius: 10px; border: 1px solid #ffc107;">
          <p style="margin: 0; color: #856404; font-size: 14px; font-weight: 500;">
            🧪 This is a test email from the automated reminder system<br>
            📍 Shining Stars Nursery and Primary School, Vvumba
          </p>
        </div>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
        <p>© 2024 Shining Stars Nursery and Primary School, Vvumba</p>
        <p>This is a test email from the automated reminder system.</p>
      </div>
    </div>
  </body>
  </html>
  `
}
