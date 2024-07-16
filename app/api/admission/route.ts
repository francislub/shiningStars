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
