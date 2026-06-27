# Day 30 Vocal Series Finale - Payment Proof Portal

## Setup

```bash
cp .env.example .env
pnpm install
pnpm dev
```

## Supabase

1. Create a Supabase project.
2. Copy Project URL and anon public key into `.env`.
3. Open Supabase SQL Editor and run `supabase/schema.sql`.
4. Create an admin user in Supabase Authentication.
5. Visit `/admin/login`.

## Removed Fields

The form does not collect bank paid into, transaction reference, payment purpose, or amount paid.
