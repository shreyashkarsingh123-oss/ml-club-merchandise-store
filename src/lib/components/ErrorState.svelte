<script lang="ts">
  export let title = 'Something went wrong';
  export let message = 'Please try again.';
  export let onRetry: (() => void) | null = null;
</script>

<div class="err">
  <div class="err-icon" aria-hidden="true">
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 20v14M32 42h.01"/>
    </svg>
  </div>
  <h3>{title}</h3>
  <p>{message}</p>
  {#if onRetry}
    <button class="err-action" on:click={onRetry}>Try again</button>
  {/if}
</div>

<style>
  .err {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: var(--s-8) var(--s-5); gap: var(--s-3);
  }
  .err-icon { color: var(--error); opacity: 0.7; }
  .err-icon svg { width: 56px; height: 56px; }
  .err h3 { font-size: 1.125rem; }
  .err p { max-width: 360px; font-size: 0.875rem; }
  .err-action {
    margin-top: var(--s-2);
    color: var(--text); font-weight: 600; font-size: 0.875rem;
    padding: 10px 20px; border-radius: var(--r-md);
    background: var(--bg-surface-2); border: 1px solid var(--border-strong);
    transition: all var(--dur) var(--ease);
  }
  .err-action:hover { background: var(--bg-surface); border-color: var(--primary); }
</style>
