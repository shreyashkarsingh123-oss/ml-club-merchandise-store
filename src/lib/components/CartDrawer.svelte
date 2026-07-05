<script lang="ts">
  import Drawer from './Drawer.svelte';
  import Button from './Button.svelte';
  import { cart, cartOpen, removeFromCart, updateQty, subtotal, shipping, total, toast } from '../stores';
  import { formatPrice } from '../format';

  function close() { cartOpen.set(false); }
</script>

<Drawer open={$cartOpen} title={`Cart · ${$cart.length}`} onClose={close}>
  {#if $cart.length === 0}
    <div class="empty">
      <p>Your cart is empty.</p>
      <a href="/products" on:click={close}><Button variant="secondary" size="sm">Browse products</Button></a>
    </div>
  {:else}
    <div class="items">
      {#each $cart as item (item.productId + item.size + item.color)}
        <div class="item">
          <img src={item.image} alt={item.name} loading="lazy" />
          <div class="meta">
            <div class="row">
              <a href={`/product/${item.slug}`} class="name" on:click={close}>{item.name}</a>
              <button class="rm" on:click={() => removeFromCart(item.productId, item.size, item.color)} aria-label={`Remove ${item.name}`}>×</button>
            </div>
            <span class="variant">{item.size} · {item.color}</span>
            <div class="qty-row">
              <div class="qty">
                <button on:click={() => updateQty(item.productId, item.size, item.color, item.quantity - 1)} aria-label="Decrease">−</button>
                <span>{item.quantity}</span>
                <button on:click={() => updateQty(item.productId, item.size, item.color, item.quantity + 1)} aria-label="Increase" disabled={item.quantity >= item.maxStock}>+</button>
              </div>
              <span class="price">{formatPrice(item.price * item.quantity)}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="summary">
      <div class="line"><span>Subtotal</span><span>{formatPrice($subtotal)}</span></div>
      <div class="line"><span>Shipping</span><span>{$shipping === 0 ? 'Free' : formatPrice($shipping)}</span></div>
      <div class="line total"><span>Total</span><span>{formatPrice($total)}</span></div>
      <div class="actions">
        <a href="/cart" on:click={close}><Button variant="secondary" block>View cart</Button></a>
        <a href="/checkout" on:click={close}><Button variant="primary" block>Checkout</Button></a>
      </div>
    </div>
  {/if}
</Drawer>

<style>
  .empty { display: flex; flex-direction: column; align-items: center; gap: var(--s-4); padding: var(--s-7) 0; text-align: center; }
  .empty p { color: var(--text-muted); }
  .items { display: flex; flex-direction: column; gap: var(--s-4); }
  .item { display: flex; gap: 12px; }
  .item img { width: 72px; height: 72px; object-fit: cover; border-radius: var(--r-md); border: 1px solid var(--border); }
  .meta { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .name { font-size: 0.875rem; font-weight: 600; }
  .name:hover { color: var(--primary); }
  .rm { color: var(--text-subtle); font-size: 1.25rem; line-height: 1; padding: 0 4px; transition: color var(--dur) var(--ease); }
  .rm:hover { color: var(--error); }
  .variant { font-size: 0.75rem; color: var(--text-subtle); }
  .qty-row { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
  .qty { display: inline-flex; align-items: center; border: 1px solid var(--border); border-radius: var(--r-full); overflow: hidden; }
  .qty button { width: 28px; height: 28px; display: grid; place-items: center; color: var(--text-muted); transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .qty button:hover:not(:disabled) { background: var(--bg-surface-2); color: var(--text); }
  .qty button:disabled { opacity: 0.4; cursor: not-allowed; }
  .qty span { min-width: 28px; text-align: center; font-size: 0.8125rem; font-weight: 600; }
  .price { font-size: 0.875rem; font-weight: 700; font-family: var(--font-display); }
  .summary { margin-top: var(--s-5); padding-top: var(--s-4); border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }
  .line.total { font-size: 1rem; font-weight: 700; color: var(--text); font-family: var(--font-display); padding-top: 8px; border-top: 1px solid var(--border); }
  .actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
  .actions a { display: block; }
</style>
