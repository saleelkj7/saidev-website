# SAIDEV — Truly Vegetarian Restaurant Platform

Complete online food ordering platform for SAIDEV restaurant, JB Nagar, Andheri East, Mumbai.

## Quick Start

```bash
npm install
cp .env.example .env.local   # edit as needed
npm run dev
```

Visit http://localhost:3000

Default admin: skannanj7@gmail.com / Admin@123

## Admin Portal

http://localhost:3000/admin/login

## Tech Stack

- Next.js 16 + TypeScript + Tailwind CSS
- SQLite (better-sqlite3) — auto-created & seeded on first run
- JWT auth (httpOnly cookies) + bcryptjs
- Resend for transactional emails

## Environment Variables

See `.env.example` for all required variables.

## Menu Data

161 items across 28 categories, extracted from official SAIDEV menu images.
