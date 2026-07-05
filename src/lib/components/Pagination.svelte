<script lang="ts">
  export let count = 1;
  export let current = 1;
  export let onChange = (page: number) => {};
</script>

{#if count > 1}
  <nav class="pagination" aria-label="Pagination">
    <button class="pg-btn" disabled={current === 1} on:click={() => onChange(current - 1)} aria-label="Previous page">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    {#each Array(count) as _, i}
      <button
        class="pg-btn pg-num"
        class:active={i + 1 === current}
        on:click={() => onChange(i + 1)}
        aria-current={i + 1 === current ? 'page' : undefined}
        aria-label={`Page ${i + 1}`}
      >{i + 1}</button>
    {/each}
    <button class="pg-btn" disabled={current === count} on:click={() => onChange(current + 1)} aria-label="Next page">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </nav>
{/if}

<style>
  .pagination { display: flex; align-items: center; justify-content: center; gap: 6px; }
  .pg-btn {
    min-width: 38px; height: 38px;
    display: inline-flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-muted);
    border-radius: var(--r-sm);
    font-size: 0.875rem; font-weight: 500;
    transition: all var(--dur) var(--ease);
  }
  .pg-btn:hover:not(:disabled):not(.active) {
    border-color: var(--border-strong); color: var(--text); background: var(--bg-surface-2);
  }
  .pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pg-btn.active { background: var(--primary); color: var(--primary-fg); border-color: var(--primary); }
  .pg-btn svg { width: 16px; height: 16px; }
</style>
