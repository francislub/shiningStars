import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  console.log("=== EMAIL API ROUTE STARTED ===")

  try {
    console.log("1. Using Prisma client...")

    const body = await request.json()
    console.log("2. Request body received:", body)

    const { email } = body

    if (!email) {
      console.log("3. Email validation failed: No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("3. Email validation failed: Invalid format")
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    console.log("3. Email validation passed")

    console.log("4. Checking for existing subscriber...")
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    })

    let isNewSubscriber = false

    if (!existingSubscriber) {
      console.log("5. New subscriber - adding to database...")
      await prisma.newsletter.create({
        data: { email },
      })
      isNewSubscriber = true
      console.log("6. New subscriber added successfully")
    } else {
      console.log("5. Existing subscriber found")
      isNewSubscriber = false
    }

    console.log("7. Preparing to send confirmation email...")

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const currentYear = new Date().getFullYear()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

    let emailSubject, emailHtml

    if (isNewSubscriber) {
      emailSubject = "🌟 Welcome to Shining Stars School Newsletter!"
      emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Shining Stars School Newsletter</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .welcome-message { background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .features { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
            .feature { flex: 1; min-width: 200px; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
            .feature-icon { font-size: 40px; margin-bottom: 10px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; transition: transform 0.3s ease; }
            .cta-button:hover { transform: translateY(-2px); }
            .footer { background-color: #2c3e50; color: white; padding: 30px; text-align: center; }
            .social-links { margin: 20px 0; }
            .social-links a { color: white; text-decoration: none; margin: 0 10px; font-size: 18px; }
            @media (max-width: 600px) { .features { flex-direction: column; } .feature { min-width: auto; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌟 Welcome to Shining Stars School!</h1>
              <p>Thank you for joining our newsletter community</p>
            </div>
            
            <div class="content">
              <div class="welcome-message">
                <h2 style="color: #667eea; margin-top: 0;">Welcome Aboard! 🎉</h2>
                <p>Dear Valued Community Member,</p>
                <p>We're thrilled to welcome you to the <strong>Shining Stars School</strong> newsletter family! You've just taken the first step towards staying connected with one of Uganda's premier educational institutions.</p>
              </div>

              <h3 style="color: #2c3e50;">What You Can Expect:</h3>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">📚</div>
                  <h4>Academic Excellence</h4>
                  <p>Updates on our academic programs, achievements, and educational innovations</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🎭</div>
                  <h4>School Events</h4>
                  <p>Exclusive invitations and highlights from our cultural, sports, and academic events</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🏆</div>
                  <h4>Student Success</h4>
                  <p>Celebrating our students' achievements and milestones</p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}" class="cta-button">Explore Our School</a>
              </div>

              <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #1e40af; margin-top: 0;">🎯 Why Choose Shining Stars School?</h4>
                <ul style="color: #374151; padding-left: 20px;">
                  <li><strong>Academic Excellence:</strong> Consistently high performance in national examinations</li>
                  <li><strong>Holistic Development:</strong> Focus on character building alongside academic achievement</li>
                  <li><strong>Modern Facilities:</strong> State-of-the-art classrooms, laboratories, and sports facilities</li>
                  <li><strong>Experienced Faculty:</strong> Dedicated teachers committed to student success</li>
                  <li><strong>Community Focus:</strong> Strong partnerships with parents and the local community</li>
                </ul>
              </div>

              <p style="font-style: italic; color: #666; text-align: center; margin: 30px 0;">
                "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
              </p>
            </div>

            <div class="footer">
              <h3 style="margin-top: 0;">Stay Connected</h3>
              <div class="social-links">
                <a href="mailto:info@shiningstarsschool.com">📧 Email</a>
                <a href="tel:+256123456789">📞 Call</a>
                <a href="${baseUrl}">🌐 Website</a>
              </div>
              <p style="margin: 20px 0 10px 0; font-size: 14px; opacity: 0.8;">
                Shining Stars School - Nurturing Tomorrow's Leaders
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.6;">
                © ${currentYear} Shining Stars School. All rights reserved.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; opacity: 0.5;">
                You're receiving this email because you subscribed to our newsletter at ${baseUrl}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    } else {
      emailSubject = "🌟 You're Already Part of Our Shining Stars Family!"
      emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Already Subscribed - Shining Stars School</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .message-box { background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; transition: transform 0.3s ease; }
            .cta-button:hover { transform: translateY(-2px); }
            .footer { background-color: #2c3e50; color: white; padding: 30px; text-align: center; }
            .social-links { margin: 20px 0; }
            .social-links a { color: white; text-decoration: none; margin: 0 10px; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌟 You're Already With Us!</h1>
              <p>Thank you for your continued interest in Shining Stars School</p>
            </div>
            
            <div class="content">
              <div class="message-box">
                <h2 style="color: #059669; margin-top: 0;">Great News! ✅</h2>
                <p>Dear Valued Community Member,</p>
                <p>We're delighted to let you know that <strong>${email}</strong> is already subscribed to our newsletter! You're already part of our amazing <strong>Shining Stars School</strong> community.</p>
              </div>

              <h3 style="color: #2c3e50;">What This Means:</h3>
              <ul style="color: #374151; padding-left: 20px;">
                <li>✨ You'll continue receiving our latest school updates</li>
                <li>🎉 You won't miss any important events or announcements</li>
                <li>📚 You'll get exclusive insights into our academic programs</li>
                <li>🏆 You'll be the first to hear about student achievements</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}" class="cta-button">Visit Our School Website</a>
              </div>

              <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <h4 style="color: #92400e; margin-top: 0;">💡 Did You Know?</h4>
                <p style="color: #78350f; margin-bottom: 0;">
                  Shining Stars School has been nurturing young minds for over a decade, with our graduates excelling in top universities across Uganda and beyond. We're proud to be part of your educational journey!
                </p>
              </div>

              <p style="font-style: italic; color: #666; text-align: center; margin: 30px 0;">
                "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
              </p>
            </div>

            <div class="footer">
              <h3 style="margin-top: 0;">Stay Connected</h3>
              <div class="social-links">
                <a href="mailto:info@shiningstarsschool.com">📧 Email</a>
                <a href="tel:+256123456789">📞 Call</a>
                <a href="${baseUrl}">🌐 Website</a>
              </div>
              <p style="margin: 20px 0 10px 0; font-size: 14px; opacity: 0.8;">
                Shining Stars School - Nurturing Tomorrow's Leaders
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.6;">
                © ${currentYear} Shining Stars School. All rights reserved.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; opacity: 0.5;">
                You're receiving this email because you're subscribed to our newsletter at ${baseUrl}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    console.log("8. Sending confirmation email...")

    await transporter.sendMail({
      from: `"Shining Stars School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailHtml,
    })

    console.log("9. Email sent successfully")

    if (isNewSubscriber && process.env.ADMIN_EMAIL) {
      console.log("10. Sending admin notification...")

      await transporter.sendMail({
        from: `"Shining Stars School Newsletter" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "🌟 New Newsletter Subscription",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #667eea;">New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> Website Newsletter Form</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This notification was sent automatically from the Shining Stars School website.
            </p>
          </div>
        `,
      })

      console.log("11. Admin notification sent")
    }

    console.log("=== EMAIL API ROUTE COMPLETED SUCCESSFULLY ===")

    return NextResponse.json({
      success: true,
      message: isNewSubscriber
        ? "Thank you for subscribing! Please check your email for confirmation."
        : "You're already subscribed to our newsletter. Thank you for your continued interest!",
      isNewSubscriber,
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    return NextResponse.json(
      {
        error: "Failed to process subscription. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
