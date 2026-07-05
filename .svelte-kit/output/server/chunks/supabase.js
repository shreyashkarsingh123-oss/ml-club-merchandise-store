import { createClient } from "@supabase/supabase-js";
const PUBLIC_SUPABASE_URL = "https://wxeaiultwwthrpbtmcvd.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZWFpdWx0d3d0aHJwYnRtY3ZkIiwicm9sIjoiYW5vbiIsImlhdCI6MTc4MzI0MzA1OCwiZXhwIjoyMDk4ODE5MDU4fQ.IcnscQQRWQ6o4nLpZPGW4c0c9cG3M_GzNBaMI0LPi18";
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});
export {
  supabase as s
};
