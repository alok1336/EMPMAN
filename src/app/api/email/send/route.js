import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Company HR" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <p>${message}</p>
        <br/>
        <p>Regards,<br/><b>HR Team</b></p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully ✅" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
