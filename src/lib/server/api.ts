import type { RequestHandler } from '@sveltejs/kit';

export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string; details?: unknown };
};

export function json<T>(body: ApiResponse<T>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function ok<T>(data: T, status = 200): Response {
  return json({ ok: true, data }, status);
}

export function fail(code: string, message: string, status: number, details?: unknown): Response {
  return json({ ok: false, error: { code, message, details } }, status);
}

export function handleApiError(err: unknown): Response {
  const message = err instanceof Error ? err.message : 'Internal server error';
  console.error('[API Error]', message);
  return fail('INTERNAL_ERROR', message, 500);
}

export function validateEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function validateRequired(obj: Record<string, unknown>, fields: string[]): string | null {
  for (const f of fields) {
    const v = obj[f];
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      return `Missing required field: ${f}`;
    }
  }
  return null;
}
