<script lang="ts">
  import { navigate } from '../router';
  import { mobileNavOpen } from '../stores';
  import { fade, fly } from 'svelte/transition';

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/products' },
    { label: 'Apparel', href: '/products?category=apparel' },
    { label: 'Accessories', href: '/products?category=accessories' },
    { label: 'Collectibles', href: '/products?category=collectibles' },
    { label: 'Stationery', href: '/products?category=stationery' },
    { label: 'My Orders', href: '/orders' },
  ];

  function go(href: string) {
    mobileNavOpen.set(false);
    navigate(href);
  }
</script>

{#if $mobileNavOpen}
  <div class="overlay" on:click={() => mobileNavOpen.set(false)} transition:fade={{ duration: 180 }} role="presentation">
    <aside class="panel" transition:fly={{ x: -320, duration: 240 }} on:click|stopPropagation role="dialog" aria-modal="true" aria-label="Menu">
      <div class="head">
        <span class="brand">ML<span class="accent">Club</span></span>
        <button class="close" on:click={() => mobileNavOpen.set(false)} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <nav class="m-links" aria-label="Mobile">
        {#each links as l}
          <a href={l.href} on:click={() => mobileNavOpen.set(false)}>{l.label}</a>
        {/each}
      </nav>
      <div class="foot">
        <p>© 2026 ML Club</p>
      </div>
    </aside>
  </div>
{/if}

<style>
  .overlay { position: fixed; inset: 0; z-index: 130; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); }
  .panel {
    position: fixed; top: 0; left: 0; bottom: 0; width: 84%; max-width: 320px;
    background: var(--bg-elevated); border-right: 1px solid var(--border);
    display: flex; flex-direction: column; box-shadow: var(--shadow-lg);
  }
  .head { display: flex; align-items: center; justify-content: space-between; padding: var(--s-4) var(--s-5); border-bottom: 1px solid var(--border); }
  .brand { font-family: var(--font-display); font-weight: 800; font-size: 1.0625rem; }
  .accent { color: var(--primary); }
  .close { width: 36px; height: 36px; display: grid; place-items: center; color: var(--text-muted); border-radius: var(--r-sm); }
  .close svg { width: 20px; height: 20px; }
  .m-links { display: flex; flex-direction: column; padding: var(--s-3); gap: 2px; flex: 1; }
  .m-links a {
    padding: 12px 14px; border-radius: var(--r-md); font-size: 0.9375rem; font-weight: 500;
    color: var(--text-muted); transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
  }
  .m-links a:hover { background: var(--bg-surface); color: var(--text); }
  .foot { padding: var(--s-4) var(--s-5); border-top: 1px solid var(--border); }
  .foot p { font-size: 0.75rem; color: var(--text-subtle); }
</style>
