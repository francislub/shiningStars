import { connect } from "../../../dbConfig/dbConfig"
import ChildAdmission from "../../../models/childModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  console.log("=== ADMISSION API ROUTE STARTED ===")

  try {
    console.log("1. Connecting to database...")
    await connect()
    console.log("✅ Database connected successfully")

    console.log("2. Parsing request body...")
    const reqBody = await request.json()
    console.log("Request body received:", Object.keys(reqBody))

    const {
      name,
      admission_no,
      date_of_birth,
      age,
      gender,
      grade,
      residence,
      term,
      emis_no,
      parent_name,
      parent_email,
      parent_telephone,
      parent_relationship_with_pupil,
      parent_address,
      parent_village,
      parent_lc,
      parent_nin,
      next_of_kin_name,
      next_of_kin_gender,
      next_of_kin_telephone,
      next_of_kin_relationship_with_pupil,
      next_of_kin_address,
      next_of_kin_village,
      next_of_kin_lc,
      child_medical_info,
    } = reqBody

    console.log("3. Creating new admission record...")

    // Clean and validate the data before saving
    const cleanedData = {
      name,
      admission_no,
      date_of_birth,
      age,
      gender,
      grade,
      residence,
      term,
      emis_no: emis_no || "N/A", // Default to N/A if empty
      parent_name,
      parent_email,
      parent_telephone,
      parent_relationship_with_pupil,
      parent_address,
      parent_village,
      parent_lc: parent_lc || "", // Handle optional fields
      parent_nin,
      next_of_kin_name,
      next_of_kin_gender,
      next_of_kin_telephone,
      next_of_kin_relationship_with_pupil,
      next_of_kin_address,
      next_of_kin_village,
      next_of_kin_lc: next_of_kin_lc || "", // Handle optional fields
      child_medical_info: child_medical_info || "", // Handle optional fields
    }

    console.log("Data to be saved:", {
      name: cleanedData.name,
      admission_no: cleanedData.admission_no,
      emis_no: cleanedData.emis_no,
      parent_email: cleanedData.parent_email,
    })

    const newChildAdmission = new ChildAdmission(cleanedData)

    console.log("4. Saving to database...")
    const childAdmission = await newChildAdmission.save()
    console.log("✅ Admission saved successfully with ID:", childAdmission._id)

    // Check if email credentials are available
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    console.log("5. Checking email credentials...")
    console.log("EMAIL_USER:", user ? "✅ Available" : "❌ Missing")
    console.log("EMAIL_PASS:", pass ? "✅ Available" : "❌ Missing")

    const emailStatus = {
      adminEmailSent: false,
      parentEmailSent: false,
      emailError: null,
    }

    // Only attempt to send emails if credentials are available
    if (user && pass) {
      console.log("6. Email credentials found, attempting to send emails...")

      try {
        console.log("Creating email transporter...")
        // FIXED: Changed createTransporter to createTransport
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

        console.log("✅ Email transporter created successfully")

        console.log("7. Sending admin notification email...")
        try {
          await transporter.sendMail({
            from: `"Shining Stars Nursery And Primary School" <${user}>`,
            to: "lubanjwafrancispro@gmail.com",
            subject: `New Admission for child, ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                <h2 style="color: #4f46e5;">New Student Admission</h2>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <p><strong>Student Name:</strong> ${name}</p>
                  <p><strong>Admission Number:</strong> ${admission_no}</p>
                  <p><strong>Date Of Birth:</strong> ${date_of_birth}</p>
                  <p><strong>Age:</strong> ${age}</p>
                  <p><strong>Gender:</strong> ${gender}</p>
                  <p><strong>Class:</strong> ${grade}</p>
                  <p><strong>Residence:</strong> ${residence}</p>
                  <p><strong>Term:</strong> ${term}</p>
                  <p><strong>Emis No:</strong> ${emis_no}</p>
                  <p><strong>Parent/Guardian Name:</strong> ${parent_name}</p>
                  <p><strong>Parent/Guardian Email:</strong> ${parent_email}</p>
                  <p><strong>Parent/Guardian Telephone:</strong> ${parent_telephone}</p>
                  <p><strong>Parent/Guardian Relationship with pupil:</strong> ${parent_relationship_with_pupil}</p>
                  <p><strong>Parent/Guardian Address:</strong> ${parent_address}</p>
                  <p><strong>Parent/Guardian Village:</strong> ${parent_village}</p>
                  <p><strong>Parent/Guardian LC1:</strong> ${parent_lc}</p>
                  <p><strong>Parent/Guardian NIN No:</strong> ${parent_nin}</p>
                  <p><strong>Next Of Kin Name:</strong> ${next_of_kin_name}</p>
                  <p><strong>Next Of Kin Gender:</strong> ${next_of_kin_gender}</p>
                  <p><strong>Next Of Kin Telephone:</strong> ${next_of_kin_telephone}</p>
                  <p><strong>Next Of Kin Relationship with pupil:</strong> ${next_of_kin_relationship_with_pupil}</p>
                  <p><strong>Next Of Kin Address:</strong> ${next_of_kin_address}</p>
                  <p><strong>Next Of Kin Village:</strong> ${next_of_kin_village}</p>
                  <p><strong>Next Of Kin LC1:</strong> ${next_of_kin_lc}</p>
                  <p><strong>Child Medical Information:</strong> ${child_medical_info || "None provided"}</p>
                </div>
                <p style="color: #059669; font-weight: bold;">✅ Admission Status: Confirmed</p>
                <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
            `,
          })
          console.log("✅ Admin notification email sent successfully")
          emailStatus.adminEmailSent = true
        } catch (adminEmailError) {
          console.error("❌ Failed to send admin email:", adminEmailError.message)
          emailStatus.emailError = adminEmailError.message
        }

        console.log("8. Sending parent confirmation email...")
        try {
          const currentYear = new Date().getFullYear()
          await transporter.sendMail({
            from: `"Shining Stars Nursery And Primary School" <${user}>`,
            to: parent_email,
            replyTo: user,
            subject: `🌟 Welcome to Shining Stars Nursery And Primary School- Admission Confirmed!`,
            html: getWelcomeEmailTemplate(name, parent_name, admission_no, grade, term, currentYear, parent_email),
          })
          console.log("✅ Parent confirmation email sent successfully")
          emailStatus.parentEmailSent = true
        } catch (parentEmailError) {
          console.error("❌ Failed to send parent email:", parentEmailError.message)
          emailStatus.emailError = parentEmailError.message
        }
      } catch (transporterError) {
        console.error("❌ Failed to create email transporter:", transporterError.message)
        emailStatus.emailError = transporterError.message
      }
    } else {
      console.log("⚠️ Email credentials not available, skipping email sending")
      emailStatus.emailError = "Email credentials not configured"
    }

    console.log("9. API route completed successfully")
    console.log("Email Status:", emailStatus)

    // Return success regardless of email status
    return NextResponse.json(
      {
        success: true,
        message: "Admission submitted successfully",
        admissionId: childAdmission._id,
        admissionNumber: admission_no,
        emailStatus: emailStatus,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR in admission API route:")
    console.error("Error name:", error.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)

    // Return detailed error information
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process admission",
        details: {
          message: error.message,
          name: error.name,
          timestamp: new Date().toISOString(),
        },
        // Include stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: 500 },
    )
  }
}

function getWelcomeEmailTemplate(
  studentName: string,
  parentName: string,
  admissionNo: string,
  grade: string,
  term: string,
  currentYear: number,
  parentEmail: string,
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Shining Stars Vvumba Nursery And Primary School</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
        <div style="font-size: 32px; margin-bottom: 10px;">🌟</div>
        <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          Shining Stars Nursery And Primary School
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
          Where Excellence Meets Education
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2d3748; font-size: 24px; margin-bottom: 15px;">
            🎉 Admission Confirmed!
          </h2>
          <p style="color: #4a5568; font-size: 18px; margin: 0;">
            Welcome to the Shining Stars family!
          </p>
        </div>

        <!-- Personal Greeting -->
        <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; color: #2d3748; font-size: 16px;">
            Dear <strong>${parentName}</strong>,
          </p>
          <p style="margin: 15px 0 0 0; color: #4a5568; font-size: 16px;">
            Thank you for choosing Shining Stars Nursery And Primary School for <strong>${studentName}</strong>'s educational journey. 
            We are thrilled to welcome your child to our school community!
          </p>
        </div>

        <!-- Student Details Card -->
        <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #2d3748; font-size: 18px; margin: 0 0 20px 0; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            📋 Admission Details
          </h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #4a5568; font-weight: 600;">Student Name:</span>
              <span style="color: #2d3748; font-weight: bold;">${studentName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #4a5568; font-weight: 600;">Admission Number:</span>
              <span style="color: #667eea; font-weight: bold;">${admissionNo}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #4a5568; font-weight: 600;">Class/Grade:</span>
              <span style="color: #2d3748; font-weight: bold;">${grade}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #4a5568; font-weight: 600;">Term:</span>
              <span style="color: #2d3748; font-weight: bold;">${term}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
              <span style="color: #4a5568; font-weight: 600;">Academic Year:</span>
              <span style="color: #2d3748; font-weight: bold;">${currentYear}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; color: white;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px; text-align: center;">
            📚 Next Steps
          </h3>
          <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
            <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
              <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
              You will receive a welcome package within 3-5 business days
            </li>
            <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
              <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
              School orientation will be scheduled before the term begins
            </li>
            <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
              <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
              Our admissions team will contact you for any additional requirements
            </li>
            <li style="margin-bottom: 0; position: relative; padding-left: 25px;">
              <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
              Keep this email for your records
            </li>
          </ul>
        </div>

        <!-- School Promise -->
        <div style="text-align: center; background-color: #f7fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #2d3748; font-size: 18px; margin: 0 0 15px 0;">
            🎯 Our Promise to You
          </h3>
          <p style="color: #4a5568; font-size: 16px; margin: 0; font-style: italic;">
            "We promise to provide the best and quality education that ${studentName} deserves, 
            nurturing their potential and helping them shine bright in their academic journey."
          </p>
        </div>

        <!-- Contact Information -->
        <div style="background-color: #2d3748; color: white; border-radius: 12px; padding: 25px; text-align: center;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">
            📞 Need Help?
          </h3>
          <p style="margin: 0 0 10px 0; font-size: 14px;">
            Our admissions team is here to assist you
          </p>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            Email: info@shiningstarsvvumba.com | Phone: 0393102604
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #1a202c; color: white; padding: 30px; text-align: center;">
        <div style="margin-bottom: 15px;">
          <span style="font-size: 24px;">🌟</span>
        </div>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
          Shining Stars Nursery And Primary School
        </p>
        <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.8;">
          Empowering minds, Building futures
        </p>
        <div style="border-top: 1px solid #4a5568; padding-top: 15px; margin-top: 15px;">
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            © ${currentYear} Shining Stars Nursery And Primary School. All rights reserved.
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
            This email was sent to ${parentEmail}
          </p>
        </div>
      </div>

    </div>
  </body>
  </html>
  `
}
