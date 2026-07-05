<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  type Size = 'sm' | 'md' | 'lg';

  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let block = false;
  export let loading = false;
  export let disabled = false;
  export let href: string | null = null;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

{#if href}
  <a class="btn btn-{variant} btn-{size} {block ? 'block' : ''}" {href} aria-disabled={disabled || loading}>
    {#if loading}<span class="spinner" aria-hidden="true"></span>{/if}
    <slot />
  </a>
{:else}
  <button class="btn btn-{variant} btn-{size} {block ? 'block' : ''}" {type} disabled={disabled || loading}>
    {#if loading}<span class="spinner" aria-hidden="true"></span>{/if}
    <span class="label"><slot /></span>
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: -0.01em;
    border-radius: var(--r-md);
    transition: all var(--dur) var(--ease);
    white-space: nowrap;
    user-select: none;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
  }
  .btn:disabled, .btn[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
  .btn.block { width: 100%; }

  .btn-sm { height: 36px; padding: 0 14px; font-size: 0.8125rem; }
  .btn-md { height: 44px; padding: 0 20px; }
  .btn-lg { height: 52px; padding: 0 28px; font-size: 0.9375rem; }

  /* Primary — Indigo gradient */
  .btn-primary {
    background: var(--grad-primary);
    color: var(--primary-fg);
    box-shadow: 0 1px 0 rgba(255,255,255,0.1) inset, 0 2px 8px var(--primary-glow);
  }
  .btn-primary:hover { background: linear-gradient(135deg, var(--primary-hover) 0%, var(--accent-hover) 100%); box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 16px var(--primary-glow); transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }

  /* Secondary — glass/surface */
  .btn-secondary {
    background: var(--bg-surface-2);
    color: var(--text);
    border-color: var(--border-strong);
  }
  .btn-secondary:hover { background: var(--bg-surface-3); border-color: var(--text-subtle); transform: translateY(-1px); }
  .btn-secondary:active { transform: translateY(0); }

  /* Outline */
  .btn-outline {
    background: transparent;
    color: var(--primary);
    border-color: var(--primary);
  }
  .btn-outline:hover { background: var(--primary-subtle); border-color: var(--primary-hover); }

  /* Ghost */
  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
  }
  .btn-ghost:hover { background: var(--bg-surface); color: var(--text); }

  /* Danger */
  .btn-danger {
    background: var(--error);
    color: #fff;
  }
  .btn-danger:hover { background: var(--error-hover); }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
</style>
