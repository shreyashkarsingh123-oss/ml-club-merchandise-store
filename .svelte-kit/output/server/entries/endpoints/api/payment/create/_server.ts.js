import { v as validateRequired, f as fail, o as ok, h as handleApiError } from "../../../../../chunks/api.js";
import Stripe from "stripe";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
function getStripe() {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
}
function isStripeConfigured() {
  return !!STRIPE_SECRET_KEY;
}
async function createPaymentIntent(amount, currency = "usd", metadata = {}) {
  const stripe = getStripe();
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
    metadata
  });
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const missing = validateRequired(body, ["amount"]);
    if (missing) return fail("VALIDATION_ERROR", missing, 400);
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return fail("VALIDATION_ERROR", "Amount must be a positive number.", 400);
    }
    if (!isStripeConfigured()) {
      return ok({
        clientSecret: "pi_test_mock_secret",
        paymentIntentId: "pi_test_" + Math.random().toString(36).slice(2, 12),
        amount,
        currency: "usd",
        status: "requires_confirmation",
        mock: true
      });
    }
    const intent = await createPaymentIntent(amount, "usd", body.metadata || {});
    return ok({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: intent.amount / 100,
      currency: intent.currency,
      status: intent.status
    });
  } catch (err) {
    return handleApiError(err);
  }
};
export {
  POST
};
