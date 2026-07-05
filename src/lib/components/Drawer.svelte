<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  export let open = false;
  export let side: 'left' | 'right' = 'right';
  export let title = '';
  export let onClose = () => {};

  $: x = side === 'right' ? 360 : -360;

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window on:keydown={handleKey} />

{#if open}
  <div class="overlay" on:click={onClose} transition:fade={{ duration: 180 }} role="presentation">
    <aside
      class="drawer drawer-{side}"
      transition:fly={{ x, duration: 240 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      on:click|stopPropagation
    >
      <header class="drawer-head">
        <h3>{title}</h3>
        <button class="close" on:click={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>
      <div class="drawer-body">
        <slot />
      </div>
    </aside>
  </div>
{/if}

<style>
  .overlay {
    position: fixed; inset: 0; z-index: 140;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(4px);
  }
  .drawer {
    position: fixed; top: 0; bottom: 0;
    width: 100%; max-width: 420px;
    background: var(--bg-elevated);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-lg);
  }
  .drawer-left { left: 0; border-left: none; border-right: 1px solid var(--border); }
  .drawer-right { right: 0; }
  .drawer-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--s-4) var(--s-5);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .drawer-head h3 { font-size: 1rem; }
  .close {
    width: 32px; height: 32px; border-radius: var(--r-sm);
    display: grid; place-items: center; color: var(--text-muted);
    transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
  }
  .close:hover { background: var(--bg-surface); color: var(--text); }
  .close svg { width: 18px; height: 18px; }
  .drawer-body { flex: 1; overflow-y: auto; padding: var(--s-5); }
</style>
