import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { to, subject, text } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_GMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD",
    },
  });

  await transporter.sendMail({
    from: "YOUR_GMAIL@gmail.com",
    to,
    subject,
    text,
  });

  return NextResponse.json({ message: "Email sent" });
}
