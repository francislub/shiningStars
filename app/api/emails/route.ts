import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { addNewsletterSubscriber } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { getAlreadySubscribedEmailTemplate, getWelcomeEmailTemplate } from "@/lib/emailTemplates"

const currentYear = new Date().getFullYear()

export async function POST(request: Request) {
  console.log("[v0] === EMAIL API ROUTE STARTED ===")

  try {
    console.log("[v0] 1. Using Prisma client...")

    const body = await request.json()
    console.log("[v0] 2. Request body received:", body)

    const email = body.email || body.newsemail
    console.log("[v0] 3. Extracted email:", email)

    // Validate email
    if (!email) {
      console.log("[v0] 4. Email validation failed: No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    console.log("[v0] 5. Email validation passed")

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] 6. Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("[v0] 7. Getting environment variables...")
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    console.log("[v0] EMAIL_USER:", user ? "✅ Set" : "❌ Not set")
    console.log("[v0] EMAIL_PASS:", pass ? "✅ Set" : "❌ Not set")

    if (!user || !pass) {
      console.log("[v0] 8. Email credentials not configured")
      return NextResponse.json({ error: "Email configuration missing" }, { status: 500 })
    }

    console.log("[v0] 9. Checking if email already exists...")
    let isExistingSubscriber = false

    try {
      const existingSubscriber = await prisma.newsletter.findUnique({
        where: { email },
      })

      if (existingSubscriber) {
        console.log("[v0] 10. Email already subscribed")
        isExistingSubscriber = true
      } else {
        console.log("[v0] 10. Creating new subscriber")
        await addNewsletterSubscriber(email)
      }
    } catch (error: any) {
      console.log("[v0] Database error:", error)
      throw error
    }

    console.log("[v0] 11. Sending emails in background...")
    // Send emails asynchronously to avoid blocking the response
    setImmediate(async () => {
      try {
        console.log("[v0] Sending admin notification email...")
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: user,
            pass: pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 5000,
          socketTimeout: 10000,
        })

        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: "lubanjwafrancispro@gmail.com",
          subject: isExistingSubscriber
            ? `Returning Subscriber - Shining Stars School`
            : `New Newsletter Subscription - Shining Stars School`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
              <h2 style="color: #4f46e5;">${isExistingSubscriber ? "Returning Subscriber" : "New Newsletter Subscription"}</h2>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Status:</strong> ${isExistingSubscriber ? "Already subscribed" : "New subscriber"}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>School:</strong> Shining Stars Nursery and Primary School, Vvumba</p>
              </div>
            </div>
          `,
        })
        console.log("[v0] ✅ Admin notification sent")

        console.log("[v0] Sending welcome email to subscriber...")
        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: email,
          subject: isExistingSubscriber
            ? `Thank You for Your Continued Support! 🌟 - Shining Stars School`
            : `Welcome to Shining Stars School Newsletter! 🌟`,
          html: isExistingSubscriber ? getAlreadySubscribedEmailTemplate(email) : getWelcomeEmailTemplate(email),
        })
        console.log("[v0] ✅ Welcome/reminder email sent")
      } catch (emailError: any) {
        console.log("[v0] ❌ Email sending error:", emailError.message)
      }
    })

    console.log("[v0] 12. API route completed successfully")
    return NextResponse.json({
      success: true,
      message: isExistingSubscriber
        ? "You're already subscribed! We've sent you a confirmation email."
        : "Successfully subscribed! Check your email for confirmation.",
      isExistingSubscriber,
    })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to process subscription. Please try again." }, { status: 500 })
  }
}
