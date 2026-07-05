<script lang="ts">
  import { fade } from 'svelte/transition';

  export let open = false;
  export let title = '';
  export let onClose = () => {};

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window on:keydown={handleKey} />

{#if open}
  <div class="overlay" on:click={onClose} transition:fade={{ duration: 180 }} role="presentation">
    <div class="modal" transition:fade={{ duration: 180 }} role="dialog" aria-modal="true" aria-label={title} on:click|stopPropagation>
      {#if title}
        <div class="modal-head">
          <h3>{title}</h3>
          <button class="close" on:click={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      {/if}
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed; inset: 0; z-index: 150;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: var(--s-4);
  }
  .modal {
    width: 100%; max-width: 480px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-lg);
    max-height: 90vh; overflow: auto;
    animation: fade-in-scale var(--dur) var(--ease) both;
  }
  .modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--s-5);
    border-bottom: 1px solid var(--border);
  }
  .modal-head h3 { font-size: 1.0625rem; }
  .close {
    width: 32px; height: 32px; border-radius: var(--r-sm);
    display: grid; place-items: center; color: var(--text-muted);
    transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
  }
  .close:hover { background: var(--bg-surface); color: var(--text); }
  .close svg { width: 18px; height: 18px; }
  .modal-body { padding: var(--s-5); }
</style>
