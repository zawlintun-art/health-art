# Health OS

A monolithic fullstack health application built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL on Neon.

## Included features

- Email/password authentication with secure signed session cookies
- Registration with full identity fields and onboarding flow
- BMI and daily water intake calculation stored in the database
- User dashboard with monthly steps and hydration graphs
- Daily steps and water logging
- Weekly wellbeing rating submission
- Admin dashboard with user growth and weekly rating graphs
- Admin user management with create, role update, and delete actions
- Route handlers for auth, users, health logs, ratings, admin, and AI chat

## Routes

- `/login`
- `/register`
- `/onboarding`
- `/dashboard`
- `/admin/dashboard`
- `/admin/users`

## Environment

Copy the example values if needed:

```bash
cp .env.example .env.local
cp .env.example .env
```

This repo already includes local environment files for the provided Neon database and Blob token.

## Commands

```bash
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm build
```
