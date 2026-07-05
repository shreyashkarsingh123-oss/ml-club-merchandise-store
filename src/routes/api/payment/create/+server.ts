import type { RequestHandler } from './$types';
import { ok, fail, handleApiError, validateRequired } from '$lib/server/api';
import { createPaymentIntent, isStripeConfigured } from '$lib/server/stripe';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const missing = validateRequired(body, ['amount']);
    if (missing) return fail('VALIDATION_ERROR', missing, 400);

    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return fail('VALIDATION_ERROR', 'Amount must be a positive number.', 400);
    }

    if (!isStripeConfigured()) {
      // Stripe not configured — return a mock intent for dev/test mode
      return ok({
        clientSecret: 'pi_test_mock_secret',
        paymentIntentId: 'pi_test_' + Math.random().toString(36).slice(2, 12),
        amount,
        currency: 'usd',
        status: 'requires_confirmation',
        mock: true,
      });
    }

    const intent = await createPaymentIntent(amount, 'usd', body.metadata || {});
    return ok({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: intent.amount / 100,
      currency: intent.currency,
      status: intent.status,
    });
  } catch (err) {
    return handleApiError(err);
  }
};
