import type { RequestHandler } from './$types';
import { getServiceClient } from '$lib/server/supabase-admin';
import { ok, fail, handleApiError, validateEmail } from '$lib/server/api';
import { sendOtpEmail } from '$lib/server/email';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body?.email as string || '').trim().toLowerCase();

    if (!email || !validateEmail(email)) {
      return fail('VALIDATION_ERROR', 'A valid email is required.', 400);
    }

    const supabase = getServiceClient();

    // Rate limit: max 3 unexpired OTPs per email in 5 min window
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('otp_verification')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gt('created_at', fiveMinAgo);

    if (count && count >= 3) {
      return fail('RATE_LIMITED', 'Too many OTP requests. Please wait a few minutes.', 429);
    }

    // Invalidate previous unexpired codes for this email
    await supabase
      .from('otp_verification')
      .update({ expires_at: new Date().toISOString() })
      .eq('email', email)
      .gt('expires_at', new Date().toISOString());

    // Generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Hash the code (SHA-256 with salt)
    const codeHash = await hashCode(code);

    const { error } = await supabase.from('otp_verification').insert({
      email,
      code_hash: codeHash,
      expires_at: expiresAt,
      attempts: 0,
      locked: false,
      verified: false,
    });

    if (error) return fail('DB_ERROR', error.message, 500);

    // Send OTP email via Nodemailer
    await sendOtpEmail(email, code);

    return ok({ sent: true, expiresAt }, 200);
  } catch (err) {
    return handleApiError(err);
  }
};

async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + '|mlc_otp_salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
