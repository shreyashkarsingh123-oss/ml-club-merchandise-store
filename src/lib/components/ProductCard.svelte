<script lang="ts">
  import type { Product } from '../types';
  import { addToCart, cartOpen, toast } from '../stores';
  import { formatPrice } from '../format';
  import Rating from './Rating.svelte';
  import Badge from './Badge.svelte';

  export let product: Product;

  $: discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  function quickAdd(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart({
      productId: product.id, slug: product.slug, name: product.name,
      price: product.price, image: product.images[0],
      size: product.sizes[0], color: product.colors[0].name, maxStock: product.stock,
    });
    toast(`${product.name} added to cart`, 'success');
    cartOpen.set(true);
  }
</script>

<a class="card" href={`/product/${product.slug}`}>
  <div class="media">
    <img src={product.images[0]} alt={product.name} loading="lazy" />
    {#if product.images[1]}
      <img class="hover-img" src={product.images[1]} alt="" aria-hidden="true" loading="lazy" />
    {/if}
    <div class="badges">
      {#if product.bestSeller}<Badge variant="warning">Best Seller</Badge>{/if}
      {#if discount > 0}<Badge variant="error">-{discount}%</Badge>{/if}
      {#if product.stock < 20 && product.stock > 0}<Badge variant="new">Low stock</Badge>{/if}
      {#if product.stock === 0}<Badge variant="error">Sold out</Badge>{/if}
    </div>
    <button class="quick-add" on:click={quickAdd} disabled={product.stock === 0} aria-label={`Add ${product.name} to cart`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      <span>Add</span>
    </button>
  </div>
  <div class="info">
    <div class="top">
      <h3 class="name">{product.name}</h3>
      <Rating rating={product.rating} count={product.reviewCount} showCount />
    </div>
    <div class="price-row">
      <span class="price">{formatPrice(product.price)}</span>
      {#if product.compareAt}<span class="compare">{formatPrice(product.compareAt)}</span>{/if}
    </div>
  </div>
</a>

<style>
  .card {
    display: block;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    overflow: hidden;
    transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  }
  .card:hover { transform: translateY(-4px); border-color: var(--border-strong); box-shadow: var(--shadow-md); }
  .media { position: relative; aspect-ratio: 1 / 1; overflow: hidden; background: var(--bg-surface-2); }
  .media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease), opacity var(--dur) var(--ease); }
  .media .hover-img { position: absolute; inset: 0; opacity: 0; }
  .card:hover .media img { transform: scale(1.05); }
  .card:hover .media .hover-img { opacity: 1; }
  .badges { position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 6px; }
  .quick-add {
    position: absolute; bottom: 12px; right: 12px;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; height: 36px;
    background: var(--bg-elevated); color: var(--text);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-full);
    font-size: 0.8125rem; font-weight: 600;
    opacity: 0; transform: translateY(8px);
    transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease), background var(--dur) var(--ease), border-color var(--dur) var(--ease);
  }
  .card:hover .quick-add { opacity: 1; transform: translateY(0); }
  .quick-add:hover { background: var(--grad-primary); color: var(--primary-fg); border-color: transparent; }
  .quick-add:disabled { opacity: 0.4; cursor: not-allowed; }
  .quick-add svg { width: 14px; height: 14px; }
  .info { padding: var(--s-4); display: flex; flex-direction: column; gap: 8px; }
  .top { display: flex; flex-direction: column; gap: 4px; }
  .name { font-size: 0.9375rem; font-weight: 600; line-height: 1.3; }
  .price-row { display: flex; align-items: baseline; gap: 8px; }
  .price { font-size: 1rem; font-weight: 700; color: var(--text); font-family: var(--font-display); }
  .compare { font-size: 0.8125rem; color: var(--text-subtle); text-decoration: line-through; }

  @media (max-width: 600px) {
    .quick-add { opacity: 1; transform: none; }
  }
</style>
