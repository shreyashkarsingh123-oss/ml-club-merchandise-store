import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const SUPABASE_URL = env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL || env.VITE_SUPABASE_URL || '';
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';

function getServiceClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured.');
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export { getServiceClient };
