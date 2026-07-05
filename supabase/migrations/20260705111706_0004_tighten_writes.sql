/*
# Tighten Write Policies — Remove WITH CHECK(true) from INSERT policies

## Context
   All write operations (order creation, customer upsert, order items, payments,
   OTP) now go through the service role client (src/lib/server/supabase-admin.ts),
   which bypasses RLS. The anon INSERT policies with WITH CHECK(true) are no longer
   needed and represent a security risk (allowing unrestricted inserts from the
   client side).

## Changes
   - Drop all INSERT policies with WITH CHECK(true) on:
     - customers
     - orders
     - order_items
     - payments
   - Keep SELECT policies (ownership-based, already secure)
   - Products and categories remain public read-only (no change)

## Security Result
   - Anon/authenticated clients can now ONLY read:
     - products (public catalog)
     - categories (public catalog)
     - their own orders (by email match)
     - their own order items (via parent order ownership)
     - their own payments (via parent order ownership)
     - their own customer record (by email match)
   - Anon/authenticated clients CANNOT:
     - INSERT any records (all writes go through server-side service role)
     - UPDATE any records (except own customer record for authenticated users)
     - DELETE any records
     - READ OTP records (no SELECT policy)
*/

-- Customers: drop permissive INSERT
DROP POLICY IF EXISTS "anon_insert_customer" ON public.customers;

-- Orders: drop permissive INSERT
DROP POLICY IF EXISTS "anon_insert_order" ON public.orders;

-- Order items: drop permissive INSERT
DROP POLICY IF EXISTS "anon_insert_order_item" ON public.order_items;

-- Payments: drop permissive INSERT
DROP POLICY IF EXISTS "anon_insert_payment" ON public.payments;
