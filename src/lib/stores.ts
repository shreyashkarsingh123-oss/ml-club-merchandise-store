import { writable, derived, get } from 'svelte/store';
import type { CartItem, Order, Coupon } from './types';
import { coupons } from './data';
export { navigate } from './router';

const CART_KEY = 'mlc_cart';
const COUPON_KEY = 'mlc_coupon';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist<T>(key: string, store: { subscribe: (cb: (v: T) => void) => () => void }) {
  store.subscribe((v) => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
  });
}

/* ---------- Cart (client-side ephemeral state) ---------- */
export const cart = writable<CartItem[]>(load<CartItem[]>(CART_KEY, []));
persist(CART_KEY, cart);

export const coupon = writable<Coupon | null>(load<Coupon | null>(COUPON_KEY, null));
persist(COUPON_KEY, coupon);

export const cartCount = derived(cart, ($c) => $c.reduce((n, i) => n + i.quantity, 0));

export const subtotal = derived(cart, ($c) =>
  $c.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const discount = derived([subtotal, coupon], ([$sub, $cp]) => {
  if (!$cp || $sub < $cp.minSubtotal) return 0;
  return $cp.type === 'percent'
    ? Math.round(($sub * $cp.value) / 100 * 100) / 100
    : Math.min($cp.value, $sub);
});

export const shipping = derived(subtotal, ($sub) => {
  if ($sub === 0) return 0;
  return $sub >= 75 ? 0 : 8;
});

export const taxedBase = derived([subtotal, discount], ([$sub, $disc]) => $sub - $disc);

export const tax = derived(taxedBase, ($base) => Math.round($base * 0.08 * 100) / 100);

export const total = derived([taxedBase, shipping, tax], ([$base, $ship, $tax]) =>
  Math.round(($base + $ship + $tax) * 100) / 100
);

/* ---------- Cart actions ---------- */
export function addToCart(item: Omit<CartItem, 'quantity'>, qty = 1): void {
  cart.update((items) => {
    const idx = items.findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
    );
    if (idx >= 0) {
      const next = [...items];
      next[idx] = { ...next[idx], quantity: Math.min(next[idx].quantity + qty, item.maxStock) };
      return next;
    }
    return [...items, { ...item, quantity: Math.min(qty, item.maxStock) }];
  });
}

export function updateQty(productId: string, size: string, color: string, qty: number): void {
  cart.update((items) =>
    items
      .map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, quantity: Math.max(0, Math.min(qty, i.maxStock)) }
          : i
      )
      .filter((i) => i.quantity > 0)
  );
}

export function removeFromCart(productId: string, size: string, color: string): void {
  cart.update((items) =>
    items.filter((i) => !(i.productId === productId && i.size === size && i.color === color))
  );
}

export function clearCart(): void {
  cart.set([]);
  coupon.set(null);
}

export function applyCoupon(code: string): { ok: boolean; message: string } {
  const found = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!found) return { ok: false, message: 'Invalid coupon code.' };
  const sub = get(subtotal);
  if (sub < found.minSubtotal) {
    return { ok: false, message: `Requires a subtotal of $${found.minSubtotal}.` };
  }
  coupon.set(found);
  return { ok: true, message: `Coupon ${found.code} applied.` };
}

export function removeCoupon(): void {
  coupon.set(null);
}

/* ---------- Orders (Supabase-backed) ---------- */
type RawOrder = {
  id: string; number: string; email: string; full_name: string;
  address: string; city: string; state: string; zip: string; country: string;
  subtotal: number; shipping: number; tax: number; discount: number; total: number;
  coupon_code: string | null; status: string; created_at: string;
  items?: { name: string; image: string; size: string; color: string; price: number; quantity: number; product_slug: string }[];
};

function mapOrder(r: RawOrder): Order {
  return {
    id: r.id, number: r.number, email: r.email, fullName: r.full_name,
    address: r.address, city: r.city, state: r.state, zip: r.zip, country: r.country,
    items: (r.items || []).map((i) => ({
      productId: i.product_slug, slug: i.product_slug, name: i.name,
      price: Number(i.price), image: i.image, size: i.size, color: i.color,
      quantity: i.quantity, maxStock: 999,
    })),
    subtotal: Number(r.subtotal), shipping: Number(r.shipping), tax: Number(r.tax),
    discount: Number(r.discount), total: Number(r.total),
    couponCode: r.coupon_code || undefined,
    status: r.status as Order['status'],
    createdAt: r.created_at,
  };
}

export const orders = writable<Order[]>([]);
export const ordersLoading = writable(false);

export async function fetchOrders(): Promise<void> {
  ordersLoading.set(true);
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error('Failed to load orders');
    const json = await res.json();
    if (json.ok && json.data) orders.set((json.data as RawOrder[]).map(mapOrder));
  } catch (e) {
    console.error('fetchOrders error', e);
  } finally {
    ordersLoading.set(false);
  }
}

export async function createOrder(payload: {
  email: string; fullName: string; address: string; city: string; state: string;
  zip: string; country: string; items: CartItem[]; subtotal: number; shipping: number;
  tax: number; discount: number; total: number; couponCode?: string; paymentIntentId?: string;
}): Promise<{ id: string; number: string } | null> {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.ok && json.data) {
      await fetchOrders();
      return json.data;
    }
    return null;
  } catch (e) {
    console.error('createOrder error', e);
    return null;
  }
}

export async function fetchOrder(id: string): Promise<Order | null> {
  try {
    const res = await fetch(`/api/orders/${id}`);
    const json = await res.json();
    if (json.ok && json.data) return mapOrder(json.data as RawOrder);
    return null;
  } catch (e) {
    console.error('fetchOrder error', e);
    return null;
  }
}

/* ---------- UI stores ---------- */
export const cartOpen = writable(false);
export const mobileNavOpen = writable(false);
export const toasts = writable<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

export function toast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
  const id = Date.now() + Math.random();
  toasts.update((t) => [...t, { id, message, type }]);
  setTimeout(() => {
    toasts.update((t) => t.filter((x) => x.id !== id));
  }, 3200);
}

/* ---------- OTP (client-side state, verified server-side) ---------- */
export type PendingCheckout = {
  fullName: string; email: string; address: string; city: string;
  state: string; zip: string; country: string;
};

export const otpState = writable<{ email: string; expiresAt: number; attempts: number; locked: boolean; pending?: PendingCheckout } | null>(null);
