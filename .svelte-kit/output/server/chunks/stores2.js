import { d as derived, w as writable } from "./index.js";
import "./supabase.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils2.js";
import "@sveltejs/kit/internal/server";
import { p as page } from "./stores.js";
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
function routeName(id) {
  if (!id) return "not-found";
  if (id === "/") return "home";
  if (id === "/products") return "products";
  if (id === "/product/[slug]") return "product";
  if (id === "/cart") return "cart";
  if (id === "/checkout") return "checkout";
  if (id === "/otp/[email]") return "otp";
  if (id === "/orders") return "orders";
  if (id === "/order/[id]") return "order";
  if (id === "/success/[id]") return "success";
  return "not-found";
}
const route = derived(page, ($p) => ({
  name: routeName($p.route.id),
  params: $p.params
}));
function navigate(to) {
  goto();
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
const CART_KEY = "mlc_cart";
const COUPON_KEY = "mlc_coupon";
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function persist(key, store) {
  store.subscribe((v) => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
    }
  });
}
const cart = writable(load(CART_KEY, []));
persist(CART_KEY, cart);
const coupon = writable(load(COUPON_KEY, null));
persist(COUPON_KEY, coupon);
const cartCount = derived(cart, ($c) => $c.reduce((n, i) => n + i.quantity, 0));
const subtotal = derived(
  cart,
  ($c) => $c.reduce((sum, i) => sum + i.price * i.quantity, 0)
);
const discount = derived([subtotal, coupon], ([$sub, $cp]) => {
  if (!$cp || $sub < $cp.minSubtotal) return 0;
  return $cp.type === "percent" ? Math.round($sub * $cp.value / 100 * 100) / 100 : Math.min($cp.value, $sub);
});
const shipping = derived(subtotal, ($sub) => {
  if ($sub === 0) return 0;
  return $sub >= 75 ? 0 : 8;
});
const taxedBase = derived([subtotal, discount], ([$sub, $disc]) => $sub - $disc);
const tax = derived(taxedBase, ($base) => Math.round($base * 0.08 * 100) / 100);
const total = derived(
  [taxedBase, shipping, tax],
  ([$base, $ship, $tax]) => Math.round(($base + $ship + $tax) * 100) / 100
);
const orders = writable([]);
const ordersLoading = writable(false);
const cartOpen = writable(false);
const mobileNavOpen = writable(false);
const toasts = writable([]);
const otpState = writable(null);
export {
  cartOpen as a,
  cart as b,
  cartCount as c,
  shipping as d,
  toasts as e,
  coupon as f,
  discount as g,
  tax as h,
  ordersLoading as i,
  otpState as j,
  mobileNavOpen as m,
  navigate as n,
  orders as o,
  route as r,
  subtotal as s,
  total as t
};
