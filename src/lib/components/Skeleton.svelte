<script lang="ts">
  export let count = 3;
  export let type: 'grid' | 'list' | 'detail' = 'grid';
</script>

{#if type === 'grid'}
  <div class="skeleton-grid">
    {#each Array(count) as _, i}
      <div class="sk-card" style="animation-delay: {i * 60}ms">
        <div class="sk-img"></div>
        <div class="sk-body">
          <div class="sk-line w-70"></div>
          <div class="sk-line w-40"></div>
        </div>
      </div>
    {/each}
  </div>
{:else if type === 'list'}
  <div class="skeleton-list">
    {#each Array(count) as _, i}
      <div class="sk-row" style="animation-delay: {i * 60}ms">
        <div class="sk-thumb"></div>
        <div class="sk-row-body">
          <div class="sk-line w-60"></div>
          <div class="sk-line w-30"></div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="skeleton-detail">
    <div class="sk-detail-img"></div>
    <div class="sk-detail-body">
      <div class="sk-line w-50 h-lg"></div>
      <div class="sk-line w-30"></div>
      <div class="sk-line w-80"></div>
      <div class="sk-line w-60"></div>
      <div class="sk-line w-40"></div>
    </div>
  </div>
{/if}

<style>
  .skeleton-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5); }
  .sk-card { animation: fade-in var(--dur) var(--ease) both; }
  .sk-img { aspect-ratio: 1; border-radius: var(--r-lg); background: var(--bg-surface-2); }
  .sk-body { padding: var(--s-4) 0; display: flex; flex-direction: column; gap: 8px; }
  .sk-line { height: 12px; border-radius: var(--r-xs); background: var(--bg-surface-2); position: relative; overflow: hidden; }
  .sk-line::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent); animation: shimmer 1.5s infinite; }
  .sk-line.h-lg { height: 20px; }
  .w-30 { width: 30%; } .w-40 { width: 40%; } .w-50 { width: 50%; } .w-60 { width: 60%; } .w-70 { width: 70%; } .w-80 { width: 80%; }

  .skeleton-list { display: flex; flex-direction: column; gap: var(--s-4); }
  .sk-row { display: flex; gap: 14px; animation: fade-in var(--dur) var(--ease) both; }
  .sk-thumb { width: 64px; height: 64px; border-radius: var(--r-md); background: var(--bg-surface-2); }
  .sk-row-body { flex: 1; display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }

  .skeleton-detail { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-7); }
  .sk-detail-img { aspect-ratio: 1; border-radius: var(--r-lg); background: var(--bg-surface-2); }
  .sk-detail-body { display: flex; flex-direction: column; gap: 12px; padding-top: var(--s-4); }

  @media (max-width: 820px) {
    .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
    .skeleton-detail { grid-template-columns: 1fr; }
  }
  @media (max-width: 500px) {
    .skeleton-grid { grid-template-columns: 1fr; }
  }
</style>
