<script lang="ts">
  type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'new' | 'accent';
  export let variant: Variant = 'default';
</script>

<span class="badge badge-{variant}"><slot /></span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-radius: var(--r-full);
    border: 1px solid transparent;
    line-height: 1.4;
    white-space: nowrap;
  }
  .badge-default { background: var(--bg-surface-2); color: var(--text-muted); border-color: var(--border); }
  .badge-primary { background: var(--primary-subtle); color: var(--primary); border-color: var(--primary-glow); }
  .badge-accent { background: var(--accent-subtle); color: var(--accent); border-color: var(--accent-glow); }
  .badge-success { background: var(--success-subtle); color: var(--success); border-color: var(--success-glow); }
  .badge-warning { background: var(--warning-subtle); color: var(--warning); border-color: var(--warning-glow); }
  .badge-error { background: var(--error-subtle); color: var(--error); border-color: var(--error-glow); }
  .badge-new { background: var(--secondary-subtle); color: var(--secondary); border-color: var(--secondary-glow); }
</style>
