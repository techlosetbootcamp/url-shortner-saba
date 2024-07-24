import nodemailer from 'nodemailer';

export async function sendResetPasswordEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "sababakhtiar398@gmail.com",
      pass: "suyd jjgg dcvp gtmp",
    },
  });

  const mailOptions = {
    from: "sababakhtiar398@gmail.com",
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXTAUTH_URL}/changePassword?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}