<script lang="ts">
  import { cartCount, cartOpen, mobileNavOpen } from '../stores';
  import { route } from '../router';
  import { onMount } from 'svelte';

  let scrolled = false;
  onMount(() => {
    const onScroll = () => (scrolled = window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<header class="nav" class:scrolled>
  <div class="nav-inner">
    <div class="left">
      <button class="menu-btn" on:click={() => mobileNavOpen.set(true)} aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <a href="/" class="brand" aria-label="ML Club home">
        <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <defs>
            <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#6366f1"/>
              <stop offset="100%" stop-color="#8b5cf6"/>
            </linearGradient>
          </defs>
          <path d="M8 22V10l5 7 5-7v12" fill="none" stroke="url(#brand-grad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="23" cy="11" r="2.6" fill="url(#brand-grad)"/>
        </svg>
        <span class="brand-text">ML<span class="brand-accent">Club</span></span>
      </a>
    </div>

    <nav class="links" aria-label="Primary">
      <a href="/" class:active={$route.name === 'home'}>Home</a>
      <a href="/products" class:active={$route.name === 'products'}>Shop</a>
      <a href="/products?category=apparel">Apparel</a>
      <a href="/products?category=accessories">Accessories</a>
      <a href="/orders" class:active={$route.name === 'orders'}>Orders</a>
    </nav>

    <div class="right">
      <a href="/products" class="icon-btn" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </a>
      <button class="icon-btn cart-btn" on:click={() => cartOpen.set(true)} aria-label={`Cart with ${$cartCount} items`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        {#if $cartCount > 0}
          <span class="cart-count">{$cartCount}</span>
        {/if}
      </button>
    </div>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 100;
    transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease), backdrop-filter var(--dur) var(--ease);
    border-bottom: 1px solid transparent;
  }
  .nav.scrolled {
    background: rgba(8, 8, 12, 0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom-color: var(--border);
  }
  .nav-inner {
    max-width: 1240px; margin: 0 auto;
    height: 64px; padding: 0 var(--s-5);
    display: flex; align-items: center; justify-content: space-between; gap: var(--s-5);
  }
  .left { display: flex; align-items: center; gap: 12px; }
  .menu-btn { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; color: var(--text-muted); border-radius: var(--r-sm); transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .menu-btn:hover { background: var(--bg-surface); color: var(--text); }
  .menu-btn svg { width: 20px; height: 20px; }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-mark { width: 28px; height: 28px; }
  .brand-text { font-family: var(--font-display); font-weight: 800; font-size: 1.0625rem; letter-spacing: -0.03em; color: var(--text); }
  .brand-accent { background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

  .links { display: flex; align-items: center; gap: 2px; }
  .links a {
    padding: 8px 14px; font-size: 0.875rem; font-weight: 500; color: var(--text-muted);
    border-radius: var(--r-sm); transition: color var(--dur) var(--ease), background var(--dur) var(--ease);
  }
  .links a:hover { color: var(--text); background: var(--bg-surface); }
  .links a.active { color: var(--text); }

  .right { display: flex; align-items: center; gap: 4px; }
  .icon-btn {
    position: relative; width: 40px; height: 40px;
    display: grid; place-items: center;
    color: var(--text-muted); border-radius: var(--r-sm);
    transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
  }
  .icon-btn:hover { background: var(--bg-surface); color: var(--text); }
  .icon-btn svg { width: 20px; height: 20px; }
  .cart-count {
    position: absolute; top: 4px; right: 4px;
    min-width: 18px; height: 18px; padding: 0 5px;
    background: var(--grad-primary); color: #fff;
    font-size: 0.625rem; font-weight: 700;
    border-radius: var(--r-full);
    display: grid; place-items: center;
    border: 2px solid var(--bg);
  }

  @media (max-width: 820px) {
    .menu-btn { display: flex; }
    .links { display: none; }
  }
</style>
