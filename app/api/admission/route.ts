import { connect } from "../../../dbConfig/dbConfig"
import ChildAdmission from "../../../models/childModel"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
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

    const user = process.env.EMAIL_USER

    const newChildAdmission = new ChildAdmission({
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
      parent_nin,
      next_of_kin_name,
      next_of_kin_gender,
      next_of_kin_telephone,
      next_of_kin_relationship_with_pupil,
      next_of_kin_address,
      next_of_kin_village,
      next_of_kin_lc,
      child_medical_info,
    })

    const childAdmission = await newChildAdmission.save()

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
        to: "lubanjwafrancispro@gmail.com",
        subject: `New Admission for child, ${name}`,
        html: `
                    <p>Name: ${name}</p>
                    <p>Admission Number: ${admission_no}</p>
                    <p>Date Of Birth: ${date_of_birth}</p>
                    <p>Age: ${age}</p>
                    <p>Gender: ${gender}</p>
                    <p>Class: ${grade}</p>
                    <p>Residence: ${residence}</p>
                    <p>Term: ${term}</p>
                    <p>Emis No: ${emis_no}</p>
                    <p>Parent/Guardian Name: ${parent_name}</p>
                    <p>Parent/Guardian Email: ${parent_email}</p>
                    <p>Parent/Guardian Telephone: ${parent_telephone}</p>
                    <p>Parent/Guardian Relationship with pupil: ${parent_relationship_with_pupil}</p>
                    <p>Parent/Guardian Address: ${parent_address}</p>
                    <p>Parent/Guardian Village: ${parent_village}</p>
                    <p>Parent/Guardian LC1: ${parent_lc}</p>
                    <p>Parent/Guardian NIN No: ${parent_nin}</p>
                    <p>Next Of Kin Name: ${next_of_kin_name}</p>
                    <p>Next Of Kin Gender: ${next_of_kin_gender}</p>
                    <p>Next Of Kin Telephone: ${next_of_kin_telephone}</p>
                    <p>Next Of Kin Relationship with pupil: ${next_of_kin_relationship_with_pupil}</p>
                    <p>Next Of Kin Address: ${next_of_kin_address}</p>
                    <p>Next Of Kin Village: ${next_of_kin_village}</p>
                    <p>Next Of Kin LC1: ${next_of_kin_lc}</p>
                    <p>Child Medical Information (Issues): ${child_medical_info}</p>
                `,
      })

      const currentYear = new Date().getFullYear()

      await transporter.sendMail({
        from: user,
        to: parent_email,
        replyTo: user,
        subject: `🌟 Welcome to Shining Stars School - Admission Confirmed!`,
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Shining Stars Nursery And Primary School</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
          <div style="font-size: 32px; margin-bottom: 10px;">🌟</div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Shining Stars 
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
              Dear <strong>${parent_name}</strong>,
            </p>
            <p style="margin: 15px 0 0 0; color: #4a5568; font-size: 16px;">
              Thank you for choosing Shining Stars School for <strong>${name}</strong>'s educational journey. 
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
                <span style="color: #2d3748; font-weight: bold;">${name}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #4a5568; font-weight: 600;">Admission Number:</span>
                <span style="color: #667eea; font-weight: bold;">${admission_no}</span>
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
              "We promise to provide the best and quality education that ${name} deserves, 
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
              Email: Shiningstars.primary2022@gmail.com | Phone: 0393102603
            </p>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1a202c; color: white; padding: 30px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <span style="font-size: 24px;">🌟</span>
          </div>
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            Shining Stars 
          </p>
          <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.8;">
            Empowering minds, Building futures
          </p>
          <div style="border-top: 1px solid #4a5568; padding-top: 15px; margin-top: 15px;">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              © ${currentYear} Shining Stars School. All rights reserved.
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
              This email was sent to ${parent_email}
            </p>
          </div>
        </div>

      </div>
    </body>
    </html>
  `,
      })
    } catch (error) {
      console.log(error.message)
    }
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
