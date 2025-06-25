import { connect } from "../../../dbConfig/dbConfig"
import Contact from "../../../models/contactModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    console.log("=== CONTACT API STARTED ===")

    // Parse request body first
    const reqBody = await request.json()
    const { email, subject, message, recipientEmail } = reqBody

    console.log("Contact form data received:", { email, subject: subject || "No subject" })

    // Try to connect to database
    let dbConnected = false
    let contact = null

    try {
      await connect()
      dbConnected = true
      console.log("✅ Database connected successfully")

      const newContact = new Contact({
        email,
        subject: subject || "Contact Form Submission",
        message,
      })

      contact = await newContact.save()
      console.log("✅ Contact saved to database")
    } catch (dbError) {
      console.log("❌ Database operation failed:", dbError.message)
      console.log("⚠️ Continuing without database save...")
    }

    // Send emails regardless of database status
    const user = process.env.EMAIL_USER
    const targetEmail = recipientEmail || "larkstechhub@gmail.com"

    if (!user || !process.env.EMAIL_PASS) {
      console.log("❌ Email credentials not found")
      return NextResponse.json(
        {
          success: false,
          error: "Email service not configured",
          dbSaved: dbConnected,
        },
        { status: 500 },
      )
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: process.env.EMAIL_PASS,
        },
      })

      console.log("📧 Sending emails...")

      // Send to admin
      await transporter.sendMail({
        from: `"Shining Stars Vvumba Contact" <${user}>`,
        to: targetEmail,
        subject: `New contact message from ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || "No subject provided"}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                ${message}
              </div>
            </div>
            <hr>
            <p style="color: #6b7280; font-size: 12px;">Sent from Shining Stars Vvumba Contact Form</p>
          </div>
        `,
      })

      // Send confirmation to user
      await transporter.sendMail({
        from: `"Shining Stars Vvumba" <${user}>`,
        to: email,
        replyTo: targetEmail,
        subject: `Message Received - Thank You`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
              <p style="margin: 10px 0 0; opacity: 0.9;">Shining Stars Vvumba Nursery and Primary School</p>
            </div>
            
            <div style="padding: 30px 25px;">
              <h2 style="color: #1f2937;">We've Received Your Message</h2>
              <p style="color: #374151; line-height: 1.6;">
                Dear ${email},
              </p>
              <p style="color: #374151; line-height: 1.6;">
                Thank you for contacting Shining Stars Vvumba. We have received your message and appreciate you reaching out to us.
              </p>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #1e40af; font-weight: 500;">Your Message:</p>
                <p style="margin: 10px 0 0; color: #374151; font-style: italic;">"${message}"</p>
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                We promise to get back to you as soon as possible, typically within 24-48 hours.
              </p>
              
              <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  📍 Shining Stars Nursery and Primary School, Vvumba<br>
                  📞 Contact us for more information @ https://www.shiningstarsvvumba.com
                
                </p>
              </div>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">© 2024 Shining Stars Vvumba. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      console.log("✅ Emails sent successfully")

      return NextResponse.json(
        {
          success: true,
          message: "Contact form submitted successfully",
          dbSaved: dbConnected,
          emailsSent: true,
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.log("❌ Email sending failed:", emailError.message)

      return NextResponse.json(
        {
          success: dbConnected, // Success if at least DB worked
          message: dbConnected ? "Contact saved but email failed" : "Both database and email failed",
          dbSaved: dbConnected,
          emailsSent: false,
          error: emailError.message,
        },
        { status: dbConnected ? 200 : 500 },
      )
    }
  } catch (error) {
    console.log("❌ Critical error in contact API:", error.message)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process contact form",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
