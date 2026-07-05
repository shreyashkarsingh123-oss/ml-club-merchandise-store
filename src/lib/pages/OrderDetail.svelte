<script lang="ts">
  import { route } from '../router';
  import { fetchOrder, navigate, toast } from '../stores';
  import { formatPrice, formatDate } from '../format';
  import { onMount } from 'svelte';
  import Button from '../components/Button.svelte';
  import Breadcrumb from '../components/Breadcrumb.svelte';
  import EmptyState from '../components/EmptyState.svelte';
  import Badge from '../components/Badge.svelte';
  import Spinner from '../components/Spinner.svelte';
  import type { Order } from '../types';

  let id = '';
  let order: Order | null = null;
  let loading = true;

  $: if ($route.name === 'order') id = $route.params.id;

  onMount(async () => {
    if (id) {
      order = await fetchOrder(id);
      loading = false;
      if (!order) toast('Order not found.', 'error');
    }
  });

  function printInvoice() {
    window.print();
  }
</script>

<div class="container page">
  {#if loading}
    <div class="loading-wrap"><Spinner size="lg" /></div>
  {:else if !order}
    <EmptyState title="Order not found" description="This order may have been removed." actionLabel="View orders" onAction={() => navigate('/orders')} />
  {:else}
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Orders', href: '/orders' }, { label: order.number, current: true }]} />
    <div class="invoice">
      <header class="inv-head">
        <div>
          <span class="eyebrow">Invoice</span>
          <h1>{order.number}</h1>
          <p>Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div class="head-right">
          <Badge variant={order.status === 'paid' ? 'success' : 'warning'}>{order.status}</Badge>
          <Button variant="secondary" size="sm" on:click={printInvoice}>Print</Button>
        </div>
      </header>

      <section class="grid-2">
        <div class="card">
          <h3>Billed to</h3>
          <p class="line"><strong>{order.fullName || 'Guest'}</strong></p>
          <p class="line">{order.email}</p>
          <p class="line">{order.address}</p>
          <p class="line">{order.city}{order.city && order.state ? ', ' : ''}{order.state} {order.zip}</p>
          <p class="line">{order.country}</p>
        </div>
        <div class="card">
          <h3>Payment</h3>
          <p class="line"><span>Method</span><span>Card (Stripe test)</span></p>
          <p class="line"><span>Status</span><span class="ok">{order.status}</span></p>
        </div>
      </section>

      <section class="card">
        <h3>Items</h3>
        <div class="tbl">
          <div class="th"><span>Item</span><span>Variant</span><span class="r">Qty</span><span class="r">Price</span><span class="r">Total</span></div>
          {#each order.items as item}
            <div class="tr">
              <span class="cell-name"><img src={item.image} alt="" loading="lazy" />{item.name}</span>
              <span>{item.size} · {item.color}</span>
              <span class="r">{item.quantity}</span>
              <span class="r">{formatPrice(item.price)}</span>
              <span class="r">{formatPrice(item.price * item.quantity)}</span>
            </div>
          {/each}
        </div>
      </section>

      <section class="totals">
        <div class="t-line"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
        {#if order.discount > 0}<div class="t-line"><span>Discount{order.couponCode ? ` (${order.couponCode})` : ''}</span><span>−{formatPrice(order.discount)}</span></div>{/if}
        <div class="t-line"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></div>
        <div class="t-line"><span>Tax</span><span>{formatPrice(order.tax)}</span></div>
        <div class="t-line t-total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
      </section>

      <div class="inv-foot">
        <Button variant="ghost" on:click={() => navigate('/orders')}>← Back to orders</Button>
        <Button variant="secondary" on:click={() => navigate('/products')}>Shop again</Button>
      </div>
    </div>
  {/if}
</div>

<style>
  .page { padding: var(--s-5) 0 var(--s-8); }
  .loading-wrap { display: flex; justify-content: center; padding: var(--s-9) 0; }
  .invoice { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--s-4); }
  .inv-head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--s-4); margin: var(--s-5) 0 var(--s-2); flex-wrap: wrap; }
  .inv-head h1 { font-size: 1.75rem; margin-top: 4px; }
  .inv-head p { font-size: 0.875rem; color: var(--text-subtle); }
  .head-right { display: flex; align-items: center; gap: 10px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-4); }
  .card { padding: var(--s-5); background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .card h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); margin-bottom: var(--s-3); }
  .line { font-size: 0.875rem; color: var(--text-muted); display: flex; justify-content: space-between; gap: var(--s-3); padding: 3px 0; }
  .line strong { color: var(--text); }
  .ok { color: var(--success); font-weight: 600; }

  .tbl { display: flex; flex-direction: column; }
  .th, .tr { display: grid; grid-template-columns: 2fr 1.4fr 0.5fr 0.7fr 0.8fr; gap: var(--s-3); align-items: center; padding: 10px 0; }
  .th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); border-bottom: 1px solid var(--border); }
  .tr { border-bottom: 1px solid var(--border); font-size: 0.875rem; color: var(--text-muted); }
  .r { text-align: right; }
  .cell-name { display: flex; align-items: center; gap: 10px; color: var(--text); font-weight: 500; }
  .cell-name img { width: 40px; height: 40px; object-fit: cover; border-radius: var(--r-sm); border: 1px solid var(--border); }

  .totals { margin-left: auto; width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 8px; padding: var(--s-4); }
  .t-line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }
  .t-total { font-size: 1.0625rem; font-weight: 700; color: var(--text); font-family: var(--font-display); padding-top: 8px; border-top: 1px solid var(--border); }
  .inv-foot { display: flex; justify-content: space-between; gap: 10px; margin-top: var(--s-3); flex-wrap: wrap; }

  @media (max-width: 640px) {
    .grid-2 { grid-template-columns: 1fr; }
    .th, .tr { grid-template-columns: 2fr 1fr 0.6fr 0.8fr; }
    .th span:nth-child(2), .tr span:nth-child(2) { display: none; }
  }
  @media print {
    :global(.nav), :global(.footer), :global(.toast-wrap) { display: none !important; }
    .head-right button, .inv-foot { display: none; }
    .card, .invoice { border: none; background: white; color: black; }
  }
</style>
