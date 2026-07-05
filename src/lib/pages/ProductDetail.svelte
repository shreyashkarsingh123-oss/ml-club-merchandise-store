<script lang="ts">
  import { fetchProduct, getRelated } from '../data';
  import type { Product } from '../types';
  import { navigate, route } from '../router';
  import { addToCart, cartOpen, toast } from '../stores';
  import { formatPrice } from '../format';
  import Button from '../components/Button.svelte';
  import Badge from '../components/Badge.svelte';
  import Rating from '../components/Rating.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import ProductGrid from '../components/ProductGrid.svelte';
  import EmptyState from '../components/EmptyState.svelte';
  import Spinner from '../components/Spinner.svelte';

  let slug = '';
  let activeImg = 0;
  let size = '';
  let color = '';
  let qty = 1;
  let product: Product | null = null;
  let related: Product[] = [];
  let loading = true;

  $: if ($route.name === 'product' && $route.params.slug !== slug) {
    slug = $route.params.slug;
    activeImg = 0;
    loading = true;
    loadProduct(slug);
  }

  async function loadProduct(s: string) {
    try {
      const p = await fetchProduct(s);
      product = p;
      if (p) {
        size = p.sizes[0] ?? '';
        color = p.colors[0]?.name ?? '';
        qty = 1;
        related = await getRelated(p);
      }
    } catch (e) {
      console.error('Failed to load product', e);
    } finally {
      loading = false;
    }
  }

  function add() {
    if (!product) return;
    if (product.stock <= 0) { toast('Out of stock.', 'error'); return; }
    addToCart({
      productId: product.id, slug: product.slug, name: product.name,
      price: product.price, image: product.images[0],
      size, color, maxStock: product.stock,
    }, qty);
    toast(`${product.name} added to cart`, 'success');
    cartOpen.set(true);
  }
  function buyNow() {
    add();
    navigate('/checkout');
  }
</script>

{#if loading}
  <div class="container page"><div class="loading-wrap"><Spinner size="lg" /></div></div>
{:else if !product}
  <div class="container"><EmptyState title="Product not found" description="This item may have sold out or moved." actionLabel="Back to shop" onAction={() => navigate('/products')} /></div>
{:else}
  {@const p = product}
  <div class="container page">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/products' }, { label: p.name, current: true }]} />

    <div class="detail">
      <div class="gallery">
        <div class="main-img">
          <img src={p.images[activeImg]} alt={p.name} />
          <div class="badges">
            {#if p.bestSeller}<Badge variant="warning">Best Seller</Badge>{/if}
            {#if p.compareAt}<Badge variant="error">Save {Math.round((1 - p.price / p.compareAt) * 100)}%</Badge>{/if}
          </div>
        </div>
        <div class="thumbs">
          {#each p.images as img, i}
            <button class:active={i === activeImg} on:click={() => (activeImg = i)} aria-label={`View image ${i + 1}`}>
              <img src={img} alt="" loading="lazy" />
            </button>
          {/each}
        </div>
      </div>

      <div class="info">
        <span class="eyebrow">{p.category}</span>
        <h1>{p.name}</h1>
        <div class="rating-row">
          <Rating rating={p.rating} size="md" />
          <span class="reviews">{p.reviewCount} reviews</span>
        </div>

        <div class="price-row">
          <span class="price">{formatPrice(p.price)}</span>
          {#if p.compareAt}<span class="compare">{formatPrice(p.compareAt)}</span>{/if}
        </div>

        <p class="desc">{p.description}</p>

        <div class="opt">
          <div class="opt-row">
            <span class="opt-label">Size</span>
            <div class="chips">
              {#each p.sizes as s}
                <button class="chip" class:active={size === s} on:click={() => (size = s)} disabled={p.stock === 0}>{s}</button>
              {/each}
            </div>
          </div>
          <div class="opt-row">
            <span class="opt-label">Color</span>
            <div class="chips">
              {#each p.colors as c}
                <button class="chip color-chip" class:active={color === c.name} on:click={() => (color = c.name)} disabled={p.stock === 0} aria-label={c.name}>
                  <span class="swatch" style={`background:${c.hex}`}></span>
                  {c.name}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <div class="stock-row">
          {#if p.stock > 20}
            <span class="stock ok">In stock</span>
          {:else if p.stock > 0}
            <span class="stock low">Only {p.stock} left</span>
          {:else}
            <span class="stock out">Sold out</span>
          {/if}
        </div>

        <div class="buy-row">
          <div class="qty">
            <button on:click={() => (qty = Math.max(1, qty - 1))} aria-label="Decrease quantity" disabled={p.stock === 0}>−</button>
            <span>{qty}</span>
            <button on:click={() => (qty = Math.min(p.stock, qty + 1))} aria-label="Increase quantity" disabled={p.stock === 0 || qty >= p.stock}>+</button>
          </div>
          <Button variant="primary" size="lg" block on:click={add} disabled={p.stock === 0}>Add to cart</Button>
        </div>
        <Button variant="secondary" size="lg" block on:click={buyNow} disabled={p.stock === 0}>Buy now</Button>

        <div class="specs">
          <h3>Specifications</h3>
          <dl>
            {#each Object.entries(p.specifications) as [k, v]}
              <div><dt>{k}</dt><dd>{v}</dd></div>
            {/each}
          </dl>
        </div>
      </div>
    </div>

    {#if related.length > 0}
      <section class="related">
        <h2>You may also like</h2>
        <ProductGrid products={related} columns={4} />
      </section>
    {/if}
  </div>
{/if}

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  .loading-wrap { display: flex; justify-content: center; padding: var(--s-9) 0; }
  .detail { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-7); margin: var(--s-5) 0 var(--s-8); }
  .gallery { position: sticky; top: 80px; align-self: flex-start; }
  .main-img { position: relative; aspect-ratio: 1 / 1; border-radius: var(--r-lg); overflow: hidden; border: 1px solid var(--border); background: var(--bg-surface); }
  .main-img img { width: 100%; height: 100%; object-fit: cover; }
  .badges { position: absolute; top: 14px; left: 14px; display: flex; flex-direction: column; gap: 6px; }
  .thumbs { display: flex; gap: 10px; margin-top: 10px; }
  .thumbs button { width: 72px; height: 72px; border-radius: var(--r-md); overflow: hidden; border: 2px solid transparent; background: var(--bg-surface); transition: border-color var(--dur) var(--ease); }
  .thumbs button.active { border-color: var(--primary); }
  .thumbs img { width: 100%; height: 100%; object-fit: cover; }

  .info { display: flex; flex-direction: column; gap: var(--s-4); }
  .info h1 { font-size: clamp(1.75rem, 3vw, 2.25rem); }
  .rating-row { display: flex; align-items: center; gap: 10px; }
  .reviews { font-size: 0.8125rem; color: var(--text-subtle); }
  .price-row { display: flex; align-items: baseline; gap: 10px; }
  .price { font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; }
  .compare { font-size: 1rem; color: var(--text-subtle); text-decoration: line-through; }
  .desc { font-size: 0.9375rem; line-height: 1.65; }

  .opt { display: flex; flex-direction: column; gap: var(--s-4); padding: var(--s-4) 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .opt-row { display: flex; flex-direction: column; gap: 8px; }
  .opt-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 8px 14px; min-height: 38px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--bg-surface); color: var(--text-muted); font-size: 0.8125rem; font-weight: 500; transition: all var(--dur) var(--ease); display: inline-flex; align-items: center; gap: 6px; }
  .chip:hover:not(:disabled) { border-color: var(--border-strong); color: var(--text); }
  .chip.active { border-color: var(--primary); color: var(--text); background: rgba(56,189,248,0.08); }
  .chip:disabled { opacity: 0.4; cursor: not-allowed; }
  .swatch { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); }

  .stock-row { display: flex; }
  .stock { font-size: 0.8125rem; font-weight: 600; }
  .stock.ok { color: var(--success); }
  .stock.low { color: var(--warning); }
  .stock.out { color: var(--error); }

  .buy-row { display: flex; gap: 10px; }
  .qty { display: inline-flex; align-items: center; border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; height: 52px; }
  .qty button { width: 44px; height: 100%; display: grid; place-items: center; color: var(--text-muted); font-size: 1.25rem; transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .qty button:hover:not(:disabled) { background: var(--bg-surface-2); color: var(--text); }
  .qty button:disabled { opacity: 0.4; cursor: not-allowed; }
  .qty span { min-width: 44px; text-align: center; font-weight: 600; }

  .specs { margin-top: var(--s-3); }
  .specs h3 { font-size: 1rem; margin-bottom: var(--s-3); }
  .specs dl { display: flex; flex-direction: column; }
  .specs dl > div { display: grid; grid-template-columns: 140px 1fr; gap: var(--s-3); padding: 10px 0; border-top: 1px solid var(--border); }
  .specs dt { font-size: 0.8125rem; color: var(--text-subtle); }
  .specs dd { font-size: 0.875rem; color: var(--text); }

  .related { margin-top: var(--s-8); }
  .related h2 { margin-bottom: var(--s-5); }

  @media (max-width: 820px) {
    .detail { grid-template-columns: 1fr; gap: var(--s-5); }
    .gallery { position: static; }
    .buy-row { flex-direction: column; }
    .qty { width: 100%; justify-content: space-between; }
    .qty button { flex: 1; }
  }
</style>
