import { NextResponse } from "next/server"
import { addNewsletterSubscriber } from "@/lib/api"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const { newsemail } = await request.json()

    if (!newsemail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newsemail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if already subscribed
    let isExistingSubscriber = false
    try {
      await addNewsletterSubscriber(newsemail)
    } catch (error: any) {
      if (error.code === "P2002") {
        isExistingSubscriber = true
      } else {
        throw error
      }
    }

    // Send welcome email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${isExistingSubscriber ? "Thank You for Your Continued Support" : "Welcome to Shining Stars School"}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🌟 Shining Stars School</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">
              ${isExistingSubscriber ? "Thank You for Your Continued Support!" : "Welcome to Our Newsletter!"}
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #4f46e5; margin-top: 0;">
              ${isExistingSubscriber ? "You're Already Part of Our Family!" : "Welcome to the Shining Stars Family!"}
            </h2>
            
            <p style="margin-bottom: 20px;">
              ${
                isExistingSubscriber
                  ? "We noticed you tried to subscribe again. You're already receiving our updates!"
                  : "Thank you for subscribing to our newsletter! You'll now receive updates about:"
              }
            </p>
            
            ${
              !isExistingSubscriber
                ? `
              <ul style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <li>🎉 School events and celebrations</li>
                <li>📚 Academic achievements and updates</li>
                <li>🏆 Student accomplishments</li>
                <li>📅 Important dates and announcements</li>
                <li>🎨 Extracurricular activities</li>
              </ul>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
                 style="background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #666; font-size: 14px;">
                Shining Stars Nursery and Primary School, Vvumba<br>
                © ${new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: `"Shining Stars School" <${process.env.EMAIL_USER}>`,
      to: newsemail,
      subject: isExistingSubscriber
        ? "Thank You for Your Continued Support! 🌟"
        : "Welcome to Shining Stars School Newsletter! 🌟",
      html: emailHtml,
    })

    return NextResponse.json({
      success: true,
      message: isExistingSubscriber
        ? "You're already subscribed! We've sent you a confirmation email."
        : "Successfully subscribed! Check your email for confirmation.",
      isExistingSubscriber,
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to process subscription. Please try again." }, { status: 500 })
  }
}
