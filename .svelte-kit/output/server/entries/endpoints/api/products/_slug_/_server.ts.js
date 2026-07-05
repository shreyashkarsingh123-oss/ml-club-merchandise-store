import { s as supabase } from "../../../../../chunks/supabase.js";
import { f as fail, o as ok, h as handleApiError } from "../../../../../chunks/api.js";
const GET = async ({ params }) => {
  try {
    const { data, error } = await supabase.from("products").select(`
        id, name, slug, category_slug, price, compare_at, rating, review_count,
        images, description, specifications, sizes, colors, stock, featured, best_seller, tags
      `).eq("slug", params.slug).maybeSingle();
    if (error) return fail("QUERY_FAILED", error.message, 500);
    if (!data) return fail("NOT_FOUND", "Product not found", 404);
    return ok(data);
  } catch (err) {
    return handleApiError(err);
  }
};
export {
  GET
};
