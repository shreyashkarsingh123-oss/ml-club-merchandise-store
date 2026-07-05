/*
# Tighten OTP RLS — Remove USING(true) from UPDATE policy

## Context
   The OTP send/verify server routes now use the service role client
   (src/lib/server/supabase-admin.ts), which bypasses RLS. This means
   the anon UPDATE policy on otp_verification is no longer needed.

## Changes
   - Drop the `anon_update_otp` policy that used USING(true) + WITH CHECK(true)
   - Keep only the INSERT policy (needed if any anon-side insert remains,
     though the service role handles this too — kept for safety)
   - Actually, since ALL OTP operations now go through the service role,
     we can remove the INSERT policy too. But keeping a restrictive INSERT
     is harmless and provides defense-in-depth if any code path changes.

## Security Result
   - OTP records are now completely invisible to anon and authenticated clients
   - No SELECT, no UPDATE, no DELETE for client-side roles
   - Only the service role (server-side) can read, insert, update, or delete OTP records
*/

-- Drop the permissive UPDATE policy
DROP POLICY IF EXISTS "anon_update_otp" ON public.otp_verification;

-- Drop the permissive INSERT policy (service role handles all inserts now)
DROP POLICY IF EXISTS "anon_insert_otp" ON public.otp_verification;

-- No policies remain for anon/authenticated on otp_verification
-- RLS is still enabled, so anon/authenticated get zero access
-- Only the service role (server-side, bypasses RLS) can operate on OTP data
