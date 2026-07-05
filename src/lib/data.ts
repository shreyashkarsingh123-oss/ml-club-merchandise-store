import { supabase } from './supabase';
import type { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'c1', name: 'T-Shirts', slug: 't-shirts', description: 'Premium tees with cured screen prints.', icon: 'shirt' },
  { id: 'c2', name: 'Hoodies', slug: 'hoodies', description: 'Heavyweight fleece and embroidered layers.', icon: 'shirt' },
  { id: 'c3', name: 'Caps', slug: 'caps', description: 'Structured and unstructured headwear.', icon: 'star' },
  { id: 'c4', name: 'Stickers', slug: 'stickers', description: 'Vinyl die-cut stickers for laptops and notebooks.', icon: 'sparkle' },
  { id: 'c5', name: 'Mugs', slug: 'mugs', description: 'Sublimation-printed ceramic mugs.', icon: 'sparkle' },
  { id: 'c6', name: 'Water Bottles', slug: 'water-bottles', description: 'Insulated stainless steel bottles.', icon: 'sparkle' },
  { id: 'c7', name: 'Laptop Sleeves', slug: 'laptop-sleeves', description: 'Padded sleeves with magnetic closure.', icon: 'book' },
  { id: 'c8', name: 'Tote Bags', slug: 'tote-bags', description: 'Heavyweight canvas totes with reinforced straps.', icon: 'sparkle' },
  { id: 'c9', name: 'Notebooks', slug: 'notebooks', description: 'Dot-grid and ruled notebooks with lay-flat binding.', icon: 'book' },
  { id: 'c10', name: 'Accessories', slug: 'accessories', description: 'Lanyards, pins, and everyday carry.', icon: 'sparkle' },
  { id: 'c11', name: 'Collectibles', slug: 'collectibles', description: 'Limited drops and signed prints.', icon: 'star' },
  { id: 'c12', name: 'Stationery', slug: 'stationery', description: 'Notebooks and desk gear for builders.', icon: 'book' },
];

export const testimonials = [
  { id: 't1', name: 'Aisha Karim', role: 'ML Engineer, Vector Labs', quote: 'The hoodie is the only thing I wear to standups. Heavyweight, the embroidery is immaculate, and it has survived two toddlers.', rating: 5, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { id: 't2', name: 'Marcus Lee', role: 'Researcher, ETH Zürich', quote: 'The loss-curve mug is a daily reminder that convergence is real. Print has not faded after a year of dishwashers.', rating: 5, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { id: 't3', name: 'Priya Nair', role: 'Founder, Latent AI', quote: 'We kitted the whole team out. Quality is genuinely premium and the shipping was fast. The tote holds a 16-inch laptop no problem.', rating: 5, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
];

export const faqs = [
  { id: 'f1', question: 'What is your return policy?', answer: 'We offer 30-day returns on unworn, unwashed items in original packaging. Returns are free within the US. Start a return from your order history.' },
  { id: 'f2', question: 'How long does shipping take?', answer: 'Orders ship within 1-2 business days. Standard delivery takes 3-5 business days in the US, 7-12 internationally. You will receive a tracking link by email.' },
  { id: 'f3', question: 'Are the prints durable?', answer: 'All apparel uses water-based, cured screen prints and embroidery. Mugs use sublimation. Everything is tested for repeated washing without fading.' },
  { id: 'f4', question: 'Do you offer team or bulk orders?', answer: 'Yes. For orders of 10+ units, contact us for a team discount and custom embroidery options.' },
  { id: 'f5', question: 'How does checkout work?', answer: 'We use Stripe in test mode for this store, so no real card is charged. You will confirm your email with a 6-digit OTP before placing the order.' },
];

export const coupons = [
  { code: 'MLCLUB10', type: 'percent' as const, value: 10, minSubtotal: 0 },
  { code: 'FREESHIP', type: 'fixed' as const, value: 8, minSubtotal: 60 },
];

type RawProduct = {
  id: string; name: string; slug: string; category_slug: string;
  price: number; compare_at: number | null; rating: number; review_count: number;
  images: string[]; description: string; specifications: Record<string, string>;
  sizes: string[]; colors: { name: string; hex: string }[];
  stock: number; featured: boolean; best_seller: boolean; tags: string[];
};

function mapProduct(r: RawProduct): Product {
  return {
    id: r.id, name: r.name, slug: r.slug, category: r.category_slug,
    price: Number(r.price), compareAt: r.compare_at ? Number(r.compare_at) : undefined,
    rating: r.rating, reviewCount: r.review_count,
    images: r.images, description: r.description, specifications: r.specifications,
    sizes: r.sizes, colors: r.colors, stock: r.stock,
    featured: r.featured, bestSeller: r.best_seller, tags: r.tags,
  };
}

export async function fetchProducts(opts: { category?: string; q?: string; sort?: string; featured?: boolean; bestSeller?: boolean } = {}): Promise<Product[]> {
  let query = supabase.from('products').select(`
    id, name, slug, category_slug, price, compare_at, rating, review_count,
    images, description, specifications, sizes, colors, stock, featured, best_seller, tags
  `);
  if (opts.category) query = query.eq('category_slug', opts.category);
  if (opts.featured) query = query.eq('featured', true);
  if (opts.bestSeller) query = query.eq('best_seller', true);
  if (opts.q) query = query.or(`name.ilike.%${opts.q}%,description.ilike.%${opts.q}%`);

  switch (opts.sort) {
    case 'price-asc': query = query.order('price', { ascending: true }); break;
    case 'price-desc': query = query.order('price', { ascending: false }); break;
    case 'rating': query = query.order('rating', { ascending: false }); break;
    default: query = query.order('featured', { ascending: false }).order('rating', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as RawProduct[]).map(mapProduct);
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, slug, category_slug, price, compare_at, rating, review_count,
      images, description, specifications, sizes, colors, stock, featured, best_seller, tags
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return mapProduct(data as RawProduct);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const related = await fetchProducts({ category: product.category });
  return related.filter((p) => p.id !== product.id).slice(0, limit);
}
