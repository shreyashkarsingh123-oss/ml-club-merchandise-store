import { g as getServiceClient } from "../../../../../chunks/supabase-admin.js";
import { f as fail, o as ok, h as handleApiError } from "../../../../../chunks/api.js";
const GET = async ({ params }) => {
  try {
    const supabase = getServiceClient();
    const { data: order, error } = await supabase.from("orders").select(`
        id, number, email, full_name, address, city, state, zip, country,
        subtotal, shipping, tax, discount, total, coupon_code, status, created_at
      `).eq("id", params.id).maybeSingle();
    if (error) return fail("DB_ERROR", error.message, 500);
    if (!order) return fail("NOT_FOUND", "Order not found", 404);
    const { data: items, error: itemsErr } = await supabase.from("order_items").select("name, image, size, color, price, quantity, product_slug").eq("order_id", params.id);
    if (itemsErr) return fail("DB_ERROR", itemsErr.message, 500);
    return ok({ ...order, items: items || [] });
  } catch (err) {
    return handleApiError(err);
  }
};
export {
  GET
};
