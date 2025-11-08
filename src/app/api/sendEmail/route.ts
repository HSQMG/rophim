import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("📧 EMAIL_USER =", process.env.EMAIL_USER);
    const mailOptions = {
      from: `"Website Liên hệ" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `📩 ${subject} - từ ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height:1.5;">
          <h2>Thông tin liên hệ từ website</h2>
          <p><b>Họ tên:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Điện thoại:</b> ${phone}</p>
          <p><b>Chủ đề:</b> ${subject}</p>
          <p><b>Nội dung:</b><br/>${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
