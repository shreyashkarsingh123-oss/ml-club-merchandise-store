<script lang="ts">
  import ErrorPage from '$lib/pages/ErrorPage.svelte';
  import { page } from '$app/stores';

  let status = $page.status;
  let message = $page.error?.message;
</script>

<ErrorPage
  code={String(status)}
  title={status === 404 ? 'Page not found' : 'Something went wrong'}
  message={message || 'An unexpected error occurred. Please try again.'}
/>
