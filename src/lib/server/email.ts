import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@mlclub.dev';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  } else {
    // Dev fallback: ethereal test account
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
    });
  }
  return transporter;
}

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  const t = getTransporter();
  const info = await t.sendMail({
    from: `ML Club <${FROM_EMAIL}>`,
    to,
    subject: 'Your ML Club verification code',
    text: `Your verification code is ${code}. It expires in 5 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="color:#0a0a0b;">ML Club</h2>
        <p style="color:#52525b;font-size:15px;">Your verification code is:</p>
        <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0ea5e9;padding:16px 0;">${code}</div>
        <p style="color:#71717a;font-size:13px;">This code expires in 5 minutes. If you did not request it, you can safely ignore this email.</p>
      </div>
    `,
  });
  // In dev (stream transport), log the message
  if (!SMTP_HOST) {
    console.log(`[OTP Email] To: ${to} | Code: ${code}`);
  }
}
