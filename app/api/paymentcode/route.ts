import { connect } from "../../../dbConfig/dbConfig";
import ChildAdmission from "../../../models/childModel";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      parent_name,
      parent_email,
      child_id,
    } = reqBody;

    // Provide code for querying a student from Student model whose parent_name === parent_name, parent_email === parent_email, stid === child_id and get the paymentCode, store it in a variable named paymentcode.

    const user = process.env.EMAIL_USER;

    // Send feedback email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: user,
        to: parent_email,
        replyTo: parent_email,
        subject: `Child Payment Code`,
        html: `
                <p>Hello ${parent_name}. You requested for your child's payment code. The payment code for your child with ID: ${child_id} is  . Thank you for trusting Shining Stars.</p>
                `,
      });
    } catch (error) {
      console.log(error.message);
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
