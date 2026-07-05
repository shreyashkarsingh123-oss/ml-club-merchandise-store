<script lang="ts">
  export let title = 'Nothing here';
  export let description = '';
  export let icon = 'default';
  export let actionLabel = '';
  export let onAction: (() => void) | null = null;
</script>

<div class="empty">
  <div class="icon" aria-hidden="true">
    {#if icon === 'search'}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    {:else if icon === 'cart'}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
    {:else}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    {/if}
  </div>
  <h3>{title}</h3>
  {#if description}<p>{description}</p>{/if}
  {#if actionLabel && onAction}
    <button class="action" on:click={onAction}>{actionLabel}</button>
  {/if}
</div>

<style>
  .empty { display: flex; flex-direction: column; align-items: center; gap: var(--s-3); padding: var(--s-9) var(--s-5); text-align: center; }
  .icon { width: 64px; height: 64px; border-radius: var(--r-full); background: var(--bg-surface); border: 1px solid var(--border); display: grid; place-items: center; color: var(--text-subtle); }
  .icon svg { width: 28px; height: 28px; }
  h3 { font-size: 1.125rem; color: var(--text); }
  p { font-size: 0.875rem; color: var(--text-subtle); max-width: 360px; }
  .action { margin-top: var(--s-2); padding: 10px 20px; height: 40px; background: var(--bg-surface-2); color: var(--text); border: 1px solid var(--border-strong); border-radius: var(--r-md); font-size: 0.8125rem; font-weight: 600; transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease); }
  .action:hover { background: var(--bg-surface-3); border-color: var(--text-subtle); }
</style>
