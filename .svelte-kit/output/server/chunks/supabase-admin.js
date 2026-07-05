import { createClient } from "@supabase/supabase-js";
import { b as private_env } from "./shared-server.js";
const SUPABASE_URL = private_env.SUPABASE_URL || private_env.PUBLIC_SUPABASE_URL || private_env.VITE_SUPABASE_URL || "";
const SERVICE_ROLE_KEY = private_env.SUPABASE_SERVICE_ROLE_KEY || "";
function getServiceClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
export {
  getServiceClient as g
};
