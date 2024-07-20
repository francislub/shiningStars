import { connect } from "../../../dbConfig/dbConfig";
import Contact from "../../../models/contactModel";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      email,
      subject,
      message,
    } = reqBody;

    const user = process.env.EMAIL_USER;

    const newContact = new Contact({
        email,
        subject,
        message,
    });

    const contact = await newContact.save();

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
        to: "mugabimoses07@gmail.com",
        subject: `New contact message from, ${email}`,
        html: `
                    <p>Email: ${email}</p>
                    <p>Subject: ${subject}</p>
                    <p>Message: ${message}</p>
                    
                `,
      });

      await transporter.sendMail({
        from: user,
        to: email,
        replyTo: email,
        subject: `Message Received`,
        html: `
                <p>Thank you so much for contacting us. 
                We promise to get back to you as soon as possible.</p>
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
