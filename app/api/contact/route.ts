import { connect } from "../../../dbConfig/dbConfig"
import Contact from "../../../models/contactModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, subject, message, recipientEmail } = reqBody

    const user = process.env.EMAIL_USER
    const targetEmail = recipientEmail || "lubanjwafrancispro@gmail.com"

    const newContact = new Contact({
      email,
      subject,
      message,
    })

    const contact = await newContact.save()

    // Send feedback email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      await transporter.sendMail({
        from: user,
        to: targetEmail,
        subject: `New contact message from ${email}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Sent from Shining Stars Contact Form</small></p>
        `,
      })

      await transporter.sendMail({
        from: user,
        to: email,
        replyTo: targetEmail,
        subject: `Message Received - Thank You`,
        html: `
          <h2>Thank You for Contacting Us!</h2>
          <p>Dear ${email},</p>
          <p>Thank you so much for contacting Shining Stars. We have received your message and appreciate you reaching out to us.</p>
          <p><strong>Your Message:</strong></p>
          <p><em>"${message}"</em></p>
          <p>We promise to get back to you as soon as possible, typically within 24-48 hours.</p>
          <br>
          <p>Best regards,</p>
          <p>The Shining Stars Team</p>
        `,
      })
    } catch (error) {
      console.log("Email sending failed:", error.message)
    }
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
