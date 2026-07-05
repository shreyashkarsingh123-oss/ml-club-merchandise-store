import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape, f as each, d as add_attribute } from "../../../../chunks/ssr.js";
import { j as otpState, f as coupon, t as total, g as discount, h as tax, d as shipping, s as subtotal, b as cart, r as route, n as navigate } from "../../../../chunks/stores2.js";
import { B as Button } from "../../../../chunks/Button.js";
import { B as Breadcrumb } from "../../../../chunks/Breadcrumb.js";
import { E as EmptyState } from "../../../../chunks/EmptyState.js";
const css = {
  code: ".page.svelte-15la0g3.svelte-15la0g3{padding:var(--s-5) 0 var(--s-8)}.wrap.svelte-15la0g3.svelte-15la0g3{display:flex;justify-content:center}.card.svelte-15la0g3.svelte-15la0g3{width:100%;max-width:440px;padding:var(--s-7);background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--r-lg);text-align:center;display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}.icon.svelte-15la0g3.svelte-15la0g3{width:56px;height:56px;border-radius:var(--r-full);background:var(--bg-elevated);border:1px solid var(--border);display:grid;place-items:center;color:var(--primary)}.icon.svelte-15la0g3 svg.svelte-15la0g3{width:26px;height:26px}h1.svelte-15la0g3.svelte-15la0g3{font-size:1.5rem}.card.svelte-15la0g3 p.svelte-15la0g3{font-size:0.875rem}.card.svelte-15la0g3 strong.svelte-15la0g3{color:var(--text)}.alert.svelte-15la0g3.svelte-15la0g3{width:100%;padding:10px 14px;border-radius:var(--r-md);background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);color:var(--warning);font-size:0.8125rem}.otp.svelte-15la0g3.svelte-15la0g3{display:flex;gap:8px;justify-content:center;margin:var(--s-2) 0}.otp.svelte-15la0g3 input.svelte-15la0g3{width:48px;height:56px;text-align:center;font-size:1.25rem;font-weight:700;font-family:var(--font-display);background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md);color:var(--text);transition:border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)}.otp.svelte-15la0g3 input.svelte-15la0g3:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(56,189,248,0.15)}.otp.svelte-15la0g3 input.svelte-15la0g3:disabled{opacity:0.5}.meta.svelte-15la0g3.svelte-15la0g3{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:0.8125rem;color:var(--text-muted);margin-bottom:var(--s-2)}.expired.svelte-15la0g3.svelte-15la0g3{color:var(--error)}.resend.svelte-15la0g3.svelte-15la0g3{color:var(--primary);font-weight:600}.resend.svelte-15la0g3.svelte-15la0g3:disabled{color:var(--text-subtle);cursor:not-allowed}.back.svelte-15la0g3.svelte-15la0g3{margin-top:var(--s-2);font-size:0.8125rem;color:var(--text-subtle)}.back.svelte-15la0g3.svelte-15la0g3:hover{color:var(--text)}@media(max-width: 480px){.otp.svelte-15la0g3 input.svelte-15la0g3{width:40px;height:48px;font-size:1.0625rem}.card.svelte-15la0g3.svelte-15la0g3{padding:var(--s-5)}}",
  map: `{"version":3,"file":"Otp.svelte","sources":["Otp.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { otpState, toast, navigate, cart, subtotal, shipping, tax, total, discount, coupon, clearCart, createOrder } from \\"../stores\\";\\nimport { route } from \\"../router\\";\\nimport Button from \\"../components/Button.svelte\\";\\nimport Breadcrumb from \\"../components/Breadcrumb.svelte\\";\\nimport EmptyState from \\"../components/EmptyState.svelte\\";\\nlet email = \\"\\";\\nlet digits = [\\"\\", \\"\\", \\"\\", \\"\\", \\"\\", \\"\\"];\\nlet inputs = [];\\nlet remaining = 0;\\nlet verifying = false;\\nlet timer = null;\\n$: if ($route.name === \\"otp\\") email = $route.params.email;\\n$: if ($otpState && $otpState.expiresAt > Date.now()) {\\n  if (!timer) {\\n    remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1e3));\\n    timer = setInterval(() => {\\n      remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1e3));\\n      if (remaining === 0 && timer) {\\n        clearInterval(timer);\\n        timer = null;\\n      }\\n    }, 1e3);\\n  }\\n}\\nfunction onDestroy() {\\n  if (timer) {\\n    clearInterval(timer);\\n    timer = null;\\n  }\\n}\\n$: expired = !$otpState || $otpState.expiresAt <= Date.now();\\n$: locked = !!$otpState?.locked;\\nfunction onInput(i, e) {\\n  const v = e.target.value.replace(/\\\\D/g, \\"\\");\\n  digits[i] = v.slice(-1);\\n  digits = [...digits];\\n  if (v && i < 5) inputs[i + 1]?.focus();\\n}\\nfunction onKey(i, e) {\\n  if (e.key === \\"Backspace\\" && !digits[i] && i > 0) inputs[i - 1]?.focus();\\n  if (e.key === \\"ArrowLeft\\" && i > 0) inputs[i - 1]?.focus();\\n  if (e.key === \\"ArrowRight\\" && i < 5) inputs[i + 1]?.focus();\\n}\\nfunction onPaste(e) {\\n  e.preventDefault();\\n  const text = (e.clipboardData?.getData(\\"text\\") || \\"\\").replace(/\\\\D/g, \\"\\").slice(0, 6);\\n  digits = text.split(\\"\\").concat(Array(6).fill(\\"\\")).slice(0, 6);\\n  const last = Math.min(text.length, 5);\\n  inputs[last]?.focus();\\n}\\nasync function verify() {\\n  const s = $otpState;\\n  if (!s) return;\\n  if (expired) {\\n    toast(\\"Code expired. Please request a new one.\\", \\"error\\");\\n    return;\\n  }\\n  if (locked) {\\n    toast(\\"Too many attempts. Please resend.\\", \\"error\\");\\n    return;\\n  }\\n  verifying = true;\\n  try {\\n    const res = await fetch(\\"/api/otp/verify\\", {\\n      method: \\"POST\\",\\n      headers: { \\"Content-Type\\": \\"application/json\\" },\\n      body: JSON.stringify({ email: s.email, code: digits.join(\\"\\") })\\n    });\\n    const json = await res.json();\\n    if (!json.ok) {\\n      if (json.error?.code === \\"LOCKED\\") {\\n        otpState.set({ ...s, locked: true });\\n      }\\n      toast(json.error?.message || \\"Verification failed.\\", \\"error\\");\\n      digits = [\\"\\", \\"\\", \\"\\", \\"\\", \\"\\", \\"\\"];\\n      inputs[0]?.focus();\\n      return;\\n    }\\n    toast(\\"Verified. Placing your order\\\\u2026\\", \\"success\\");\\n    let paymentIntentId = \\"pi_test_\\" + Math.random().toString(36).slice(2, 12);\\n    try {\\n      const payRes = await fetch(\\"/api/payment/create\\", {\\n        method: \\"POST\\",\\n        headers: { \\"Content-Type\\": \\"application/json\\" },\\n        body: JSON.stringify({ amount: $total, metadata: { email: s.email } })\\n      });\\n      const payJson = await payRes.json();\\n      if (payJson.ok && payJson.data?.paymentIntentId) {\\n        paymentIntentId = payJson.data.paymentIntentId;\\n      }\\n    } catch (e) {\\n      console.error(\\"Payment intent creation failed, using mock\\", e);\\n    }\\n    const p = s.pending;\\n    const order = await createOrder({\\n      email: s.email,\\n      fullName: p?.fullName ?? \\"\\",\\n      address: p?.address ?? \\"\\",\\n      city: p?.city ?? \\"\\",\\n      state: p?.state ?? \\"\\",\\n      zip: p?.zip ?? \\"\\",\\n      country: p?.country ?? \\"United States\\",\\n      items: [...$cart],\\n      subtotal: $subtotal,\\n      shipping: $shipping,\\n      tax: $tax,\\n      discount: $discount,\\n      total: $total,\\n      couponCode: $coupon?.code,\\n      paymentIntentId\\n    });\\n    if (!order) {\\n      toast(\\"Failed to place order. Please try again.\\", \\"error\\");\\n      return;\\n    }\\n    clearCart();\\n    otpState.set(null);\\n    onDestroy();\\n    navigate(\`/success/\${order.id}\`);\\n  } catch (e) {\\n    toast(\\"Network error. Please try again.\\", \\"error\\");\\n  } finally {\\n    verifying = false;\\n  }\\n}\\nasync function resend() {\\n  const s = $otpState;\\n  if (!s) {\\n    navigate(\\"/checkout\\");\\n    return;\\n  }\\n  try {\\n    const res = await fetch(\\"/api/otp/send\\", {\\n      method: \\"POST\\",\\n      headers: { \\"Content-Type\\": \\"application/json\\" },\\n      body: JSON.stringify({ email: s.email })\\n    });\\n    const json = await res.json();\\n    if (!json.ok) {\\n      toast(json.error?.message || \\"Failed to resend.\\", \\"error\\");\\n      return;\\n    }\\n    otpState.set({\\n      email: s.email,\\n      expiresAt: new Date(json.data.expiresAt).getTime(),\\n      attempts: 0,\\n      locked: false,\\n      pending: s.pending\\n    });\\n    digits = [\\"\\", \\"\\", \\"\\", \\"\\", \\"\\", \\"\\"];\\n    if (timer) {\\n      clearInterval(timer);\\n      timer = null;\\n    }\\n    toast(\\"New OTP sent.\\", \\"info\\");\\n    inputs[0]?.focus();\\n  } catch (e) {\\n    toast(\\"Network error.\\", \\"error\\");\\n  }\\n}\\n<\/script>\\n\\n<svelte:window on:unload={onDestroy} />\\n\\n<div class=\\"container page\\">\\n  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Checkout', href: '/checkout' }, { label: 'Verify', current: true }]} />\\n  <div class=\\"wrap\\">\\n    {#if $cart.length === 0 && !verifying}\\n      <EmptyState title=\\"Nothing to verify\\" description=\\"Your cart is empty.\\" actionLabel=\\"Back to shop\\" onAction={() => navigate('/products')} />\\n    {:else}\\n      <div class=\\"card\\">\\n        <div class=\\"icon\\" aria-hidden=\\"true\\">\\n          <svg viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><rect x=\\"4\\" y=\\"10\\" width=\\"16\\" height=\\"11\\" rx=\\"2\\"/><path d=\\"M8 10V7a4 4 0 018 0v3\\"/></svg>\\n        </div>\\n        <h1>Verify your email</h1>\\n        <p>Enter the 6-digit code we sent to <strong>{email}</strong>.</p>\\n\\n        {#if expired}\\n          <div class=\\"alert\\">The code has expired. Resend to get a new one.</div>\\n        {/if}\\n        {#if locked}\\n          <div class=\\"alert\\">Too many attempts. Resend a new code to continue.</div>\\n        {/if}\\n\\n        <div class=\\"otp\\" on:paste={onPaste}>\\n          {#each digits as d, i}\\n            <input\\n              bind:this={inputs[i]}\\n              type=\\"text\\"\\n              inputmode=\\"numeric\\"\\n              maxlength=\\"1\\"\\n              value={d}\\n              on:input={(e) => onInput(i, e)}\\n              on:keydown={(e) => onKey(i, e)}\\n              aria-label={\`Digit \${i + 1}\`}\\n              disabled={expired || locked}\\n            />\\n          {/each}\\n        </div>\\n\\n        <div class=\\"meta\\">\\n          {#if remaining > 0}\\n            <span>Expires in <strong>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</strong></span>\\n          {:else}\\n            <span class=\\"expired\\">Expired</span>\\n          {/if}\\n          <button class=\\"resend\\" on:click={resend} disabled={remaining > 0 && !expired && !locked}>Resend code</button>\\n        </div>\\n\\n        <Button variant=\\"primary\\" size=\\"lg\\" block on:click={verify} loading={verifying} disabled={expired || locked}>\\n          Verify &amp; pay\\n        </Button>\\n        <button class=\\"back\\" on:click={() => navigate('/checkout')}>← Back to checkout</button>\\n      </div>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  .page { padding: var(--s-5) 0 var(--s-8); }\\n  .wrap { display: flex; justify-content: center; }\\n  .card { width: 100%; max-width: 440px; padding: var(--s-7); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--s-3); }\\n  .icon { width: 56px; height: 56px; border-radius: var(--r-full); background: var(--bg-elevated); border: 1px solid var(--border); display: grid; place-items: center; color: var(--primary); }\\n  .icon svg { width: 26px; height: 26px; }\\n  h1 { font-size: 1.5rem; }\\n  .card p { font-size: 0.875rem; }\\n  .card strong { color: var(--text); }\\n  .alert { width: 100%; padding: 10px 14px; border-radius: var(--r-md); background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: var(--warning); font-size: 0.8125rem; }\\n  .otp { display: flex; gap: 8px; justify-content: center; margin: var(--s-2) 0; }\\n  .otp input { width: 48px; height: 56px; text-align: center; font-size: 1.25rem; font-weight: 700; font-family: var(--font-display); background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }\\n  .otp input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }\\n  .otp input:disabled { opacity: 0.5; }\\n  .meta { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 0.8125rem; color: var(--text-muted); margin-bottom: var(--s-2); }\\n  .expired { color: var(--error); }\\n  .resend { color: var(--primary); font-weight: 600; }\\n  .resend:disabled { color: var(--text-subtle); cursor: not-allowed; }\\n  .back { margin-top: var(--s-2); font-size: 0.8125rem; color: var(--text-subtle); }\\n  .back:hover { color: var(--text); }\\n\\n  @media (max-width: 480px) {\\n    .otp input { width: 40px; height: 48px; font-size: 1.0625rem; }\\n    .card { padding: var(--s-5); }\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Otp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expired;
  let locked;
  let $otpState, $$unsubscribe_otpState;
  let $$unsubscribe_coupon;
  let $$unsubscribe_total;
  let $$unsubscribe_discount;
  let $$unsubscribe_tax;
  let $$unsubscribe_shipping;
  let $$unsubscribe_subtotal;
  let $cart, $$unsubscribe_cart;
  let $route, $$unsubscribe_route;
  $$unsubscribe_otpState = subscribe(otpState, (value) => $otpState = value);
  $$unsubscribe_coupon = subscribe(coupon, (value) => value);
  $$unsubscribe_total = subscribe(total, (value) => value);
  $$unsubscribe_discount = subscribe(discount, (value) => value);
  $$unsubscribe_tax = subscribe(tax, (value) => value);
  $$unsubscribe_shipping = subscribe(shipping, (value) => value);
  $$unsubscribe_subtotal = subscribe(subtotal, (value) => value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_route = subscribe(route, (value) => $route = value);
  let email = "";
  let digits = ["", "", "", "", "", ""];
  let inputs = [];
  let remaining = 0;
  let verifying = false;
  let timer = null;
  $$result.css.add(css);
  {
    if ($route.name === "otp") email = $route.params.email;
  }
  {
    if ($otpState && $otpState.expiresAt > Date.now()) {
      if (!timer) {
        remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1e3));
        timer = setInterval(
          () => {
            remaining = Math.max(0, Math.ceil(($otpState.expiresAt - Date.now()) / 1e3));
            if (remaining === 0 && timer) {
              clearInterval(timer);
              timer = null;
            }
          },
          1e3
        );
      }
    }
  }
  expired = !$otpState || $otpState.expiresAt <= Date.now();
  locked = !!$otpState?.locked;
  $$unsubscribe_otpState();
  $$unsubscribe_coupon();
  $$unsubscribe_total();
  $$unsubscribe_discount();
  $$unsubscribe_tax();
  $$unsubscribe_shipping();
  $$unsubscribe_subtotal();
  $$unsubscribe_cart();
  $$unsubscribe_route();
  return ` <div class="container page svelte-15la0g3">${validate_component(Breadcrumb, "Breadcrumb").$$render(
    $$result,
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Checkout", href: "/checkout" },
        { label: "Verify", current: true }
      ]
    },
    {},
    {}
  )} <div class="wrap svelte-15la0g3">${$cart.length === 0 && !verifying ? `${validate_component(EmptyState, "EmptyState").$$render(
    $$result,
    {
      title: "Nothing to verify",
      description: "Your cart is empty.",
      actionLabel: "Back to shop",
      onAction: () => navigate()
    },
    {},
    {}
  )}` : `<div class="card svelte-15la0g3"><div class="icon svelte-15la0g3" aria-hidden="true" data-svelte-h="svelte-1utmbwm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="svelte-15la0g3"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 018 0v3"></path></svg></div> <h1 class="svelte-15la0g3" data-svelte-h="svelte-1mznns6">Verify your email</h1> <p class="svelte-15la0g3">Enter the 6-digit code we sent to <strong class="svelte-15la0g3">${escape(email)}</strong>.</p> ${expired ? `<div class="alert svelte-15la0g3" data-svelte-h="svelte-1q2klhp">The code has expired. Resend to get a new one.</div>` : ``} ${locked ? `<div class="alert svelte-15la0g3" data-svelte-h="svelte-61qm2b">Too many attempts. Resend a new code to continue.</div>` : ``} <div class="otp svelte-15la0g3">${each(digits, (d, i) => {
    return `<input type="text" inputmode="numeric" maxlength="1"${add_attribute("value", d, 0)}${add_attribute("aria-label", `Digit ${i + 1}`, 0)} ${expired || locked ? "disabled" : ""} class="svelte-15la0g3"${add_attribute("this", inputs[i], 0)}>`;
  })}</div> <div class="meta svelte-15la0g3">${remaining > 0 ? `<span>Expires in <strong class="svelte-15la0g3">${escape(Math.floor(remaining / 60))}:${escape(String(remaining % 60).padStart(2, "0"))}</strong></span>` : `<span class="expired svelte-15la0g3" data-svelte-h="svelte-16sq75v">Expired</span>`} <button class="resend svelte-15la0g3" ${remaining > 0 && !expired && !locked ? "disabled" : ""}>Resend code</button></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "primary",
      size: "lg",
      block: true,
      loading: verifying,
      disabled: expired || locked
    },
    {},
    {
      default: () => {
        return `Verify &amp; pay`;
      }
    }
  )} <button class="back svelte-15la0g3" data-svelte-h="svelte-bhiso1">← Back to checkout</button></div>`}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Otp, "Otp").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
