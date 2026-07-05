<script lang="ts">
  import { cart, removeFromCart, updateQty, subtotal, shipping, tax, total, discount, coupon, applyCoupon, removeCoupon, toast, navigate } from '../stores';
  import { formatPrice } from '../format';
  import Button from '../components/Button.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import EmptyState from '../components/EmptyState.svelte';

  let code = '';
  let couponMsg = '';

  function tryApply() {
    const r = applyCoupon(code);
    couponMsg = r.message;
    if (r.ok) { toast(r.message, 'success'); code = ''; } else { toast(r.message, 'error'); }
  }
</script>

<div class="container page">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart', current: true }]} />
  <h1>Cart</h1>

  {#if $cart.length === 0}
    <EmptyState title="Your cart is empty" description="Looks like you haven't added anything yet." actionLabel="Start shopping" onAction={() => navigate('/products')} />
  {:else}
    <div class="layout">
      <div class="items">
        {#each $cart as item (item.productId + item.size + item.color)}
          <div class="item">
            <img src={item.image} alt={item.name} loading="lazy" />
            <div class="meta">
              <div class="top">
                <a href={`#/product/${item.slug}`} on:click|preventDefault={() => navigate(`/product/${item.slug}`)} class="name">{item.name}</a>
                <button class="rm" on:click={() => removeFromCart(item.productId, item.size, item.color)} aria-label={`Remove ${item.name}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                </button>
              </div>
              <span class="variant">{item.size} · {item.color}</span>
              <div class="bottom">
                <div class="qty">
                  <button on:click={() => updateQty(item.productId, item.size, item.color, item.quantity - 1)} aria-label="Decrease">−</button>
                  <span>{item.quantity}</span>
                  <button on:click={() => updateQty(item.productId, item.size, item.color, item.quantity + 1)} disabled={item.quantity >= item.maxStock} aria-label="Increase">+</button>
                </div>
                <span class="price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <aside class="summary">
        <h2>Order summary</h2>
        <div class="coupon">
          {#if $coupon}
            <div class="coupon-applied">
              <span>Coupon {$coupon.code}</span>
              <button on:click={() => { removeCoupon(); couponMsg = ''; toast('Coupon removed', 'info'); }} aria-label="Remove coupon">×</button>
            </div>
          {:else}
            <input type="text" placeholder="Coupon code" bind:value={code} aria-label="Coupon code" />
            <Button variant="secondary" size="sm" on:click={tryApply}>Apply</Button>
          {/if}
        </div>
        {#if couponMsg && !$coupon}<p class="coupon-msg">{couponMsg}</p>{/if}
        <p class="hint">Try <code>MLCLUB10</code> or <code>FREESHIP</code></p>

        <div class="lines">
          <div class="line"><span>Subtotal</span><span>{formatPrice($subtotal)}</span></div>
          {#if $discount > 0}<div class="line"><span>Discount</span><span>−{formatPrice($discount)}</span></div>{/if}
          <div class="line"><span>Shipping</span><span>{$shipping === 0 ? 'Free' : formatPrice($shipping)}</span></div>
          <div class="line"><span>Tax (8%)</span><span>{formatPrice($tax)}</span></div>
          <div class="line total"><span>Total</span><span>{formatPrice($total)}</span></div>
        </div>
        <Button variant="primary" size="lg" block on:click={() => navigate('/checkout')}>Checkout</Button>
        <Button variant="ghost" block on:click={() => navigate('/products')}>Continue shopping</Button>
      </aside>
    </div>
  {/if}
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  h1 { margin: var(--s-5) 0 var(--s-6); }
  .layout { display: grid; grid-template-columns: 1fr 360px; gap: var(--s-6); align-items: flex-start; }
  .items { display: flex; flex-direction: column; gap: var(--s-3); }
  .item { display: flex; gap: var(--s-4); padding: var(--s-4); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .item img { width: 96px; height: 96px; object-fit: cover; border-radius: var(--r-md); border: 1px solid var(--border); }
  .meta { flex: 1; display: flex; flex-direction: column; gap: 6px; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .name { font-size: 0.9375rem; font-weight: 600; }
  .name:hover { color: var(--primary); }
  .rm { color: var(--text-subtle); padding: 4px; border-radius: var(--r-sm); transition: color var(--dur) var(--ease), background var(--dur) var(--ease); }
  .rm:hover { color: var(--error); background: rgba(239,68,68,0.08); }
  .rm svg { width: 18px; height: 18px; }
  .variant { font-size: 0.8125rem; color: var(--text-subtle); }
  .bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
  .qty { display: inline-flex; align-items: center; border: 1px solid var(--border); border-radius: var(--r-full); overflow: hidden; }
  .qty button { width: 32px; height: 32px; display: grid; place-items: center; color: var(--text-muted); transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .qty button:hover:not(:disabled) { background: var(--bg-surface-2); color: var(--text); }
  .qty button:disabled { opacity: 0.4; cursor: not-allowed; }
  .qty span { min-width: 32px; text-align: center; font-size: 0.875rem; font-weight: 600; }
  .price { font-family: var(--font-display); font-weight: 700; font-size: 1rem; }

  .summary { position: sticky; top: 80px; padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); display: flex; flex-direction: column; gap: var(--s-4); }
  .summary h2 { font-size: 1.0625rem; }
  .coupon { display: flex; gap: 8px; }
  .coupon input { flex: 1; height: 38px; padding: 0 12px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-sm); color: var(--text); }
  .coupon input:focus { outline: none; border-color: var(--primary); }
  .coupon-applied { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 8px 12px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: var(--r-sm); font-size: 0.8125rem; color: var(--accent); }
  .coupon-applied button { color: var(--accent); font-size: 1.125rem; line-height: 1; }
  .coupon-msg { font-size: 0.75rem; color: var(--error); }
  .hint { font-size: 0.75rem; color: var(--text-subtle); }
  .hint code { font-family: var(--font-mono, monospace); color: var(--text-muted); background: var(--bg); padding: 1px 5px; border-radius: 4px; border: 1px solid var(--border); }
  .lines { display: flex; flex-direction: column; gap: 10px; padding: var(--s-4) 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }
  .line.total { font-size: 1.0625rem; font-weight: 700; color: var(--text); font-family: var(--font-display); }

  @media (max-width: 820px) {
    .layout { grid-template-columns: 1fr; }
    .summary { position: static; }
  }
</style>
