create extension if not exists pgcrypto;

create table if not exists public.payment_submissions (
  id uuid primary key default gen_random_uuid(),
  reference_no text unique not null,
  full_name text not null,
  phone text not null,
  email text not null,
  payment_date date not null,
  proof_file_path text not null,
  status text not null default 'PENDING' check (status in ('PENDING','VERIFIED','REJECTED','NEEDS_CLARIFICATION')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_payment_submissions_updated_at on public.payment_submissions;
create trigger set_payment_submissions_updated_at
before update on public.payment_submissions
for each row execute function public.set_updated_at();

alter table public.payment_submissions enable row level security;

-- Public can submit. Admin reads/updates after login.
drop policy if exists "public can create payment submissions" on public.payment_submissions;
create policy "public can create payment submissions"
on public.payment_submissions for insert
to anon, authenticated
with check (true);

drop policy if exists "authenticated can read payment submissions" on public.payment_submissions;
create policy "authenticated can read payment submissions"
on public.payment_submissions for select
to authenticated
using (true);

drop policy if exists "authenticated can update payment submissions" on public.payment_submissions;
create policy "authenticated can update payment submissions"
on public.payment_submissions for update
to authenticated
using (true)
with check (true);

-- Create storage bucket in Supabase dashboard named: payment-proofs
-- Then add this storage policy:
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

create policy "public can upload payment proofs"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'payment-proofs');

create policy "public can view payment proofs"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'payment-proofs');
