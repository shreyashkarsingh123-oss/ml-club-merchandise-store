import { s as supabase } from "../../../../chunks/supabase.js";
import { f as fail, o as ok, h as handleApiError } from "../../../../chunks/api.js";
const GET = async ({ url }) => {
  try {
    const category = url.searchParams.get("category");
    const q = url.searchParams.get("q");
    const sort = url.searchParams.get("sort") || "featured";
    const featured = url.searchParams.get("featured");
    const bestSeller = url.searchParams.get("best_seller");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 100);
    let query = supabase.from("products").select(`
      id, name, slug, category_slug, price, compare_at, rating, review_count,
      images, description, sizes, colors, stock, featured, best_seller, tags
    `).limit(limit);
    if (category) query = query.eq("category_slug", category);
    if (featured === "true") query = query.eq("featured", true);
    if (bestSeller === "true") query = query.eq("best_seller", true);
    if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    switch (sort) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      default:
        query = query.order("featured", { ascending: false }).order("rating", { ascending: false });
    }
    const { data, error } = await query;
    if (error) return fail("QUERY_FAILED", error.message, 500);
    return ok(data);
  } catch (err) {
    return handleApiError(err);
  }
};
export {
  GET
};
