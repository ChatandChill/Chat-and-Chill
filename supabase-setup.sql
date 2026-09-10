supabase-setup.sql
sql



-- Chat & Chill v6 - Full Database Setup
-- Run this in Supabase SQL Editor

-- 1. PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  gifter_level text default 'Newbie' check (gifter_level in ('Newbie','Bronze','Silver','Gold','Diamond')),
  total_gifted integer default 0,
  total_earned integer default 0,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);

-- 2. MESSAGES
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- 3. GIFTS
create table if not exists gifts (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references profiles(id) on delete cascade,
  receiver_id uuid references profiles(id) on delete cascade,
  amount integer not null,
  gift_type text default 'coral' check (gift_type in ('coral','diamond','rose','rocket')),
  message_id uuid references messages(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table profiles enable row level security;
alter table messages enable row level security;
alter table gifts enable row level security;

-- Policies
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Messages are viewable" on messages for select using (true);
create policy "Authenticated can send messages" on messages for insert with check (auth.role() = 'authenticated');

create policy "Gifts are viewable" on gifts for select using (true);
create policy "Authenticated can send gifts" on gifts for insert with check (auth.role() = 'authenticated');

-- Gifter Level Trigger
create or replace function update_gifter_level()
returns trigger as $$
begin
  update profiles set total_gifted = total_gifted + NEW.amount where id = NEW.sender_id;
  update profiles set total_earned = total_earned + NEW.amount where id = NEW.receiver_id;

  update profiles set gifter_level = case
    when total_gifted >= 1000 then 'Diamond'
    when total_gifted >= 200 then 'Gold'
    when total_gifted >= 50 then 'Silver'
    when total_gifted >= 10 then 'Bronze'
    else 'Newbie'
  end where id = NEW.sender_id;

  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists on_gift_sent on gifts;
create trigger on_gift_sent after insert on gifts for each row execute function update_gifter_level();

-- Auto create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username) values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- Atomic wallet deduction and transaction log
create or replace function public.process_wallet_transaction(
  p_user_id text,
  p_amount numeric,
  p_type text,
  p_description text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_balance numeric;
  new_balance numeric;
begin
  if p_amount is null or p_amount <= 0 then
    return jsonb_build_object('success', false, 'error', 'Amount must be greater than zero');
  end if;

  select balance into current_balance
  from wallets
  where user_id = p_user_id
  for update;

  if current_balance is null then
    return jsonb_build_object('success', false, 'error', 'Insufficient balance');
  end if;

  if current_balance < p_amount then
    return jsonb_build_object('success', false, 'error', 'Insufficient balance');
  end if;

  new_balance := current_balance - p_amount;

  update wallets
  set balance = new_balance
  where user_id = p_user_id;

  insert into transactions (user_id, amount, type, description)
  values (p_user_id, -p_amount, p_type, p_description);

  return jsonb_build_object('success', true, 'new_balance', new_balance);
end;
$$;
