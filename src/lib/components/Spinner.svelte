<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="spinner spinner-{size}" role="status" aria-label="Loading">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
</div>

<style>
  .spinner { display: inline-flex; align-items: center; justify-content: center; color: var(--primary); }
  .spinner svg { animation: spin 0.7s linear infinite; }
  .spinner-sm svg { width: 16px; height: 16px; }
  .spinner-md svg { width: 24px; height: 24px; }
  .spinner-lg svg { width: 40px; height: 40px; }
</style>
