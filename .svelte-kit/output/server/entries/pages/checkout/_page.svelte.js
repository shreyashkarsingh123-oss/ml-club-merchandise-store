import { c as create_ssr_component, d as add_attribute, e as escape, g as spread, h as escape_attribute_value, i as escape_object, b as subscribe, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { b as cart, s as subtotal, g as discount, d as shipping, h as tax, t as total, n as navigate } from "../../../chunks/stores2.js";
import { f as formatPrice } from "../../../chunks/format.js";
import { B as Button } from "../../../chunks/Button.js";
import { B as Breadcrumb } from "../../../chunks/Breadcrumb.js";
import { E as EmptyState } from "../../../chunks/EmptyState.js";
const css$1 = {
  code: ".field.svelte-1sj3gv2{display:flex;flex-direction:column;gap:6px}.field-label.svelte-1sj3gv2{font-size:0.8125rem;font-weight:500;color:var(--text-muted);letter-spacing:-0.01em}.req.svelte-1sj3gv2{color:var(--primary);margin-left:2px}.field-input.svelte-1sj3gv2{width:100%;height:44px;padding:0 14px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--r-md);color:var(--text);transition:border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease)}.field-input.svelte-1sj3gv2::placeholder{color:var(--text-subtle)}.field-input.svelte-1sj3gv2:hover{border-color:var(--border-strong)}.field-input.svelte-1sj3gv2:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-glow);background:var(--bg-elevated)}.field-input.has-error.svelte-1sj3gv2{border-color:var(--error)}.field-input.has-error.svelte-1sj3gv2:focus{box-shadow:0 0 0 3px var(--error-glow)}.field-input.svelte-1sj3gv2:disabled{opacity:0.5;cursor:not-allowed}.field-error.svelte-1sj3gv2{font-size:0.75rem;color:var(--error)}",
  map: '{"version":3,"file":"Input.svelte","sources":["Input.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let label = \\"\\";\\nexport let value = \\"\\";\\nexport let type = \\"text\\";\\nexport let placeholder = \\"\\";\\nexport let required = false;\\nexport let disabled = false;\\nexport let error = \\"\\";\\nexport let id = \\"\\";\\nexport let autocomplete = \\"\\";\\nexport let min = null;\\nexport let max = null;\\nexport let maxlength = null;\\nexport let inputmode = null;\\nconst inputId = id || `in_${Math.random().toString(36).slice(2, 8)}`;\\nfunction onInput(e) {\\n  const t = e.target;\\n  value = type === \\"number\\" ? t.value === \\"\\" ? \\"\\" : Number(t.value) : t.value;\\n}\\n<\/script>\\n\\n<div class=\\"field\\">\\n  {#if label}\\n    <label for={inputId} class=\\"field-label\\">{label}{#if required}<span class=\\"req\\" aria-hidden=\\"true\\">*</span>{/if}</label>\\n  {/if}\\n  <input\\n    id={inputId}\\n    {type}\\n    {placeholder}\\n    {required}\\n    {disabled}\\n    {autocomplete}\\n    {inputmode}\\n    value={value}\\n    on:input={onInput}\\n    class=\\"field-input\\"\\n    class:has-error={!!error}\\n    aria-invalid={!!error}\\n    aria-describedby={error ? `${inputId}-err` : undefined}\\n    {...(min !== null ? { min } : {})}\\n    {...(max !== null ? { max } : {})}\\n    {...(maxlength !== null ? { maxlength } : {})}\\n  />\\n  {#if error}\\n    <p id={`${inputId}-err`} class=\\"field-error\\" role=\\"alert\\">{error}</p>\\n  {/if}\\n</div>\\n\\n<style>\\n  .field { display: flex; flex-direction: column; gap: 6px; }\\n  .field-label {\\n    font-size: 0.8125rem; font-weight: 500; color: var(--text-muted);\\n    letter-spacing: -0.01em;\\n  }\\n  .req { color: var(--primary); margin-left: 2px; }\\n  .field-input {\\n    width: 100%;\\n    height: 44px;\\n    padding: 0 14px;\\n    background: var(--bg-surface);\\n    border: 1px solid var(--border);\\n    border-radius: var(--r-md);\\n    color: var(--text);\\n    transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease);\\n  }\\n  .field-input::placeholder { color: var(--text-subtle); }\\n  .field-input:hover { border-color: var(--border-strong); }\\n  .field-input:focus {\\n    outline: none;\\n    border-color: var(--primary);\\n    box-shadow: 0 0 0 3px var(--primary-glow);\\n    background: var(--bg-elevated);\\n  }\\n  .field-input.has-error { border-color: var(--error); }\\n  .field-input.has-error:focus { box-shadow: 0 0 0 3px var(--error-glow); }\\n  .field-input:disabled { opacity: 0.5; cursor: not-allowed; }\\n  .field-error { font-size: 0.75rem; color: var(--error); }\\n</style>\\n"],"names":[],"mappings":"AAgDE,qBAAO,CAAE,OAAO,CAAE,IAAI,CAAE,cAAc,CAAE,MAAM,CAAE,GAAG,CAAE,GAAK,CAC1D,2BAAa,CACX,SAAS,CAAE,SAAS,CAAE,WAAW,CAAE,GAAG,CAAE,KAAK,CAAE,IAAI,YAAY,CAAC,CAChE,cAAc,CAAE,OAClB,CACA,mBAAK,CAAE,KAAK,CAAE,IAAI,SAAS,CAAC,CAAE,WAAW,CAAE,GAAK,CAChD,2BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,QAAQ,CAAC,CAC/B,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,UAAU,CAAE,YAAY,CAAC,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CAAC,UAAU,CAAC,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CAAC,UAAU,CAAC,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CACtH,CACA,2BAAY,aAAc,CAAE,KAAK,CAAE,IAAI,aAAa,CAAG,CACvD,2BAAY,MAAO,CAAE,YAAY,CAAE,IAAI,eAAe,CAAG,CACzD,2BAAY,MAAO,CACjB,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,IAAI,SAAS,CAAC,CAC5B,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,cAAc,CAAC,CACzC,UAAU,CAAE,IAAI,aAAa,CAC/B,CACA,YAAY,yBAAW,CAAE,YAAY,CAAE,IAAI,OAAO,CAAG,CACrD,YAAY,yBAAU,MAAO,CAAE,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,YAAY,CAAG,CACxE,2BAAY,SAAU,CAAE,OAAO,CAAE,GAAG,CAAE,MAAM,CAAE,WAAa,CAC3D,2BAAa,CAAE,SAAS,CAAE,OAAO,CAAE,KAAK,CAAE,IAAI,OAAO,CAAG"}'
};
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { value = "" } = $$props;
  let { type = "text" } = $$props;
  let { placeholder = "" } = $$props;
  let { required = false } = $$props;
  let { disabled = false } = $$props;
  let { error = "" } = $$props;
  let { id = "" } = $$props;
  let { autocomplete = "" } = $$props;
  let { min = null } = $$props;
  let { max = null } = $$props;
  let { maxlength = null } = $$props;
  let { inputmode = null } = $$props;
  const inputId = id || `in_${Math.random().toString(36).slice(2, 8)}`;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0) $$bindings.autocomplete(autocomplete);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0) $$bindings.maxlength(maxlength);
  if ($$props.inputmode === void 0 && $$bindings.inputmode && inputmode !== void 0) $$bindings.inputmode(inputmode);
  $$result.css.add(css$1);
  return `<div class="field svelte-1sj3gv2">${label ? `<label${add_attribute("for", inputId, 0)} class="field-label svelte-1sj3gv2">${escape(label)}${required ? `<span class="req svelte-1sj3gv2" aria-hidden="true" data-svelte-h="svelte-1g6big4">*</span>` : ``}</label>` : ``} <input${spread(
    [
      { id: escape_attribute_value(inputId) },
      { type: escape_attribute_value(type) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { required: required || null },
      { disabled: disabled || null },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      {
        inputmode: escape_attribute_value(inputmode)
      },
      { value: escape_attribute_value(value) },
      { class: "field-input" },
      {
        "aria-invalid": escape_attribute_value(!!error)
      },
      {
        "aria-describedby": escape_attribute_value(error ? `${inputId}-err` : void 0)
      },
      escape_object(min !== null ? { min } : {}),
      escape_object(max !== null ? { max } : {}),
      escape_object(maxlength !== null ? { maxlength } : {})
    ],
    {
      classes: (!!error ? "has-error" : "") + " svelte-1sj3gv2"
    }
  )}> ${error ? `<p${add_attribute("id", `${inputId}-err`, 0)} class="field-error svelte-1sj3gv2" role="alert">${escape(error)}</p>` : ``} </div>`;
});
const css = {
  code: ".page.svelte-c70mt3.svelte-c70mt3{padding:var(--s-5) 0 var(--s-8)}h1.svelte-c70mt3.svelte-c70mt3{margin:var(--s-5) 0 var(--s-6)}.layout.svelte-c70mt3.svelte-c70mt3{display:grid;grid-template-columns:1fr 380px;gap:var(--s-6);align-items:flex-start}.form.svelte-c70mt3.svelte-c70mt3{display:flex;flex-direction:column;gap:var(--s-5)}.block.svelte-c70mt3.svelte-c70mt3{display:flex;flex-direction:column;gap:var(--s-3);padding:var(--s-5);background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--r-lg)}.block.svelte-c70mt3 h2.svelte-c70mt3{font-size:1.0625rem;display:flex;align-items:center;gap:10px}.badge-test.svelte-c70mt3.svelte-c70mt3{font-size:0.625rem;font-weight:600;padding:3px 8px;border-radius:var(--r-full);background:rgba(56,189,248,0.12);color:var(--primary);border:1px solid rgba(56,189,248,0.25);text-transform:uppercase;letter-spacing:0.04em}.hint.svelte-c70mt3.svelte-c70mt3{font-size:0.75rem;color:var(--text-subtle);margin-top:-4px}.hint.svelte-c70mt3 code.svelte-c70mt3{font-family:monospace;color:var(--text-muted);background:var(--bg);padding:1px 5px;border-radius:4px;border:1px solid var(--border)}.grid-2.svelte-c70mt3.svelte-c70mt3{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-3)}.field.svelte-c70mt3.svelte-c70mt3{display:flex;flex-direction:column;gap:6px}.field-label.svelte-c70mt3.svelte-c70mt3{font-size:0.8125rem;font-weight:500;color:var(--text-muted)}.field-input.svelte-c70mt3.svelte-c70mt3{width:100%;height:44px;padding:0 14px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--r-md);color:var(--text)}.field-input.svelte-c70mt3.svelte-c70mt3:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(56,189,248,0.15)}.summary.svelte-c70mt3.svelte-c70mt3{position:sticky;top:80px;padding:var(--s-5);background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--r-lg);display:flex;flex-direction:column;gap:var(--s-4)}.summary.svelte-c70mt3 h2.svelte-c70mt3{font-size:1.0625rem}.items.svelte-c70mt3.svelte-c70mt3{display:flex;flex-direction:column;gap:10px}.s-item.svelte-c70mt3.svelte-c70mt3{display:flex;align-items:center;gap:10px}.s-item.svelte-c70mt3 img.svelte-c70mt3{width:48px;height:48px;object-fit:cover;border-radius:var(--r-sm);border:1px solid var(--border)}.s-item.svelte-c70mt3>div.svelte-c70mt3{flex:1;display:flex;flex-direction:column}.s-name.svelte-c70mt3.svelte-c70mt3{font-size:0.8125rem;font-weight:600}.s-var.svelte-c70mt3.svelte-c70mt3{font-size:0.75rem;color:var(--text-subtle)}.s-price.svelte-c70mt3.svelte-c70mt3{font-size:0.8125rem;font-weight:600}.lines.svelte-c70mt3.svelte-c70mt3{display:flex;flex-direction:column;gap:8px;padding-top:var(--s-3);border-top:1px solid var(--border)}.line.svelte-c70mt3.svelte-c70mt3{display:flex;justify-content:space-between;font-size:0.875rem;color:var(--text-muted)}.line.total.svelte-c70mt3.svelte-c70mt3{font-size:1.0625rem;font-weight:700;color:var(--text);font-family:var(--font-display);padding-top:8px;border-top:1px solid var(--border)}@media(max-width: 820px){.layout.svelte-c70mt3.svelte-c70mt3{grid-template-columns:1fr}.summary.svelte-c70mt3.svelte-c70mt3{position:static;order:-1}.grid-2.svelte-c70mt3.svelte-c70mt3{grid-template-columns:1fr}}",
  map: `{"version":3,"file":"Checkout.svelte","sources":["Checkout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { cart, subtotal, shipping, tax, total, discount, coupon, clearCart, createOrder, toast, navigate, otpState } from \\"../stores\\";\\nimport { formatPrice } from \\"../format\\";\\nimport Button from \\"../components/Button.svelte\\";\\nimport Input from \\"../components/Input.svelte\\";\\nimport Breadcrumb from \\"../components/Breadcrumb.svelte\\";\\nimport EmptyState from \\"../components/EmptyState.svelte\\";\\nlet fullName = \\"\\";\\nlet email = \\"\\";\\nlet address = \\"\\";\\nlet city = \\"\\";\\nlet state = \\"\\";\\nlet zip = \\"\\";\\nlet country = \\"United States\\";\\nlet card = \\"4242 4242 4242 4242\\";\\nlet exp = \\"12/34\\";\\nlet cvc = \\"123\\";\\nlet processing = false;\\nlet errors = {};\\nconst emailRe = /^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$/;\\nfunction validate() {\\n  const e = {};\\n  if (fullName.trim().length < 2) e.fullName = \\"Enter your full name.\\";\\n  if (!emailRe.test(email)) e.email = \\"Enter a valid email.\\";\\n  if (address.trim().length < 4) e.address = \\"Enter a street address.\\";\\n  if (city.trim().length < 2) e.city = \\"Enter a city.\\";\\n  if (state.trim().length < 2) e.state = \\"Enter a state/region.\\";\\n  if (zip.trim().length < 3) e.zip = \\"Enter a postal code.\\";\\n  if (card.replace(/\\\\s/g, \\"\\").length < 12) e.card = \\"Enter a valid card number.\\";\\n  if (!/^\\\\d{2}\\\\/\\\\d{2}$/.test(exp)) e.exp = \\"MM/YY\\";\\n  if (cvc.length < 3) e.cvc = \\"CVC\\";\\n  errors = e;\\n  return Object.keys(e).length === 0;\\n}\\nasync function placeOrder() {\\n  if (!validate()) {\\n    toast(\\"Please fix the highlighted fields.\\", \\"error\\");\\n    return;\\n  }\\n  processing = true;\\n  try {\\n    const res = await fetch(\\"/api/otp/send\\", {\\n      method: \\"POST\\",\\n      headers: { \\"Content-Type\\": \\"application/json\\" },\\n      body: JSON.stringify({ email })\\n    });\\n    const json = await res.json();\\n    if (!json.ok) {\\n      toast(json.error?.message || \\"Failed to send OTP.\\", \\"error\\");\\n      return;\\n    }\\n    otpState.set({\\n      email,\\n      expiresAt: new Date(json.data.expiresAt).getTime(),\\n      attempts: 0,\\n      locked: false,\\n      pending: { fullName, email, address, city, state, zip, country }\\n    });\\n    toast(\`OTP sent to \${email}. Check the server console in dev.\`, \\"success\\");\\n    navigate(\`/otp/\${encodeURIComponent(email)}\`);\\n  } catch (e) {\\n    toast(\\"Network error. Please try again.\\", \\"error\\");\\n  } finally {\\n    processing = false;\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"container page\\">\\n  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout', current: true }]} />\\n  <h1>Checkout</h1>\\n\\n  {#if $cart.length === 0}\\n    <EmptyState title=\\"Your cart is empty\\" description=\\"Add items before checking out.\\" actionLabel=\\"Shop now\\" onAction={() => navigate('/products')} />\\n  {:else}\\n    <div class=\\"layout\\">\\n      <form class=\\"form\\" on:submit|preventDefault={placeOrder}>\\n        <section class=\\"block\\">\\n          <h2>Customer information</h2>\\n          <div class=\\"grid-2\\">\\n            <Input label=\\"Full name\\" bind:value={fullName} required autocomplete=\\"name\\" error={errors.fullName} />\\n            <Input label=\\"Email\\" type=\\"email\\" bind:value={email} required autocomplete=\\"email\\" error={errors.email} />\\n          </div>\\n        </section>\\n\\n        <section class=\\"block\\">\\n          <h2>Shipping address</h2>\\n          <Input label=\\"Street address\\" bind:value={address} required autocomplete=\\"street-address\\" error={errors.address} />\\n          <div class=\\"grid-2\\">\\n            <Input label=\\"City\\" bind:value={city} required autocomplete=\\"address-level2\\" error={errors.city} />\\n            <Input label=\\"State / Region\\" bind:value={state} required autocomplete=\\"address-level1\\" error={errors.state} />\\n          </div>\\n          <div class=\\"grid-2\\">\\n            <Input label=\\"ZIP / Postal code\\" bind:value={zip} required autocomplete=\\"postal-code\\" error={errors.zip} />\\n            <div class=\\"field\\">\\n              <label for=\\"country\\" class=\\"field-label\\">Country</label>\\n              <select id=\\"country\\" bind:value={country} class=\\"field-input\\">\\n                <option>United States</option>\\n                <option>Canada</option>\\n                <option>United Kingdom</option>\\n                <option>Germany</option>\\n                <option>India</option>\\n                <option>Australia</option>\\n              </select>\\n            </div>\\n          </div>\\n        </section>\\n\\n        <section class=\\"block\\">\\n          <h2>Payment <span class=\\"badge-test\\">Stripe test mode</span></h2>\\n          <p class=\\"hint\\">Use card <code>4242 4242 4242 4242</code>, any future date, any CVC. No real charge is made.</p>\\n          <Input label=\\"Card number\\" bind:value={card} required autocomplete=\\"cc-number\\" error={errors.card} />\\n          <div class=\\"grid-2\\">\\n            <Input label=\\"Expiry (MM/YY)\\" bind:value={exp} required autocomplete=\\"cc-exp\\" error={errors.exp} />\\n            <Input label=\\"CVC\\" bind:value={cvc} required autocomplete=\\"cc-csc\\" error={errors.cvc} maxlength={4} />\\n          </div>\\n        </section>\\n\\n        <Button type=\\"submit\\" variant=\\"primary\\" size=\\"lg\\" block>Continue to verification</Button>\\n      </form>\\n\\n      <aside class=\\"summary\\">\\n        <h2>Order summary</h2>\\n        <div class=\\"items\\">\\n          {#each $cart as item (item.productId + item.size + item.color)}\\n            <div class=\\"s-item\\">\\n              <img src={item.image} alt={item.name} loading=\\"lazy\\" />\\n              <div>\\n                <span class=\\"s-name\\">{item.name}</span>\\n                <span class=\\"s-var\\">{item.size} · {item.color} · ×{item.quantity}</span>\\n              </div>\\n              <span class=\\"s-price\\">{formatPrice(item.price * item.quantity)}</span>\\n            </div>\\n          {/each}\\n        </div>\\n        <div class=\\"lines\\">\\n          <div class=\\"line\\"><span>Subtotal</span><span>{formatPrice($subtotal)}</span></div>\\n          {#if $discount > 0}<div class=\\"line\\"><span>Discount</span><span>−{formatPrice($discount)}</span></div>{/if}\\n          <div class=\\"line\\"><span>Shipping</span><span>{$shipping === 0 ? 'Free' : formatPrice($shipping)}</span></div>\\n          <div class=\\"line\\"><span>Tax</span><span>{formatPrice($tax)}</span></div>\\n          <div class=\\"line total\\"><span>Total</span><span>{formatPrice($total)}</span></div>\\n        </div>\\n      </aside>\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  .page { padding: var(--s-5) 0 var(--s-8); }\\n  h1 { margin: var(--s-5) 0 var(--s-6); }\\n  .layout { display: grid; grid-template-columns: 1fr 380px; gap: var(--s-6); align-items: flex-start; }\\n  .form { display: flex; flex-direction: column; gap: var(--s-5); }\\n  .block { display: flex; flex-direction: column; gap: var(--s-3); padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); }\\n  .block h2 { font-size: 1.0625rem; display: flex; align-items: center; gap: 10px; }\\n  .badge-test { font-size: 0.625rem; font-weight: 600; padding: 3px 8px; border-radius: var(--r-full); background: rgba(56,189,248,0.12); color: var(--primary); border: 1px solid rgba(56,189,248,0.25); text-transform: uppercase; letter-spacing: 0.04em; }\\n  .hint { font-size: 0.75rem; color: var(--text-subtle); margin-top: -4px; }\\n  .hint code { font-family: monospace; color: var(--text-muted); background: var(--bg); padding: 1px 5px; border-radius: 4px; border: 1px solid var(--border); }\\n  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); }\\n  .field { display: flex; flex-direction: column; gap: 6px; }\\n  .field-label { font-size: 0.8125rem; font-weight: 500; color: var(--text-muted); }\\n  .field-input { width: 100%; height: 44px; padding: 0 14px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); }\\n  .field-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }\\n\\n  .summary { position: sticky; top: 80px; padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); display: flex; flex-direction: column; gap: var(--s-4); }\\n  .summary h2 { font-size: 1.0625rem; }\\n  .items { display: flex; flex-direction: column; gap: 10px; }\\n  .s-item { display: flex; align-items: center; gap: 10px; }\\n  .s-item img { width: 48px; height: 48px; object-fit: cover; border-radius: var(--r-sm); border: 1px solid var(--border); }\\n  .s-item > div { flex: 1; display: flex; flex-direction: column; }\\n  .s-name { font-size: 0.8125rem; font-weight: 600; }\\n  .s-var { font-size: 0.75rem; color: var(--text-subtle); }\\n  .s-price { font-size: 0.8125rem; font-weight: 600; }\\n  .lines { display: flex; flex-direction: column; gap: 8px; padding-top: var(--s-3); border-top: 1px solid var(--border); }\\n  .line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }\\n  .line.total { font-size: 1.0625rem; font-weight: 700; color: var(--text); font-family: var(--font-display); padding-top: 8px; border-top: 1px solid var(--border); }\\n\\n  @media (max-width: 820px) {\\n    .layout { grid-template-columns: 1fr; }\\n    .summary { position: static; order: -1; }\\n    .grid-2 { grid-template-columns: 1fr; }\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Checkout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  let $subtotal, $$unsubscribe_subtotal;
  let $discount, $$unsubscribe_discount;
  let $shipping, $$unsubscribe_shipping;
  let $tax, $$unsubscribe_tax;
  let $total, $$unsubscribe_total;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_subtotal = subscribe(subtotal, (value) => $subtotal = value);
  $$unsubscribe_discount = subscribe(discount, (value) => $discount = value);
  $$unsubscribe_shipping = subscribe(shipping, (value) => $shipping = value);
  $$unsubscribe_tax = subscribe(tax, (value) => $tax = value);
  $$unsubscribe_total = subscribe(total, (value) => $total = value);
  let fullName = "";
  let email = "";
  let address = "";
  let city = "";
  let state = "";
  let zip = "";
  let card = "4242 4242 4242 4242";
  let exp = "12/34";
  let cvc = "123";
  let errors = {};
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container page svelte-c70mt3">${validate_component(Breadcrumb, "Breadcrumb").$$render(
      $$result,
      {
        items: [
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", current: true }
        ]
      },
      {},
      {}
    )} <h1 class="svelte-c70mt3" data-svelte-h="svelte-1dugfhc">Checkout</h1> ${$cart.length === 0 ? `${validate_component(EmptyState, "EmptyState").$$render(
      $$result,
      {
        title: "Your cart is empty",
        description: "Add items before checking out.",
        actionLabel: "Shop now",
        onAction: () => navigate()
      },
      {},
      {}
    )}` : `<div class="layout svelte-c70mt3"><form class="form svelte-c70mt3"><section class="block svelte-c70mt3"><h2 class="svelte-c70mt3" data-svelte-h="svelte-15aku2o">Customer information</h2> <div class="grid-2 svelte-c70mt3">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Full name",
        required: true,
        autocomplete: "name",
        error: errors.fullName,
        value: fullName
      },
      {
        value: ($$value) => {
          fullName = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Email",
        type: "email",
        required: true,
        autocomplete: "email",
        error: errors.email,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></section> <section class="block svelte-c70mt3"><h2 class="svelte-c70mt3" data-svelte-h="svelte-acl1s">Shipping address</h2> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Street address",
        required: true,
        autocomplete: "street-address",
        error: errors.address,
        value: address
      },
      {
        value: ($$value) => {
          address = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="grid-2 svelte-c70mt3">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "City",
        required: true,
        autocomplete: "address-level2",
        error: errors.city,
        value: city
      },
      {
        value: ($$value) => {
          city = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "State / Region",
        required: true,
        autocomplete: "address-level1",
        error: errors.state,
        value: state
      },
      {
        value: ($$value) => {
          state = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid-2 svelte-c70mt3">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "ZIP / Postal code",
        required: true,
        autocomplete: "postal-code",
        error: errors.zip,
        value: zip
      },
      {
        value: ($$value) => {
          zip = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="field svelte-c70mt3"><label for="country" class="field-label svelte-c70mt3" data-svelte-h="svelte-1k5h2u6">Country</label> <select id="country" class="field-input svelte-c70mt3"><option value="United States" data-svelte-h="svelte-bmgup7">United States</option><option value="Canada" data-svelte-h="svelte-dct5qi">Canada</option><option value="United Kingdom" data-svelte-h="svelte-2788w2">United Kingdom</option><option value="Germany" data-svelte-h="svelte-1arr0kt">Germany</option><option value="India" data-svelte-h="svelte-1oevjav">India</option><option value="Australia" data-svelte-h="svelte-1wzotq0">Australia</option></select></div></div></section> <section class="block svelte-c70mt3"><h2 class="svelte-c70mt3" data-svelte-h="svelte-16nxwvg">Payment <span class="badge-test svelte-c70mt3">Stripe test mode</span></h2> <p class="hint svelte-c70mt3" data-svelte-h="svelte-bdoybv">Use card <code class="svelte-c70mt3">4242 4242 4242 4242</code>, any future date, any CVC. No real charge is made.</p> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Card number",
        required: true,
        autocomplete: "cc-number",
        error: errors.card,
        value: card
      },
      {
        value: ($$value) => {
          card = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="grid-2 svelte-c70mt3">${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "Expiry (MM/YY)",
        required: true,
        autocomplete: "cc-exp",
        error: errors.exp,
        value: exp
      },
      {
        value: ($$value) => {
          exp = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        label: "CVC",
        required: true,
        autocomplete: "cc-csc",
        error: errors.cvc,
        maxlength: 4,
        value: cvc
      },
      {
        value: ($$value) => {
          cvc = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></section> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        variant: "primary",
        size: "lg",
        block: true
      },
      {},
      {
        default: () => {
          return `Continue to verification`;
        }
      }
    )}</form> <aside class="summary svelte-c70mt3"><h2 class="svelte-c70mt3" data-svelte-h="svelte-1xtm29y">Order summary</h2> <div class="items svelte-c70mt3">${each($cart, (item) => {
      return `<div class="s-item svelte-c70mt3"><img${add_attribute("src", item.image, 0)}${add_attribute("alt", item.name, 0)} loading="lazy" class="svelte-c70mt3"> <div class="svelte-c70mt3"><span class="s-name svelte-c70mt3">${escape(item.name)}</span> <span class="s-var svelte-c70mt3">${escape(item.size)} · ${escape(item.color)} · ×${escape(item.quantity)}</span></div> <span class="s-price svelte-c70mt3">${escape(formatPrice(item.price * item.quantity))}</span> </div>`;
    })}</div> <div class="lines svelte-c70mt3"><div class="line svelte-c70mt3"><span data-svelte-h="svelte-3vhy5m">Subtotal</span><span>${escape(formatPrice($subtotal))}</span></div> ${$discount > 0 ? `<div class="line svelte-c70mt3"><span data-svelte-h="svelte-1m3tn9l">Discount</span><span>−${escape(formatPrice($discount))}</span></div>` : ``} <div class="line svelte-c70mt3"><span data-svelte-h="svelte-46xjjc">Shipping</span><span>${escape($shipping === 0 ? "Free" : formatPrice($shipping))}</span></div> <div class="line svelte-c70mt3"><span data-svelte-h="svelte-1kt0mix">Tax</span><span>${escape(formatPrice($tax))}</span></div> <div class="line total svelte-c70mt3"><span data-svelte-h="svelte-2fqrek">Total</span><span>${escape(formatPrice($total))}</span></div></div></aside></div>`} </div>`;
  } while (!$$settled);
  $$unsubscribe_cart();
  $$unsubscribe_subtotal();
  $$unsubscribe_discount();
  $$unsubscribe_shipping();
  $$unsubscribe_tax();
  $$unsubscribe_total();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Checkout, "Checkout").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
