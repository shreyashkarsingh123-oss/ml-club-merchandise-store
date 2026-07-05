<script lang="ts">
  export let items: { label: string; href?: string; current?: boolean }[] = [];
  import { navigate } from '../router';
</script>

<nav class="crumbs" aria-label="Breadcrumb">
  {#each items as item, i}
    {#if i > 0}
      <svg class="sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
    {/if}
    {#if item.href && !item.current}
      <a href={item.href} class="crumb">{item.label}</a>
    {:else}
      <span class="crumb current" aria-current="page">{item.label}</span>
    {/if}
  {/each}
</nav>

<style>
  .crumbs { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-size: 0.8125rem; }
  .crumb { color: var(--text-subtle); transition: color var(--dur) var(--ease); }
  a.crumb:hover { color: var(--text); }
  .crumb.current { color: var(--text-muted); }
  .sep { width: 14px; height: 14px; color: var(--text-subtle); }
</style>
