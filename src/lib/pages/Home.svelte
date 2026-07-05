<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from '../router';
  import { fetchProducts, categories, testimonials, faqs } from '../data';
  import type { Product } from '../types';
  import { formatPrice } from '../format';
  import { toast } from '../stores';
  import ProductGrid from '../components/ProductGrid.svelte';
  import Button from '../components/Button.svelte';
  import Rating from '../components/Rating.svelte';
  import Badge from '../components/Badge.svelte';

  let featured: Product[] = [];
  let bestSellers: Product[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const [feat, best] = await Promise.all([
        fetchProducts({ featured: true }),
        fetchProducts({ bestSeller: true }),
      ]);
      featured = feat.slice(0, 4);
      bestSellers = best.slice(0, 4);
    } catch (e) {
      console.error('Failed to load products', e);
    } finally {
      loading = false;
    }
  });

  let email = '';
  let openFaq: string | null = faqs[0]?.id ?? null;

  const icons: Record<string, string> = {
    shirt: 'M4 7l4-3 4 3 4-3 4 3v4l-3 1v9H7v-9L4 11z',
    sparkle: 'M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
    star: 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z',
    book: 'M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4z M20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z',
  };

  function subscribe(e: Event) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast('Please enter a valid email.', 'error');
      return;
    }
    toast('You are on the list. Welcome to the club.', 'success');
    email = '';
  }

  onMount(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="eyebrow">New season · 2026</span>
      <h1>Merch for the<br /><span class="gradient-accent">machine learning</span> community.</h1>
    </div>
    <div class="hero-actions">
      <Button variant="primary" size="lg" on:click={() => navigate('/products')}>Shop the collection</Button>
      <Button variant="outline" size="lg" on:click={() => navigate('/products?category=apparel')}>Browse apparel</Button>
    </div>
    <div class="hero-stats">
      <div><strong>12k+</strong><span>members</span></div>
      <div><strong>4.8★</strong><span>avg rating</span></div>
      <div><strong>30-day</strong><span>returns</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <span class="eyebrow">Featured</span>
        <h2>Hand-picked this week</h2>
      </div>
      <a href="#/products" on:click|preventDefault={() => navigate('/products')} class="see-all">View all →</a>
    </div>
    <div class="reveal"><ProductGrid products={featured} columns={4} /></div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Categories</span><h2>Shop by category</h2></div>
    <div class="cat-grid reveal">
      {#each categories as c}
        <a class="cat-card" href={`#/products?category=${c.slug}`} on:click|preventDefault={() => navigate(`/products?category=${c.slug}`)}>
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={icons[c.icon] || icons.star}/></svg>
          </div>
          <h3>{c.name}</h3>
          <p>{c.description}</p>
          <span class="cat-link">Explore →</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <div><span class="eyebrow">Best sellers</span><h2>Most loved by the club</h2></div>
      <a href="#/products" on:click|preventDefault={() => navigate('/products')} class="see-all">View all →</a>
    </div>
    <div class="reveal"><ProductGrid products={bestSellers} columns={4} /></div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Testimonials</span><h2>From the community</h2></div>
    <div class="testi-grid reveal">
      {#each testimonials as t}
        <figure class="testi">
          <Rating rating={t.rating} size="md" />
          <blockquote>“{t.quote}”</blockquote>
          <figcaption>
            <img src={t.avatar} alt={t.name} loading="lazy" />
            <div><span class="t-name">{t.name}</span><span class="t-role">{t.role}</span></div>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">FAQ</span><h2>Questions, answered</h2></div>
    <div class="faq reveal">
      {#each faqs as f}
        <div class="faq-item" class:open={openFaq === f.id}>
          <button class="faq-q" on:click={() => (openFaq = openFaq === f.id ? null : f.id)} aria-expanded={openFaq === f.id}>
            <span>{f.question}</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-a"><p>{f.answer}</p></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="news reveal">
      <div class="news-copy">
        <span class="eyebrow">Newsletter</span>
        <h2>Get early access to drops.</h2>
        <p>One email a month. New releases, restocks, and member-only discounts. No spam.</p>
      </div>
      <form class="news-form" on:submit={subscribe}>
        <input type="email" placeholder="you@lab.edu" bind:value={email} aria-label="Email address" required />
        <Button type="submit" variant="primary">Subscribe</Button>
      </form>
    </div>
  </div>
</section>

<style>
  .hero { position: relative; padding: var(--s-9) 0 var(--s-8); overflow: hidden; }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(60% 50% at 80% 0%, rgba(99,102,241,0.18), transparent 60%),
      radial-gradient(50% 40% at 10% 20%, rgba(139,92,246,0.12), transparent 60%);
    pointer-events: none;
  }
  .hero-inner { position: relative; display: flex; flex-direction: column; gap: var(--s-5); max-width: 760px; }
  .hero-copy { display: flex; flex-direction: column; gap: var(--s-4); }
  .hero-copy h1 { font-size: clamp(2.5rem, 6vw, 4.25rem); }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
  .hero-stats { display: flex; gap: var(--s-6); margin-top: var(--s-4); }
  .hero-stats div { display: flex; flex-direction: column; }
  .hero-stats strong { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; }
  .hero-stats span { font-size: 0.8125rem; color: var(--text-subtle); }

  .section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--s-4); margin-bottom: var(--s-6); }
  .section-head h2 { margin-top: 6px; }
  .see-all { font-size: 0.875rem; font-weight: 500; color: var(--primary); white-space: nowrap; }
  .see-all:hover { color: var(--primary-strong); }

  .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s-4); }
  .cat-card {
    display: flex; flex-direction: column; gap: 8px;
    padding: var(--s-5); background: var(--bg-surface);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease), background var(--dur) var(--ease);
  }
  .cat-card:hover { transform: translateY(-3px); border-color: var(--border-strong); background: var(--bg-surface-2); }
  .cat-icon { width: 44px; height: 44px; border-radius: var(--r-md); background: var(--bg-elevated); border: 1px solid var(--border); display: grid; place-items: center; color: var(--primary); }
  .cat-icon svg { width: 22px; height: 22px; }
  .cat-card h3 { font-size: 1.0625rem; }
  .cat-card p { font-size: 0.8125rem; flex: 1; }
  .cat-link { font-size: 0.8125rem; font-weight: 600; color: var(--primary); }

  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-4); }
  .testi {
    display: flex; flex-direction: column; gap: var(--s-3);
    padding: var(--s-5); background: var(--bg-surface);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .testi blockquote { font-size: 0.9375rem; color: var(--text); line-height: 1.6; flex: 1; }
  .testi figcaption { display: flex; align-items: center; gap: 10px; }
  .testi figcaption img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  .t-name { display: block; font-size: 0.875rem; font-weight: 600; }
  .t-role { display: block; font-size: 0.75rem; color: var(--text-subtle); }

  .faq { display: flex; flex-direction: column; gap: 8px; max-width: 760px; }
  .faq-item { border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; background: var(--bg-surface); }
  .faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: var(--s-3); padding: var(--s-4) var(--s-5); text-align: left; font-size: 0.9375rem; font-weight: 600; color: var(--text); }
  .chev { width: 18px; height: 18px; color: var(--text-muted); transition: transform var(--dur) var(--ease); flex-shrink: 0; }
  .faq-item.open .chev { transform: rotate(180deg); }
  .faq-a { max-height: 0; overflow: hidden; transition: max-height var(--dur) var(--ease); }
  .faq-item.open .faq-a { max-height: 200px; }
  .faq-a p { padding: 0 var(--s-5) var(--s-4); font-size: 0.875rem; }

  .news {
    display: flex; align-items: center; justify-content: space-between; gap: var(--s-6);
    padding: var(--s-7); border-radius: var(--r-xl);
    background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
    border: 1px solid var(--border);
  }
  .news-copy { max-width: 460px; display: flex; flex-direction: column; gap: 8px; }
  .news-copy h2 { margin-top: 4px; }
  .news-form { display: flex; gap: 8px; flex: 1; max-width: 420px; }
  .news-form input {
    flex: 1; height: 44px; padding: 0 14px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
  }
  .news-form input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }

  @media (max-width: 1024px) {
    .cat-grid { grid-template-columns: repeat(2, 1fr); }
    .testi-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .hero-stats { gap: var(--s-4); }
    .news { flex-direction: column; align-items: flex-start; }
    .news-form { width: 100%; max-width: none; }
  }
  @media (max-width: 480px) {
    .cat-grid { grid-template-columns: 1fr; }
    .hero-actions { flex-direction: column; align-items: stretch; }
  }
</style>
