import { g as getServiceClient } from "../../../../../chunks/supabase-admin.js";
import { a as validateEmail, f as fail, o as ok, h as handleApiError } from "../../../../../chunks/api.js";
import nodemailer from "nodemailer";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@mlclub.dev";
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
  } else {
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: "unix"
    });
  }
  return transporter;
}
async function sendOtpEmail(to, code) {
  const t = getTransporter();
  await t.sendMail({
    from: `ML Club <${FROM_EMAIL}>`,
    to,
    subject: "Your ML Club verification code",
    text: `Your verification code is ${code}. It expires in 5 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="color:#0a0a0b;">ML Club</h2>
        <p style="color:#52525b;font-size:15px;">Your verification code is:</p>
        <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0ea5e9;padding:16px 0;">${code}</div>
        <p style="color:#71717a;font-size:13px;">This code expires in 5 minutes. If you did not request it, you can safely ignore this email.</p>
      </div>
    `
  });
  if (!SMTP_HOST) {
    console.log(`[OTP Email] To: ${to} | Code: ${code}`);
  }
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body?.email || "").trim().toLowerCase();
    if (!email || !validateEmail(email)) {
      return fail("VALIDATION_ERROR", "A valid email is required.", 400);
    }
    const supabase = getServiceClient();
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1e3).toISOString();
    const { count } = await supabase.from("otp_verification").select("id", { count: "exact", head: true }).eq("email", email).gt("created_at", fiveMinAgo);
    if (count && count >= 3) {
      return fail("RATE_LIMITED", "Too many OTP requests. Please wait a few minutes.", 429);
    }
    await supabase.from("otp_verification").update({ expires_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("email", email).gt("expires_at", (/* @__PURE__ */ new Date()).toISOString());
    const code = String(Math.floor(1e5 + Math.random() * 9e5));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1e3).toISOString();
    const codeHash = await hashCode(code);
    const { error } = await supabase.from("otp_verification").insert({
      email,
      code_hash: codeHash,
      expires_at: expiresAt,
      attempts: 0,
      locked: false,
      verified: false
    });
    if (error) return fail("DB_ERROR", error.message, 500);
    await sendOtpEmail(email, code);
    return ok({ sent: true, expiresAt }, 200);
  } catch (err) {
    return handleApiError(err);
  }
};
async function hashCode(code) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + "|mlc_otp_salt");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
export {
  POST
};
