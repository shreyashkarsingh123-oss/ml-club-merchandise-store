import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived } from 'svelte/store';

function routeName(id: string | null): string {
  if (!id) return 'not-found';
  if (id === '/') return 'home';
  if (id === '/products') return 'products';
  if (id === '/product/[slug]') return 'product';
  if (id === '/cart') return 'cart';
  if (id === '/checkout') return 'checkout';
  if (id === '/otp/[email]') return 'otp';
  if (id === '/orders') return 'orders';
  if (id === '/order/[id]') return 'order';
  if (id === '/success/[id]') return 'success';
  return 'not-found';
}

export const route = derived(page, ($p) => ({
  name: routeName($p.route.id),
  params: $p.params as Record<string, string>,
}));

export function navigate(to: string): void {
  const path = to.startsWith('/') ? to : `/${to}`;
  goto(path);
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }
}
