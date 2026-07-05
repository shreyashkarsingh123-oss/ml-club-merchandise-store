export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function genOrderId(): string {
  return 'ord_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function genOrderNumber(): string {
  return 'MLC-' + Math.floor(100000 + Math.random() * 900000);
}

export function genOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
