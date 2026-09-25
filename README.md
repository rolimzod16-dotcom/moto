# Pamir Motoride

Motorcycle and 4x4 rental website for Tajikistan. English and Russian. Request-based booking: a form creates a reference number; staff confirm after checking fleet, documents and the route.

## Stack

Next.js 16, next-intl, Prisma, Neon Postgres, Vercel Blob, Auth.js (admin).

## Local

```bash
cd pamir-motoride
npm install
npx vercel env pull .env.local --yes
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3000 (redirects to `/en`).

## Admin

- URL: `/admin`
- Email: `admin@pamirmotoride.com`
- Password: set `ADMIN_PASSWORD` before seed, default `MotorideAdmin2026!`

Roles: Administrator, Sales, Operations, Content Editor (seed includes Admin and Sales).

## Notes

- Prices on the public site are **Price on request** until the client approves numbers.
- Reviews stay empty until the client supplies approved guest quotes.
- Contact phone and WhatsApp are placeholders until the client confirms live numbers.
- Email sending uses Resend when `RESEND_API_KEY` is present.
