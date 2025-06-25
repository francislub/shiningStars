import { connect } from "../../../dbConfig/dbConfig"
import newsLetter from "../../../models/emailsModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
const currentYear = new Date().getFullYear();

export async function POST(request: NextRequest) {
  console.log("=== EMAIL API ROUTE STARTED ===")

  try {
    console.log("1. Attempting to connect to database...")
    await connect()
    console.log("✅ Database connected successfully")

    console.log("2. Parsing request body...")
    const reqBody = await request.json()
    console.log("Request body:", reqBody)

    const { newsemail } = reqBody
    console.log("Extracted email:", newsemail)

    if (!newsemail) {
      console.log("❌ No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newsemail)) {
      console.log("❌ Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("3. Getting environment variables...")
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    console.log("EMAIL_USER:", user ? "✅ Set" : "❌ Not set")
    console.log("EMAIL_PASS:", pass ? "✅ Set" : "❌ Not set")

    if (!user || !pass) {
      console.log("❌ Email credentials not configured")
      return NextResponse.json({ error: "Email configuration missing" }, { status: 500 })
    }

    console.log("4. Checking if email already exists...")
    let isExistingSubscriber = false
    let newsLetterEmail: any = null

    try {
      // Fixed: Use countDocuments to check existence, then find if exists
      const emailCount = await newsLetter.countDocuments({ newsemail })
      if (emailCount > 0) {
        console.log("⚠️ Email already subscribed")
        isExistingSubscriber = true
        // Get the existing document using findOne with explicit typing
        const existingDoc = await (newsLetter as any).findOne({ newsemail })
        newsLetterEmail = existingDoc
      }
    } catch (findError: any) {
      console.log("❌ Error checking existing email:", findError.message)
      // Continue anyway, let the unique constraint handle duplicates
    }

    // Only save to database if not already subscribed
    if (!isExistingSubscriber) {
      console.log("5. Creating new newsletter entry...")
      const newNewsLetterEmail = new newsLetter({
        newsemail,
      })

      console.log("6. Saving to database...")
      try {
        newsLetterEmail = await newNewsLetterEmail.save()
        console.log("✅ Newsletter email saved:", newsLetterEmail._id)
      } catch (saveError: any) {
        console.log("❌ Database save error:", saveError.message)

        // If it's a duplicate key error, treat as success
        if (saveError.code === 11000 || saveError.message.includes("duplicate")) {
          console.log("⚠️ Duplicate email detected, treating as success")
          isExistingSubscriber = true
          // Try to fetch the existing record
          try {
            const existingDoc = await (newsLetter as any).findOne({ newsemail })
            newsLetterEmail = existingDoc
          } catch (e) {
            // Ignore error, we'll proceed anyway
          }
        } else {
          throw saveError
        }
      }
    }

    console.log("7. Creating email transporter...")
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

    console.log("8. Sending emails in background...")
    // Send emails asynchronously to avoid blocking the response
    setImmediate(async () => {
      try {
        console.log("Sending admin notification email...")
        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: "larkstechhub@gmail.com",
          subject: isExistingSubscriber
            ? `Returning Subscriber - Shining Stars School`
            : `New Newsletter Subscription - Shining Stars School`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
              <h2 style="color: #4f46e5;">${isExistingSubscriber ? "Returning Subscriber" : "New Newsletter Subscription"}</h2>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Email:</strong> ${newsemail}</p>
                <p><strong>Status:</strong> ${isExistingSubscriber ? "Already subscribed" : "New subscriber"}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>School:</strong> Shining Stars Nursery and Primary School, Vvumba</p>
              </div>
            </div>
          `,
        })
        console.log("✅ Admin notification sent")

        console.log("Sending welcome email to subscriber...")
        await transporter.sendMail({
          from: `"Shining Stars School" <${user}>`,
          to: newsemail,
          subject: isExistingSubscriber
            ? `Thank You for Your Continued Support! 🌟 - Shining Stars School`
            : `Welcome to Shining Stars School Newsletter! 🌟`,
          html: isExistingSubscriber
            ? getAlreadySubscribedEmailTemplate(newsemail)
            : getWelcomeEmailTemplate(newsemail),
        })
        console.log("✅ Welcome/reminder email sent")
      } catch (emailError: any) {
        console.log("❌ Email sending error:", emailError.message)
      }
    })

    console.log("9. API route completed successfully")
    return NextResponse.json(
      {
        success: true,
        message: isExistingSubscriber
          ? "You're already subscribed to our newsletter! We've sent you a confirmation email."
          : "Successfully subscribed to newsletter! Check your email for confirmation.",
        id: newsLetterEmail?._id,
        isExistingSubscriber: isExistingSubscriber,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.log("❌ ERROR in email API route:")
    console.log("Error name:", error.name)
    console.log("Error message:", error.message)
    console.log("Error stack:", error.stack)

    return NextResponse.json(
      {
        error: "Failed to process subscription. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

function getWelcomeEmailTemplate(email: string) {
  const firstName = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Shining Stars School</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
        <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px; color: #4f46e5;">🌟</span>
        </div>
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Our Newsletter!</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Shining Stars Nursery and Primary School</p>
        <p style="color: rgba(255, 255, 255, 0.8); margin: 5px 0 0; font-size: 14px;">Vvumba, Uganda</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #4f46e5; margin: 0 0 20px 0; font-size: 24px;">Hello ${firstName}! 👋</h2>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #374151;">
          Thank you for subscribing to the Shining Stars School newsletter! We're thrilled to have you join our school community.
        </p>
        
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #4f46e5;">
          <h3 style="color: #4f46e5; margin: 0 0 15px 0; font-size: 18px;">📬 What You'll Receive:</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li style="margin-bottom: 8px;">🎉 Upcoming school events and celebrations</li>
            <li style="margin-bottom: 8px;">📚 Academic achievements and curriculum updates</li>
            <li style="margin-bottom: 8px;">🏆 Student accomplishments and awards</li>
            <li style="margin-bottom: 8px;">📅 Important dates and school calendar</li>
            <li style="margin-bottom: 8px;">🎨 Extracurricular activities and programs</li>
            <li style="margin-bottom: 0;">📢 School announcements and news</li>
          </ul>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #fbbf24;">
          <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">🌟 About Shining Stars School</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #92400e;">
            Located in the heart of Vvumba, we are dedicated to providing quality education that nurtures young minds and helps every child reach their full potential. Our commitment to academic excellence and character development prepares students for a bright and successful future.
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #374151;">
          We promise to keep you informed with relevant and valuable updates about our school community. No spam, just meaningful content that matters to you and your family.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
            Welcome to the Shining Stars Family! ⭐
          </div>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Best regards,<br>
          <strong style="color: #4f46e5;">The Shining Stars School Team</strong><br>
          <span style="font-size: 14px; color: #6b7280;">Nurturing Excellence, Building Futures</span>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: 600;">
          Shining Stars Nursery and Primary School
        </p>
        <p style="margin: 0 0 15px 0; font-size: 13px; color: #9ca3af;">
          Vvumba, Uganda | Committed to Educational Excellence
        </p>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            You're receiving this email because you subscribed to our newsletter.<br>
            © ${currentYear} Shining Stars School. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `
}

function getAlreadySubscribedEmailTemplate(email: string) {
  const firstName = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Continued Support</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
        <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px; color: #4f46e5;">✨</span>
        </div>
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Thank You for Your Continued Support!</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Shining Stars Nursery and Primary School</p>
        <p style="color: rgba(255, 255, 255, 0.8); margin: 5px 0 0; font-size: 14px;">Vvumba, Uganda</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #4f46e5; margin: 0 0 20px 0; font-size: 24px;">Hello ${firstName}! 👋</h2>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #374151;">
          We noticed you tried to subscribe to our newsletter again. Thank you for your enthusiasm! We're happy to let you know that <strong>you're already a valued member of our newsletter community</strong>.
        </p>
        
        <div style="background-color: #ecfdf5; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #10b981;">
          <h3 style="color: #047857; margin: 0 0 15px 0; font-size: 18px;">📬 You're All Set!</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #047857;">
            You'll continue to receive all our updates about school events, news, and important announcements. There's no need to subscribe again.
          </p>
        </div>
        
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #4f46e5; margin: 0 0 15px 0; font-size: 18px;">📅 Upcoming at Shining Stars School:</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li style="margin-bottom: 8px;">School events and celebrations</li>
            <li style="margin-bottom: 8px;">Academic updates and achievements</li>
            <li style="margin-bottom: 8px;">Student accomplishments</li>
            <li style="margin-bottom: 0;">Important announcements</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #374151;">
          If you have any questions or need assistance, please don't hesitate to contact us. We're always here to help!
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
            Thank You for Being Part of Our Family! ⭐
          </div>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Warm regards,<br>
          <strong style="color: #4f46e5;">The Shining Stars School Team</strong><br>
          <span style="font-size: 14px; color: #6b7280;">Nurturing Excellence, Building Futures</span>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: 600;">
          Shining Stars Nursery and Primary School
        </p>
        <p style="margin: 0 0 15px 0; font-size: 13px; color: #9ca3af;">
          Vvumba, Uganda | Committed to Educational Excellence
        </p>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            You're receiving this email because you're subscribed to our newsletter.<br>
            © ${currentYear} Shining Stars School. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `
}
