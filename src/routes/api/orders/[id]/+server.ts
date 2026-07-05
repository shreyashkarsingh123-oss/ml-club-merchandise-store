import type { RequestHandler } from './$types';
import { getServiceClient } from '$lib/server/supabase-admin';
import { ok, fail, handleApiError } from '$lib/server/api';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const supabase = getServiceClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        id, number, email, full_name, address, city, state, zip, country,
        subtotal, shipping, tax, discount, total, coupon_code, status, created_at
      `)
      .eq('id', params.id)
      .maybeSingle();

    if (error) return fail('DB_ERROR', error.message, 500);
    if (!order) return fail('NOT_FOUND', 'Order not found', 404);

    const { data: items, error: itemsErr } = await supabase
      .from('order_items')
      .select('name, image, size, color, price, quantity, product_slug')
      .eq('order_id', params.id);

    if (itemsErr) return fail('DB_ERROR', itemsErr.message, 500);

    return ok({ ...order, items: items || [] });
  } catch (err) {
    return handleApiError(err);
  }
};
