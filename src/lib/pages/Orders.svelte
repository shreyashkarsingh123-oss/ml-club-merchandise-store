<script lang="ts">
  import { orders, ordersLoading, fetchOrders, navigate } from '../stores';
  import { formatPrice, formatDate } from '../format';
  import { onMount } from 'svelte';
  import Button from '../components/Button.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import EmptyState from '../components/EmptyState.svelte';
  import Badge from '../components/Badge.svelte';
  import Skeleton from '../components/Skeleton.svelte';

  let search = '';
  let statusFilter: 'all' | 'paid' | 'pending' | 'cancelled' | 'failed' = 'all';

  onMount(() => { fetchOrders(); });

  $: filtered = [...$orders]
    .filter((o) => (statusFilter === 'all' ? true : o.status === statusFilter))
    .filter((o) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return o.number.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || (o.fullName || '').toLowerCase().includes(q);
    });

  function setStatus(s: string) {
    statusFilter = s as typeof statusFilter;
  }

  const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
    paid: 'success', pending: 'warning', cancelled: 'default', failed: 'error',
  };
</script>

<div class="container page">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Orders', current: true }]} />
  <div class="head">
    <div><h1>Your orders</h1><p>{$orders.length} total orders</p></div>
    <div class="search">
      <input type="search" placeholder="Search by order # or email" bind:value={search} aria-label="Search orders" />
    </div>
  </div>

  <div class="filters">
    {#each ['all', 'paid', 'pending', 'cancelled', 'failed'] as s}
      <button class:active={statusFilter === s} on:click={() => setStatus(s)}>{s[0].toUpperCase() + s.slice(1)}</button>
    {/each}
  </div>

  {#if $ordersLoading}
    <Skeleton count={3} />
  {:else if filtered.length === 0}
    <EmptyState title="No orders found" description={search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'You have not placed any orders yet.'} actionLabel="Start shopping" onAction={() => navigate('/products')} />
  {:else}
    <div class="list">
      {#each filtered as o (o.id)}
        <a class="row" href={`#/order/${o.id}`} on:click|preventDefault={() => navigate(`/order/${o.id}`)}>
          <div class="num">
            <span class="o-num">{o.number}</span>
            <span class="o-date">{formatDate(o.createdAt)}</span>
          </div>
          <div class="items-count">{o.items.length} {o.items.length === 1 ? 'item' : 'items'}</div>
          <div class="status"><Badge variant={statusVariant[o.status]}>{o.status}</Badge></div>
          <div class="o-total">{formatPrice(o.total)}</div>
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--s-4); margin: var(--s-5) 0 var(--s-4); flex-wrap: wrap; }
  .head p { font-size: 0.875rem; color: var(--text-subtle); margin-top: 4px; }
  .search input { width: 280px; max-width: 100%; height: 42px; padding: 0 14px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-md); color: var(--text); }
  .search input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(56,189,248,0.15); }
  .filters { display: flex; gap: 6px; margin-bottom: var(--s-5); flex-wrap: wrap; }
  .filters button { padding: 7px 14px; border-radius: var(--r-full); border: 1px solid var(--border); background: var(--bg-surface); color: var(--text-muted); font-size: 0.8125rem; font-weight: 500; transition: all var(--dur) var(--ease); }
  .filters button:hover { color: var(--text); border-color: var(--border-strong); }
  .filters button.active { background: var(--primary); color: var(--primary-fg); border-color: var(--primary); }
  .list { display: flex; flex-direction: column; gap: 8px; }
  .row { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 24px; align-items: center; gap: var(--s-3); padding: var(--s-4) var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-md); transition: border-color var(--dur) var(--ease), background var(--dur) var(--ease); }
  .row:hover { border-color: var(--border-strong); background: var(--bg-surface-2); }
  .num { display: flex; flex-direction: column; gap: 2px; }
  .o-num { font-weight: 600; font-size: 0.9375rem; }
  .o-date { font-size: 0.75rem; color: var(--text-subtle); }
  .items-count, .o-total { font-size: 0.875rem; color: var(--text-muted); }
  .o-total { font-family: var(--font-display); font-weight: 700; color: var(--text); }
  .chev { width: 18px; height: 18px; color: var(--text-subtle); }

  @media (max-width: 640px) {
    .row { grid-template-columns: 1fr 1fr; gap: var(--s-2); }
    .items-count, .chev { display: none; }
  }
</style>
