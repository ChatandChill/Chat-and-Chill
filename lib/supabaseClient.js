/ lib/supabase.js - For prod replace in-memory with Supabase - 5M Hedge Backend
// import { createClient } from '@supabase/supabase-js';
// export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabase = { from: () => ({ insert: async () => {} }), rpc: async () => {} };
