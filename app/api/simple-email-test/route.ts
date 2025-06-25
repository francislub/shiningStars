import { connect } from "../../../dbConfig/dbConfig"
import mongoose from "mongoose"
import nodemailer from "nodemailer"
import { type NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
  try {
    console.log("Starting simple email test...")

    // Test database connection
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database connection not established")
    }

    // Get one subscriber for testing
    const subscribersCollection = db.collection("newsletters")
    const subscriber = await subscribersCollection.findOne({ isActive: { $ne: false } })

    if (!subscriber) {
      return NextResponse.json({ error: "No active subscribers found" }, { status: 404 })
    }

    // Get latest event for testing
    const eventsCollection = db.collection("events")
    const latestEvent = await eventsCollection.findOne({}, { sort: { _id: -1 } })

    if (!latestEvent) {
      return NextResponse.json({ error: "No events found" }, { status: 404 })
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Simple email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🌟 Shining Stars School - Test Email</h2>
        <p>Hello!</p>
        <p>This is a test email from your school notification system.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669;">Latest Event: ${latestEvent.activity || "Event Title"}</h3>
          <p><strong>Date:</strong> ${latestEvent.date || "TBD"}</p>
          <p><strong>Location:</strong> ${latestEvent.place || "School Campus"}</p>
          <p><strong>Description:</strong> ${latestEvent.description || "Event details coming soon!"}</p>
        </div>
        
        <p>If you received this email, your notification system is working correctly! 🎉</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          Shining Stars School<br>
          Email: info@shiningstarsschool.com<br>
          Phone: +256 123 456 789
        </p>
      </div>
    `

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscriber.newsemail,
      subject: "🌟 Test Email - Shining Stars School Notifications",
      html: emailHtml,
    }

    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      details: {
        recipient: subscriber.newsemail,
        eventUsed: {
          id: latestEvent._id,
          activity: latestEvent.activity,
          date: latestEvent.date,
        },
        messageId: info.messageId,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("Simple email test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
