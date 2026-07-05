<script lang="ts">
  export let rating = 0;
  export let count = 0;
  export let showCount = false;
  export let size: 'sm' | 'md' = 'sm';
</script>

<div class="rating rating-{size}">
  <div class="stars" aria-label={`Rated ${rating} out of 5`}>
    {#each Array(5) as _, i}
      <svg class="star" class:filled={i < Math.round(rating)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    {/each}
  </div>
  {#if showCount && count > 0}
    <span class="count">({count})</span>
  {/if}
</div>

<style>
  .rating { display: inline-flex; align-items: center; gap: 6px; }
  .stars { display: inline-flex; gap: 2px; }
  .star { width: 14px; height: 14px; color: var(--border-strong); transition: color var(--dur) var(--ease); }
  .star.filled { color: var(--warning); }
  .rating-md .star { width: 18px; height: 18px; }
  .count { font-size: 0.75rem; color: var(--text-subtle); }
</style>
