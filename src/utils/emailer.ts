import nodemailer from "nodemailer"
export async function sendResetPasswordEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXTAUTH_URL}/changePassword?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}
