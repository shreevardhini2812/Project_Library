// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  // If env settings not provided, we just log (safe fallback)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_HOST) {
    console.log("Mock sendEmail =>", { to, subject, text });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });
};
