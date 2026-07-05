export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  tags: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  maxStock: number;
};

export type Order = {
  id: string;
  number: string;
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: 'paid' | 'pending' | 'cancelled' | 'failed';
  paymentIntentId?: string;
  createdAt: string;
};

export type Coupon = {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minSubtotal: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};
