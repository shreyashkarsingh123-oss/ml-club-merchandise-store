<script lang="ts">
  import { categories } from '../data';
</script>

<footer class="footer">
  <div class="container">
    <div class="grid">
      <div class="col brand-col">
        <a href="/" class="brand" aria-label="ML Club home">
          <svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="footer-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
            </defs>
            <path d="M8 22V10l5 7 5-7v12" fill="none" stroke="url(#footer-grad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="23" cy="11" r="2.6" fill="url(#footer-grad)"/>
          </svg>
          <span>ML<span class="accent">Club</span></span>
        </a>
        <p class="tag">Premium merchandise for the machine learning community.</p>
      </div>
      <div class="col">
        <h4>Shop</h4>
        {#each categories as c}
          <a href={`/products?category=${c.slug}`}>{c.name}</a>
        {/each}
      </div>
      <div class="col">
        <h4>Account</h4>
        <a href="/orders">Order History</a>
        <a href="/cart">Cart</a>
        <a href="/checkout">Checkout</a>
      </div>
      <div class="col">
        <h4>Support</h4>
        <a href="/products">Shipping</a>
        <a href="/products">Returns</a>
        <a href="/products">Contact</a>
      </div>
    </div>
    <div class="bottom">
      <p>© {new Date().getFullYear()} ML Club. All rights reserved.</p>
      <div class="socials">
        <a href="/products" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="/products" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--border); background: var(--bg-elevated); padding: var(--s-8) 0 var(--s-5); }
  .grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--s-6); }
  .brand-col { display: flex; flex-direction: column; gap: var(--s-3); }
  .brand { display: inline-flex; align-items: center; gap: 10px; }
  .mark { width: 28px; height: 28px; }
  .brand span { font-family: var(--font-display); font-weight: 800; font-size: 1.0625rem; color: var(--text); }
  .accent { background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .tag { font-size: 0.8125rem; color: var(--text-subtle); max-width: 280px; }
  .col h4 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-subtle); margin-bottom: var(--s-3); }
  .col a { display: block; padding: 4px 0; font-size: 0.8125rem; color: var(--text-muted); transition: color var(--dur) var(--ease); }
  .col a:hover { color: var(--text); }
  .bottom { display: flex; align-items: center; justify-content: space-between; margin-top: var(--s-7); padding-top: var(--s-5); border-top: 1px solid var(--border); }
  .bottom p { font-size: 0.75rem; color: var(--text-subtle); }
  .socials { display: flex; gap: 8px; }
  .socials a { width: 36px; height: 36px; display: grid; place-items: center; color: var(--text-subtle); border-radius: var(--r-sm); transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
  .socials a:hover { background: var(--bg-surface); color: var(--text); }
  .socials svg { width: 16px; height: 16px; }

  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr 1fr; gap: var(--s-5); }
    .brand-col { grid-column: 1 / -1; }
    .bottom { flex-direction: column; gap: var(--s-3); text-align: center; }
  }
</style>
