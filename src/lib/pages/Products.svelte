<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchProducts, categories } from '../data';
  import type { Product } from '../types';
  import { navigate, route } from '../router';
  import ProductGrid from '../components/ProductGrid.svelte';
  import Pagination from '../components/Pagination.svelte';
  import EmptyState from '../components/EmptyState.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import Skeleton from '../components/Skeleton.svelte';

  let search = '';
  let selectedCat: string | null = null;
  let sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' = 'featured';
  let page = 1;
  const perPage = 8;
  let allProducts: Product[] = [];
  let loading = true;

  $: if ($route.name === 'products' && $route.params) {
    selectedCat = $route.params.category ?? null;
    search = $route.params.q ?? '';
    page = 1;
  }

  onMount(async () => {
    try {
      allProducts = await fetchProducts();
    } catch (e) {
      console.error('Failed to load products', e);
    } finally {
      loading = false;
    }
  });

  $: filtered = (() => {
    let list = [...allProducts];
    if (selectedCat) list = list.filter((p) => p.category === selectedCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  })();

  $: pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  $: paged = filtered.slice((page - 1) * perPage, page * perPage);

  function setCat(slug: string | null) {
    selectedCat = slug;
    page = 1;
    navigate(slug ? `/products?category=${slug}` : '/products');
  }
  function onSearch(e: Event) {
    search = (e.target as HTMLInputElement).value;
    page = 1;
  }
</script>

<div class="container page">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop', current: true }]} />
  <div class="head">
    <div>
      <span class="eyebrow">Shop</span>
      <h1>{selectedCat ? categories.find((c) => c.slug === selectedCat)?.name : 'All products'}</h1>
      <p>{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</p>
    </div>
    <div class="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <input type="search" placeholder="Search products…" value={search} on:input={onSearch} aria-label="Search products" />
    </div>
  </div>

  <div class="layout">
    <aside class="filters">
      <h3>Category</h3>
      <ul>
        <li><button class:active={!selectedCat} on:click={() => setCat(null)}>All</button></li>
        {#each categories as c}
          <li><button class:active={selectedCat === c.slug} on:click={() => setCat(c.slug)}>{c.name}</button></li>
        {/each}
      </ul>
    </aside>

    <div class="main">
      <div class="toolbar">
        <label class="sort">
          <span>Sort</span>
          <select bind:value={sort} aria-label="Sort by">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      {#if loading}
        <Skeleton count={6} />
      {:else if paged.length === 0}
        <EmptyState title="No products found" description="Try a different search or category." actionLabel="Clear filters" onAction={() => { search = ''; setCat(null); }} />
      {:else}
        <ProductGrid products={paged} columns={3} />
        <div class="pagi"><Pagination count={pageCount} current={page} onChange={(p) => (page = p)} /></div>
      {/if}
    </div>
  </div>
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--s-4); margin: var(--s-5) 0 var(--s-6); flex-wrap: wrap; }
  .head h1 { margin-top: 6px; }
  .head p { font-size: 0.875rem; color: var(--text-subtle); margin-top: 4px; }
  .search { position: relative; min-width: 260px; }
  .search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--text-subtle); }
  .search input { width: 100%; height: 44px; padding: 0 14px 0 42px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); }
  .search input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }

  .layout { display: grid; grid-template-columns: 220px 1fr; gap: var(--s-6); align-items: flex-start; }
  .filters { position: sticky; top: 80px; }
  .filters h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-subtle); margin-bottom: var(--s-3); }
  .filters ul { display: flex; flex-direction: column; gap: 2px; }
  .filters button { width: 100%; text-align: left; padding: 9px 12px; border-radius: var(--r-sm); font-size: 0.875rem; color: var(--text-muted); transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .filters button:hover { background: var(--bg-surface); color: var(--text); }
  .filters button.active { background: var(--bg-surface-2); color: var(--text); font-weight: 600; }

  .toolbar { display: flex; justify-content: flex-end; margin-bottom: var(--s-4); }
  .sort { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--text-muted); }
  .sort select { height: 38px; padding: 0 12px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-sm); color: var(--text); }
  .sort select:focus { outline: none; border-color: var(--primary); }
  .pagi { margin-top: var(--s-6); }

  @media (max-width: 820px) {
    .layout { grid-template-columns: 1fr; }
    .filters { position: static; }
    .filters ul { flex-direction: row; flex-wrap: wrap; gap: 6px; }
    .filters button { width: auto; }
  }
</style>
