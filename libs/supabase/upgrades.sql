-- Run in the Next Finance Supabase SQL editor.
-- Does not add bank accounts or receipts.

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category text not null,
  monthly_limit numeric(14, 2) not null check (monthly_limit > 0),
  created_at timestamptz not null default now(),
  unique (user_id, category)
);

create table if not exists public.recurring_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  description text not null,
  amount numeric(14, 2) not null,
  type text not null default 'Expense',
  category text not null default 'Other',
  interval text not null default 'monthly',
  next_date date not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.budgets enable row level security;
alter table public.recurring_transactions enable row level security;

drop policy if exists "budgets_own" on public.budgets;
create policy "budgets_own" on public.budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "recurring_own" on public.recurring_transactions;
create policy "recurring_own" on public.recurring_transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
