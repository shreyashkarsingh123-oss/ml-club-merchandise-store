<script lang="ts">
  import { cart, subtotal, shipping, tax, total, discount, coupon, clearCart, createOrder, toast, navigate, otpState } from '../stores';
  import { formatPrice } from '../format';
  import Button from '../components/Button.svelte';
  import Input from '../components/Input.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import EmptyState from '../components/EmptyState.svelte';

  let fullName = '';
  let email = '';
  let address = '';
  let city = '';
  let state = '';
  let zip = '';
  let country = 'United States';
  let card = '4242 4242 4242 4242';
  let exp = '12/34';
  let cvc = '123';
  let processing = false;
  let errors: Record<string, string> = {};

  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (fullName.trim().length < 2) e.fullName = 'Enter your full name.';
    if (!emailRe.test(email)) e.email = 'Enter a valid email.';
    if (address.trim().length < 4) e.address = 'Enter a street address.';
    if (city.trim().length < 2) e.city = 'Enter a city.';
    if (state.trim().length < 2) e.state = 'Enter a state/region.';
    if (zip.trim().length < 3) e.zip = 'Enter a postal code.';
    if (card.replace(/\s/g, '').length < 12) e.card = 'Enter a valid card number.';
    if (!/^\d{2}\/\d{2}$/.test(exp)) e.exp = 'MM/YY';
    if (cvc.length < 3) e.cvc = 'CVC';
    errors = e;
    return Object.keys(e).length === 0;
  }

  async function placeOrder() {
    if (!validate()) { toast('Please fix the highlighted fields.', 'error'); return; }
    processing = true;
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!json.ok) {
        toast(json.error?.message || 'Failed to send OTP.', 'error');
        return;
      }
      otpState.set({
        email, expiresAt: new Date(json.data.expiresAt).getTime(), attempts: 0, locked: false,
        pending: { fullName, email, address, city, state, zip, country },
      });
      toast(`OTP sent to ${email}. Check the server console in dev.`, 'success');
      navigate(`/otp/${encodeURIComponent(email)}`);
    } catch (e) {
      toast('Network error. Please try again.', 'error');
    } finally {
      processing = false;
    }
  }
</script>

<div class="container page">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout', current: true }]} />
  <h1>Checkout</h1>

  {#if $cart.length === 0}
    <EmptyState title="Your cart is empty" description="Add items before checking out." actionLabel="Shop now" onAction={() => navigate('/products')} />
  {:else}
    <div class="layout">
      <form class="form" on:submit|preventDefault={placeOrder}>
        <section class="block">
          <h2>Customer information</h2>
          <div class="grid-2">
            <Input label="Full name" bind:value={fullName} required autocomplete="name" error={errors.fullName} />
            <Input label="Email" type="email" bind:value={email} required autocomplete="email" error={errors.email} />
          </div>
        </section>

        <section class="block">
          <h2>Shipping address</h2>
          <Input label="Street address" bind:value={address} required autocomplete="street-address" error={errors.address} />
          <div class="grid-2">
            <Input label="City" bind:value={city} required autocomplete="address-level2" error={errors.city} />
            <Input label="State / Region" bind:value={state} required autocomplete="address-level1" error={errors.state} />
          </div>
          <div class="grid-2">
            <Input label="ZIP / Postal code" bind:value={zip} required autocomplete="postal-code" error={errors.zip} />
            <div class="field">
              <label for="country" class="field-label">Country</label>
              <select id="country" bind:value={country} class="field-input">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>India</option>
                <option>Australia</option>
              </select>
            </div>
          </div>
        </section>

        <section class="block">
          <h2>Payment <span class="badge-test">Stripe test mode</span></h2>
          <p class="hint">Use card <code>4242 4242 4242 4242</code>, any future date, any CVC. No real charge is made.</p>
          <Input label="Card number" bind:value={card} required autocomplete="cc-number" error={errors.card} />
          <div class="grid-2">
            <Input label="Expiry (MM/YY)" bind:value={exp} required autocomplete="cc-exp" error={errors.exp} />
            <Input label="CVC" bind:value={cvc} required autocomplete="cc-csc" error={errors.cvc} maxlength={4} />
          </div>
        </section>

        <Button type="submit" variant="primary" size="lg" block>Continue to verification</Button>
      </form>

      <aside class="summary">
        <h2>Order summary</h2>
        <div class="items">
          {#each $cart as item (item.productId + item.size + item.color)}
            <div class="s-item">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <span class="s-name">{item.name}</span>
                <span class="s-var">{item.size} · {item.color} · ×{item.quantity}</span>
              </div>
              <span class="s-price">{formatPrice(item.price * item.quantity)}</span>
            </div>
          {/each}
        </div>
        <div class="lines">
          <div class="line"><span>Subtotal</span><span>{formatPrice($subtotal)}</span></div>
          {#if $discount > 0}<div class="line"><span>Discount</span><span>−{formatPrice($discount)}</span></div>{/if}
          <div class="line"><span>Shipping</span><span>{$shipping === 0 ? 'Free' : formatPrice($shipping)}</span></div>
          <div class="line"><span>Tax</span><span>{formatPrice($tax)}</span></div>
          <div class="line total"><span>Total</span><span>{formatPrice($total)}</span></div>
        </div>
      </aside>
    </div>
  {/if}
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  h1 { margin: var(--s-5) 0 var(--s-6); }
  .layout { display: grid; grid-template-columns: 1fr 380px; gap: var(--s-6); align-items: flex-start; }
  .form { display: flex; flex-direction: column; gap: var(--s-5); }
  .block { display: flex; flex-direction: column; gap: var(--s-3); padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .block h2 { font-size: 1.0625rem; display: flex; align-items: center; gap: 10px; }
  .badge-test { font-size: 0.625rem; font-weight: 600; padding: 3px 8px; border-radius: var(--r-full); background: rgba(56,189,248,0.12); color: var(--primary); border: 1px solid rgba(56,189,248,0.25); text-transform: uppercase; letter-spacing: 0.04em; }
  .hint { font-size: 0.75rem; color: var(--text-subtle); margin-top: -4px; }
  .hint code { font-family: monospace; color: var(--text-muted); background: var(--bg); padding: 1px 5px; border-radius: 4px; border: 1px solid var(--border); }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-size: 0.8125rem; font-weight: 500; color: var(--text-muted); }
  .field-input { width: 100%; height: 44px; padding: 0 14px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); }
  .field-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }

  .summary { position: sticky; top: 80px; padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); display: flex; flex-direction: column; gap: var(--s-4); }
  .summary h2 { font-size: 1.0625rem; }
  .items { display: flex; flex-direction: column; gap: 10px; }
  .s-item { display: flex; align-items: center; gap: 10px; }
  .s-item img { width: 48px; height: 48px; object-fit: cover; border-radius: var(--r-sm); border: 1px solid var(--border); }
  .s-item > div { flex: 1; display: flex; flex-direction: column; }
  .s-name { font-size: 0.8125rem; font-weight: 600; }
  .s-var { font-size: 0.75rem; color: var(--text-subtle); }
  .s-price { font-size: 0.8125rem; font-weight: 600; }
  .lines { display: flex; flex-direction: column; gap: 8px; padding-top: var(--s-3); border-top: 1px solid var(--border); }
  .line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }
  .line.total { font-size: 1.0625rem; font-weight: 700; color: var(--text); font-family: var(--font-display); padding-top: 8px; border-top: 1px solid var(--border); }

  @media (max-width: 820px) {
    .layout { grid-template-columns: 1fr; }
    .summary { position: static; order: -1; }
    .grid-2 { grid-template-columns: 1fr; }
  }
</style>
