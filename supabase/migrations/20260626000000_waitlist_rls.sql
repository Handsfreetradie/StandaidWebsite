-- Create waitlist table if it doesn't already exist
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anyone (anon) to insert their email
drop policy if exists "anon can insert waitlist" on public.waitlist;
create policy "anon can insert waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Allow anyone to count rows (used for the waitlist counter on the site)
drop policy if exists "anon can read waitlist count" on public.waitlist;
create policy "anon can read waitlist count"
  on public.waitlist
  for select
  to anon
  using (true);
