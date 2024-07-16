import { connect } from "../../../dbConfig/dbConfig";
import ChildAdmission from "../../../models/childModel";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
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
    } = reqBody;

    const user = process.env.EMAIL_USER;

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
    });

    const childAdmission = await newChildAdmission.save();
    console.log(childAdmission);

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
        subject: `New Admission for child, ${name}`,
        html: `
                    <p>Name: ${name}</p>
                    <p>Number: ${admission_no}</p>
                    <p>Service: ${date_of_birth}</p>
                    <p>Email: ${age}</p>
                    <p>Message: ${gender}</p>
                    <p>Name: ${grade}</p>
                    <p>Number: ${residence}</p>
                    <p>Service: ${term}</p>
                    <p>Email: ${emis_no}</p>
                    <p>Message: ${parent_name}</p>
                    <p>Name: ${parent_telephone}</p>
                    <p>Number: ${parent_relationship_with_pupil}</p>
                    <p>Service: ${parent_address}</p>
                    <p>Email: ${parent_village}</p>
                    <p>Message: ${parent_lc}</p>
                    <p>Name: ${parent_nin}</p>
                    <p>Number: ${next_of_kin_name}</p>
                    <p>Service: ${next_of_kin_gender}</p>
                    <p>Email: ${next_of_kin_telephone}</p>
                    <p>Message: ${next_of_kin_relationship_with_pupil}</p>
                    <p>Name: ${next_of_kin_address}</p>
                    <p>Number: ${next_of_kin_village}</p>
                    <p>Service: ${next_of_kin_lc}</p>
                    <p>Email: ${child_medical_info}</p>
                `,
      });

      await transporter.sendMail({
        from: user,
        to: parent_email,
        replyTo: parent_email,
        subject: `Admission Received`,
        html: `
                <p>Thank you so much, ${parent_name} for admitting your child into our school. 
                We promise to provide the best and quality education that your child deserves.</p>
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
