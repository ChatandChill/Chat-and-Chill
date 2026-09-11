import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase ENV missing - add in Vercel Settings -> Environment Variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tables needed in Supabase - run this SQL in Supabase SQL Editor:
/*
create table posts (id uuid primary key default gen_random_uuid(), user_id uuid, username text, caption text, video_url text, likes int default 0, gifts int default 0, created_at timestamp default now());
create table profiles (id uuid primary key, username text, avatar_url text, bio text, followers int default 0, following int default 0);
create table messages (id uuid primary key default gen_random_uuid(), sender_id uuid, receiver_id uuid, encrypted_content text, created_at timestamp default now());
create table battles (id uuid primary key default gen_random_uuid(), host_id uuid, challenger_id uuid, status text, winner_id uuid, gifts_host int default 0, gifts_challenger int default 0, created_at timestamp default now());
create table wallets (user_id uuid primary key, balance int default 0, total_earned int default 0);
create table gifts (id uuid primary key default gen_random_uuid(), sender_id uuid, receiver_id uuid, battle_id uuid, amount int, type text, created_at timestamp default now());
-- Enable RLS and policies as needed
*/
