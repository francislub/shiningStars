import { connect } from "../../../dbConfig/dbConfig";
import newsLetter from "../../../models/emailsModel";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { newsemail } = reqBody;

    const user = process.env.EMAIL_USER;

    const newNewsLetterEmail = new newsLetter({
      newsemail,
    });

    const newsLetterEmail = await newNewsLetterEmail.save();

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
        subject: `New Email subscribed for NewsLetter.`,
        html: `
                    <p>Email: ${newsemail}</p>
                `,
      });

      await transporter.sendMail({
        from: user,
        to: newsemail,
        replyTo: newsemail,
        subject: `Email Received`,
        html: `
                <p>Thank you so much for subscribing to our newsletter. 
                We promise to give you the latest information on our news and updates.</p>
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
