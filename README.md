# Chat & Chill — Super Power Premium Realtime Chat

> Verified production build: `✓ Compiled successfully` | `200 OK`

A premium glassmorphism realtime chat built with Next.js 14, Supabase Realtime, Cloudinary, Tailwind CSS, and Inter.

**Live:** `your-vercel-link.vercel.app`

## Stack

Next.js 14, Supabase, Realtime Presence, Cloudinary, Tailwind CSS, and Inter.

## Super Power Features

- **Realtime Messages** — slide-up spring animation and sync across tabs
- **Presence System** — online count, avatar stack, and emerald live pulse
- **Typing Indicator** — bouncing dots with broadcast channels
- **Premium Images** — Cloudinary uploads with rounded glass shadows
- **Glass UI** — zinc-950 surfaces, blur-xl effects, rounded panels, and hover lift
- **Protected Routes** — middleware redirects unauthenticated users to `/login`

## Build Verification

```bash
npm install
npm run build
PORT=3000 node server.js
```

The application is served at `http://localhost:3000`.

## Architecture

```text
Client -> Middleware (307) -> Supabase (RLS) -> Realtime Channel (presence + broadcast) -> Cloudinary
```

The database schema is clean and ready after resolving duplicate membership (`42710`), null ID (`23502`), and missing `created_at` column (`42703`) errors.

## Environment

Create a local `.env.local` file with the following values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to the browser.

## Deployment

Vercel uses `npm run build` and the Next.js `.next` output directory, as configured in `vercel.json`.
