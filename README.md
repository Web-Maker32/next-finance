# Next Finance

A modern personal finance dashboard built with Next.js and Supabase. It helps users track income, spending, budgets, recurring transactions, and monthly insights in a single place.

## Features

- Personalized dashboard with income, expense, savings, and investment summaries
- Transaction management with category and date tracking
- Monthly category budgets with progress indicators
- Recurring transaction tracking for subscriptions and bills
- Insights view comparing current vs previous month
- Secure authentication and per-user data access via Supabase
- Dark mode and a polished, responsive UI

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Supabase for auth and database
- Framer Motion for interface polish
- JSON Server for local mock data support

## Project Structure

```text
.
├── app/                     # Next.js app routes and dashboard pages
├── components/              # Shared UI components
├── hooks/                   # Custom hooks
├── libs/                   # App logic, Supabase helpers, and SQL migrations
│   ├── supabase/
│   ├── consts.js
│   ├── validation.js
│   └── ...
├── public/                 # Static assets
├── db.json                 # Local mock finance data
├── seed.mjs                # Seed script for generating sample Supabase data
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
└── ...
```

## Prerequisites

- Node.js 22.12+
- pnpm (recommended) or npm
- A Supabase project

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

   If you use npm instead:

   ```bash
   npm install
   ```

2. Create a local environment file named `.env.local` in the project root with:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE=your_supabase_service_role_key
   ```

3. Set up the database in Supabase.

   Open the Supabase SQL editor and run the SQL script at `libs/supabase/upgrades.sql`.
   This creates the `budgets` and `recurring_transactions` tables and enables the required row-level security policies.

4. Start the app:

   ```bash
   pnpm dev
   ```

   Then visit:

   - http://localhost:3000

## Optional Seed Data

To generate demo users and sample transactions in Supabase:

```bash
node seed.mjs
```

This script expects the same Supabase environment variables in `.env.local`.

## Available Scripts

```bash
pnpm dev          # Run the Next.js app in development mode
pnpm build        # Create a production build
pnpm start        # Run the production build
pnpm lint         # Run ESLint
pnpm json-server  # Start the local JSON mock server on port 3100
```

## Local Mock Data

A lightweight mock dataset is included in `db.json`. It can be served locally with:

```bash
pnpm run json-server
```

This is useful for testing UI behavior and mock finance data without a live backend.

## Deployment

This project is designed to deploy on a platform like Vercel, with the required Supabase environment variables configured in the deployment environment.

## Notes

- Authentication is handled by Supabase and is wired through the app's server client.
- For production use, make sure your Supabase project has the right policies, storage access, and environment variables configured.
- The app expects a database schema compatible with the transaction and budget views used in the dashboard.

## Contributing

Contributions are welcome. If you are making database or auth changes, update the related SQL and documentation alongside the feature work.
