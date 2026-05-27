<<<<<<< HEAD
# Nutheer System

Enterprise IT services, professional training, and an AI-ready learning platform built with **Next.js 16**, **TypeScript**, **Supabase**, and **Vercel**.

## Features

- Marketing site (services, training, courses, careers, Prefer, contact)
- Auth (login, register, forgot password) via Supabase Auth
- Learning (courses, animated lessons, live sessions)
- User dashboard (bookings, applications, profile)
- Admin stubs (courses, lessons, jobs, sessions, users, Prefer, content)
- Demo mode when Supabase is not configured

## Prerequisites

- Node.js 20+
- npm
- [Supabase](https://supabase.com) project (optional for local demo)
- [Vercel](https://vercel.com) account (for deployment)

## Local setup

1. **Clone and install**

   ```bash
   cd nutheer-system
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` (or create `.env.local`) with:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bmasupuyyhtonkfoaetd.supabase.co 
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtYXN1cHV5eWh0b25rZm9hZXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MTM1OTAsImV4cCI6MjA5NTI4OTU5MH0.aM-NYuOs07VnvZxIyvr8Hg_VaN3_GUnPMJsNJu_d1Uo
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Without Supabase keys, the app runs in **demo mode** with seeded course, job, and session data.

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Production build**

   ```bash
   npm run build
   npm start
   ```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Enable **Email** auth under Authentication → Providers.
3. Create tables aligned with `src/types/database.ts` (profiles, courses, lessons, job_openings, job_applications, live_sessions, session_bookings, prefer_topics, contact_messages, etc.).
4. Enable **Row Level Security** and policies for authenticated users and admins.
5. (Optional) Create a **Storage** bucket for resume uploads linked to job applications.
6. Copy the project **URL** and **anon key** into `.env.local`.

For typed client codegen:

```bash
npx supabase gen types typescript --project-id <your-project-id> > src/types/database.ts
```

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Set environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL, e.g. `https://nutheer.vercel.app`)
4. Deploy. Vercel detects Next.js automatically.
5. In Supabase → Authentication → URL configuration, add your Vercel domain to **Site URL** and **Redirect URLs**.

## Project structure

```
src/
  app/              # App Router routes (marketing, auth, dashboard, admin)
  components/       # UI, layout, common
  features/         # Feature modules (auth, contact, careers, prefer)
  services/         # Data access (Supabase + demo fallbacks)
  lib/              # SEO, validations, Supabase clients
  config/           # Site, routes, navigation
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm start`    | Start production server  |
| `npm run lint` | Run ESLint               |

## License

Private — Nutheer System.
=======
# nutheer-system
This is my company repository
>>>>>>> 4af12243aff801f2aa8f791ddae7e3fd74d0bec6
