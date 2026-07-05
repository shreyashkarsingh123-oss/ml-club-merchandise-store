import { g as getServiceClient } from "../../../../chunks/supabase-admin.js";
import { f as fail, o as ok, h as handleApiError, v as validateRequired, a as validateEmail } from "../../../../chunks/api.js";
const GET = async ({ url }) => {
  try {
    const supabase = getServiceClient();
    const status = url.searchParams.get("status");
    const email = url.searchParams.get("email");
    let query = supabase.from("orders").select(`
        id, number, email, full_name, subtotal, shipping, tax, discount, total,
        coupon_code, status, created_at
      `).order("created_at", { ascending: false }).limit(100);
    if (status && status !== "all") query = query.eq("status", status);
    if (email) query = query.eq("email", email.toLowerCase());
    const { data, error } = await query;
    if (error) return fail("DB_ERROR", error.message, 500);
    return ok(data);
  } catch (err) {
    return handleApiError(err);
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const required = ["email", "fullName", "address", "city", "state", "zip", "items", "subtotal", "shipping", "tax", "total"];
    const missing = validateRequired(body, required);
    if (missing) return fail("VALIDATION_ERROR", missing, 400);
    if (!validateEmail(body.email)) {
      return fail("VALIDATION_ERROR", "A valid email is required.", 400);
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return fail("VALIDATION_ERROR", "Order must contain at least one item.", 400);
    }
    const supabase = getServiceClient();
    const { data: customer, error: custErr } = await supabase.from("customers").upsert({
      email: body.email.toLowerCase(),
      full_name: body.fullName,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country || "United States"
    }, { onConflict: "email" }).select("id").maybeSingle();
    if (custErr) return fail("DB_ERROR", custErr.message, 500);
    if (!customer) return fail("DB_ERROR", "Failed to create customer record.", 500);
    const orderNumber = "MLC-" + Math.floor(1e5 + Math.random() * 9e5);
    const { data: order, error: orderErr } = await supabase.from("orders").insert({
      number: orderNumber,
      customer_id: customer.id,
      email: body.email.toLowerCase(),
      full_name: body.fullName,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country || "United States",
      subtotal: body.subtotal,
      shipping: body.shipping,
      tax: body.tax,
      discount: body.discount || 0,
      total: body.total,
      coupon_code: body.couponCode || null,
      status: "paid"
    }).select("id, number").maybeSingle();
    if (orderErr) return fail("DB_ERROR", orderErr.message, 500);
    if (!order) return fail("DB_ERROR", "Failed to create order.", 500);
    const orderItems = body.items.map((item) => ({
      order_id: order.id,
      product_slug: item.slug || "",
      name: item.name,
      image: item.image || "",
      size: item.size || "",
      color: item.color || "",
      price: item.price,
      quantity: item.quantity
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
    if (itemsErr) return fail("DB_ERROR", itemsErr.message, 500);
    const { error: payErr } = await supabase.from("payments").insert({
      order_id: order.id,
      stripe_payment_intent_id: body.paymentIntentId || null,
      amount: body.total,
      currency: "usd",
      status: "paid"
    });
    if (payErr) console.error("[Payment record error]", payErr.message);
    return ok({ id: order.id, number: order.number }, 201);
  } catch (err) {
    return handleApiError(err);
  }
};
export {
  GET,
  POST
};
