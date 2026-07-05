import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

function getStripe(): Stripe {
  if (!STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }
  return new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' as any });
}

export function isStripeConfigured(): boolean {
  return !!STRIPE_SECRET_KEY;
}

export async function createPaymentIntent(amount: number, currency = 'usd', metadata: Record<string, string> = {}): Promise<Stripe.PaymentIntent> {
  const stripe = getStripe();
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
    metadata,
  });
}

export async function retrievePaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
  const stripe = getStripe();
  return stripe.paymentIntents.retrieve(id);
}
