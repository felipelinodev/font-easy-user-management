import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendPasswordResetEmail(to: string, token: string) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetLink = `${frontendUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"FontEasy" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Redefinição de senha - FontEasy',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #ececec;">
        <div style="background: linear-gradient(135deg, #f07f1c 0%, #e9531e 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 700;">FontEasy</h1>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #1e1e1c; margin: 0 0 16px; font-size: 20px;">Redefinição de senha</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            Recebemos uma solicitação para redefinir a senha da sua conta. 
            Clique no botão abaixo para criar uma nova senha. Este link é válido por <strong>1 hora</strong>.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; background: linear-gradient(135deg, #f07f1c 0%, #e9531e 100%); color: #fff; text-decoration: none; padding: 14px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">
              Redefinir minha senha
            </a>
          </div>
          <p style="color: #999; font-size: 13px; line-height: 1.5; margin: 24px 0 0; border-top: 1px solid #ececec; padding-top: 16px;">
            Se você não solicitou a redefinição de senha, ignore este e-mail. Sua senha permanecerá a mesma.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export { sendPasswordResetEmail };
