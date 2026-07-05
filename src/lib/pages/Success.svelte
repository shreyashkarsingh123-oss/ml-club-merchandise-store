<script lang="ts">
  import { route } from '../router';
  import { fetchOrder, navigate } from '../stores';
  import { formatPrice, formatDate } from '../format';
  import { onMount } from 'svelte';
  import Button from '../components/Button.svelte';
  import EmptyState from '../components/EmptyState.svelte';
  import Spinner from '../components/Spinner.svelte';
  import type { Order } from '../types';

  let id = '';
  let order: Order | null = null;
  let loading = true;

  $: if ($route.name === 'success') id = $route.params.id;

  onMount(async () => {
    if (id) {
      order = await fetchOrder(id);
      loading = false;
    }
  });
</script>

<div class="container page">
  {#if loading}
    <div class="loading-wrap"><Spinner size="lg" /></div>
  {:else if !order}
    <EmptyState title="Order not found" description="We couldn't find this order." actionLabel="Back to shop" onAction={() => navigate('/products')} />
  {:else}
    {@const o = order}
    <div class="success">
      <div class="check" aria-hidden="true">
        <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="26" cy="26" r="22"/><path d="M16 27l7 7 14-14"/></svg>
      </div>
      <span class="eyebrow">Order confirmed</span>
      <h1>Thank you for your order</h1>
      <p>A confirmation has been sent to <strong>{o.email}</strong>.</p>
      <div class="meta">
        <div><span>Order number</span><strong>{o.number}</strong></div>
        <div><span>Date</span><strong>{formatDate(o.createdAt)}</strong></div>
        <div><span>Total</span><strong>{formatPrice(o.total)}</strong></div>
      </div>
      <div class="actions">
        <Button variant="primary" on:click={() => navigate(`/order/${o.id}`)}>View invoice</Button>
        <Button variant="secondary" on:click={() => navigate('/products')}>Continue shopping</Button>
      </div>
    </div>
  {/if}
</div>

<style>
  .page { padding: var(--s-7) 0 var(--s-8); }
  .loading-wrap { display: flex; justify-content: center; padding: var(--s-9) 0; }
  .success { max-width: 560px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--s-3); padding: var(--s-7); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .check { width: 72px; height: 72px; color: var(--success); animation: fade-in-scale var(--dur) var(--ease) both; }
  .check svg { width: 100%; height: 100%; }
  h1 { font-size: 1.75rem; }
  .success p { font-size: 0.9375rem; }
  .success strong { color: var(--text); }
  .meta { display: flex; gap: var(--s-6); margin: var(--s-4) 0; flex-wrap: wrap; justify-content: center; }
  .meta > div { display: flex; flex-direction: column; gap: 2px; }
  .meta span { font-size: 0.75rem; color: var(--text-subtle); }
  .meta strong { font-family: var(--font-display); font-size: 1rem; }
  .actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
