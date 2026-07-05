<script lang="ts">
  import { otpState, toast, navigate, cart, subtotal, shipping, tax, total, discount, coupon, clearCart, createOrder } from '../stores';
  import { route } from '../router';
  import Button from '../components/Button.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import EmptyState from '../components/EmptyState.svelte';

  let email = '';
  let digits = ['', '', '', '', '', ''];
  let inputs: HTMLInputElement[] = [];
  let remaining = 0;
  let verifying = false;
  let timer: ReturnType<typeof setInterval> | null = null;

  $: if ($route.name === 'otp') email = $route.params.email;

  $: if ($otpState && $otpState.expiresAt > Date.now()) {
    if (!timer) {
      remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1000));
      timer = setInterval(() => {
        remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1000));
        if (remaining === 0 && timer) { clearInterval(timer); timer = null; }
      }, 1000);
    }
  }

  function onDestroy() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  $: expired = !$otpState || $otpState.expiresAt <= Date.now();
  $: locked = !!$otpState?.locked;

  function onInput(i: number, e: Event) {
    const v = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    digits[i] = v.slice(-1);
    digits = [...digits];
    if (v && i < 5) inputs[i + 1]?.focus();
  }
  function onKey(i: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) inputs[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) inputs[i + 1]?.focus();
  }
  function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    digits = text.split('').concat(Array(6).fill('')).slice(0, 6);
    const last = Math.min(text.length, 5);
    inputs[last]?.focus();
  }

  async function verify() {
    const s = $otpState;
    if (!s) return;
    if (expired) { toast('Code expired. Please request a new one.', 'error'); return; }
    if (locked) { toast('Too many attempts. Please resend.', 'error'); return; }
    verifying = true;
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s.email, code: digits.join('') }),
      });
      const json = await res.json();
      if (!json.ok) {
        if (json.error?.code === 'LOCKED') {
          otpState.set({ ...s, locked: true });
        }
        toast(json.error?.message || 'Verification failed.', 'error');
        digits = ['', '', '', '', '', ''];
        inputs[0]?.focus();
        return;
      }

      toast('Verified. Placing your order…', 'success');

      // Create payment intent
      let paymentIntentId = 'pi_test_' + Math.random().toString(36).slice(2, 12);
      try {
        const payRes = await fetch('/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: $total, metadata: { email: s.email } }),
        });
        const payJson = await payRes.json();
        if (payJson.ok && payJson.data?.paymentIntentId) {
          paymentIntentId = payJson.data.paymentIntentId;
        }
      } catch (e) {
        console.error('Payment intent creation failed, using mock', e);
      }

      // Create order in Supabase
      const p = s.pending;
      const order = await createOrder({
        email: s.email,
        fullName: p?.fullName ?? '',
        address: p?.address ?? '',
        city: p?.city ?? '',
        state: p?.state ?? '',
        zip: p?.zip ?? '',
        country: p?.country ?? 'United States',
        items: [...$cart],
        subtotal: $subtotal,
        shipping: $shipping,
        tax: $tax,
        discount: $discount,
        total: $total,
        couponCode: $coupon?.code,
        paymentIntentId,
      });

      if (!order) {
        toast('Failed to place order. Please try again.', 'error');
        return;
      }

      clearCart();
      otpState.set(null);
      onDestroy();
      navigate(`/success/${order.id}`);
    } catch (e) {
      toast('Network error. Please try again.', 'error');
    } finally {
      verifying = false;
    }
  }

  async function resend() {
    const s = $otpState;
    if (!s) { navigate('/checkout'); return; }
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s.email }),
      });
      const json = await res.json();
      if (!json.ok) {
        toast(json.error?.message || 'Failed to resend.', 'error');
        return;
      }
      otpState.set({
        email: s.email, expiresAt: new Date(json.data.expiresAt).getTime(),
        attempts: 0, locked: false, pending: s.pending,
      });
      digits = ['', '', '', '', '', ''];
      if (timer) { clearInterval(timer); timer = null; }
      toast('New OTP sent.', 'info');
      inputs[0]?.focus();
    } catch (e) {
      toast('Network error.', 'error');
    }
  }
</script>

<svelte:window on:unload={onDestroy} />

<div class="container page">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Checkout', href: '/checkout' }, { label: 'Verify', current: true }]} />
  <div class="wrap">
    {#if $cart.length === 0 && !verifying}
      <EmptyState title="Nothing to verify" description="Your cart is empty." actionLabel="Back to shop" onAction={() => navigate('/products')} />
    {:else}
      <div class="card">
        <div class="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
        </div>
        <h1>Verify your email</h1>
        <p>Enter the 6-digit code we sent to <strong>{email}</strong>.</p>

        {#if expired}
          <div class="alert">The code has expired. Resend to get a new one.</div>
        {/if}
        {#if locked}
          <div class="alert">Too many attempts. Resend a new code to continue.</div>
        {/if}

        <div class="otp" on:paste={onPaste}>
          {#each digits as d, i}
            <input
              bind:this={inputs[i]}
              type="text"
              inputmode="numeric"
              maxlength="1"
              value={d}
              on:input={(e) => onInput(i, e)}
              on:keydown={(e) => onKey(i, e)}
              aria-label={`Digit ${i + 1}`}
              disabled={expired || locked}
            />
          {/each}
        </div>

        <div class="meta">
          {#if remaining > 0}
            <span>Expires in <strong>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</strong></span>
          {:else}
            <span class="expired">Expired</span>
          {/if}
          <button class="resend" on:click={resend} disabled={remaining > 0 && !expired && !locked}>Resend code</button>
        </div>

        <Button variant="primary" size="lg" block on:click={verify} loading={verifying} disabled={expired || locked}>
          Verify &amp; pay
        </Button>
        <button class="back" on:click={() => navigate('/checkout')}>← Back to checkout</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  .wrap { display: flex; justify-content: center; }
  .card { width: 100%; max-width: 440px; padding: var(--s-7); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--s-3); }
  .icon { width: 56px; height: 56px; border-radius: var(--r-full); background: var(--bg-elevated); border: 1px solid var(--border); display: grid; place-items: center; color: var(--primary); }
  .icon svg { width: 26px; height: 26px; }
  h1 { font-size: 1.5rem; }
  .card p { font-size: 0.875rem; }
  .card strong { color: var(--text); }
  .alert { width: 100%; padding: 10px 14px; border-radius: var(--r-md); background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: var(--warning); font-size: 0.8125rem; }
  .otp { display: flex; gap: 8px; justify-content: center; margin: var(--s-2) 0; }
  .otp input { width: 48px; height: 56px; text-align: center; font-size: 1.25rem; font-weight: 700; font-family: var(--font-display); background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
  .otp input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }
  .otp input:disabled { opacity: 0.5; }
  .meta { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 0.8125rem; color: var(--text-muted); margin-bottom: var(--s-2); }
  .expired { color: var(--error); }
  .resend { color: var(--primary); font-weight: 600; }
  .resend:disabled { color: var(--text-subtle); cursor: not-allowed; }
  .back { margin-top: var(--s-2); font-size: 0.8125rem; color: var(--text-subtle); }
  .back:hover { color: var(--text); }

  @media (max-width: 480px) {
    .otp input { width: 40px; height: 48px; font-size: 1.0625rem; }
    .card { padding: var(--s-5); }
  }
</style>
