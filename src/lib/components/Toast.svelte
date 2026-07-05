<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { toasts } from '../stores';

  function icon(type: string) {
    if (type === 'success') return 'M5 13l4 4L19 7';
    if (type === 'error') return 'M6 6l12 12M18 6L6 18';
    return 'M12 8v4M12 16h.01';
  }
</script>

<div class="toast-wrap" role="region" aria-live="polite" aria-label="Notifications">
  {#each $toasts as t (t.id)}
    <div class="toast toast-{t.type}" transition:fly={{ x: 40, duration: 220 }}>
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d={icon(t.type)} />
      </svg>
      <span class="toast-msg">{t.message}</span>
    </div>
  {/each}
</div>

<style>
  .toast-wrap {
    position: fixed; top: 20px; right: 20px; z-index: 200;
    display: flex; flex-direction: column; gap: 10px;
    pointer-events: none;
  }
  .toast {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 12px 16px;
    box-shadow: var(--shadow-lg);
    min-width: 240px; max-width: 360px;
    font-size: 0.875rem; color: var(--text);
    pointer-events: auto;
  }
  .toast-icon { width: 18px; height: 18px; flex-shrink: 0; }
  .toast-success .toast-icon { color: var(--success); }
  .toast-error .toast-icon { color: var(--error); }
  .toast-info .toast-icon { color: var(--primary); }
  .toast-msg { line-height: 1.4; }

  @media (max-width: 480px) {
    .toast-wrap { left: 16px; right: 16px; top: 16px; }
    .toast { max-width: none; }
  }
</style>
