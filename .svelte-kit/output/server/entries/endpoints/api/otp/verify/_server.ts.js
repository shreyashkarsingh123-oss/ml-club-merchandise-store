import { g as getServiceClient } from "../../../../../chunks/supabase-admin.js";
import { a as validateEmail, f as fail, o as ok, h as handleApiError } from "../../../../../chunks/api.js";
const MAX_ATTEMPTS = 5;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body?.email || "").trim().toLowerCase();
    const code = (body?.code || "").trim();
    if (!email || !validateEmail(email)) {
      return fail("VALIDATION_ERROR", "A valid email is required.", 400);
    }
    if (!/^\d{6}$/.test(code)) {
      return fail("VALIDATION_ERROR", "A 6-digit code is required.", 400);
    }
    const supabase = getServiceClient();
    const { data: otp, error: fetchErr } = await supabase.from("otp_verification").select("id, code_hash, expires_at, attempts, locked, verified").eq("email", email).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (fetchErr) return fail("DB_ERROR", fetchErr.message, 500);
    if (!otp) return fail("NOT_FOUND", "No OTP was sent to this email.", 404);
    if (otp.locked) return fail("LOCKED", "Too many attempts. Request a new code.", 423);
    if (otp.verified) return fail("ALREADY_VERIFIED", "This code was already used.", 409);
    const now = Date.now();
    const expired = new Date(otp.expires_at).getTime() <= now;
    if (expired) return fail("EXPIRED", "The code has expired. Request a new one.", 410);
    const codeHash = await hashCode(code);
    if (codeHash !== otp.code_hash) {
      const attempts = otp.attempts + 1;
      const locked = attempts >= MAX_ATTEMPTS;
      await supabase.from("otp_verification").update({ attempts, locked }).eq("id", otp.id);
      return fail(
        locked ? "LOCKED" : "INVALID_CODE",
        locked ? "Too many wrong attempts. Request a new code." : `Incorrect code. ${MAX_ATTEMPTS - attempts} attempts left.`,
        locked ? 423 : 400
      );
    }
    await supabase.from("otp_verification").update({ verified: true, locked: false }).eq("id", otp.id);
    return ok({ verified: true });
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
