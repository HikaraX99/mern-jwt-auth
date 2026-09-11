# MERN JWT Auth

A full-stack authentication app using MongoDB, Express, React, and Node.js. The TypeScript backend handles authentication, while the frontend uses Vite, Chakra UI, and TanStack Query.

## Features

- Registration, login, and logout with hashed passwords.
- JWT access and refresh tokens stored in HTTP-only cookies, with automatic token refresh.
- Email verification and password reset through Resend.
- Protected profile and settings pages, plus session management.

## Setup

Requires Node.js (the backend's `.nvmrc` specifies `22.15.1`), npm, MongoDB, and a Resend API key.

1. Install dependencies from the project root:

   ```sh
   npm install --prefix backend
   npm install --prefix frontend
   ```

2. Create `backend/.env`:

   ```env
   NODE_ENV=development
   PORT=4004
   MONGO_URI=mongodb://127.0.0.1:27017/mern-jwt-auth
   APP_ORIGIN=http://localhost:5173
   JWT_SECRET=replace-with-a-random-secret
   JWT_REFRESH_SECRET=replace-with-a-different-random-secret
   EMAIL_SENDER=you@your-domain.com
   RESEND_API_KEY=your-resend-api-key
   ```

   Replace the placeholders with your values. Generate each JWT secret with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`.

3. Create `frontend/.env` using `frontend/sample.env`:

   ```env
   VITE_API_URL=http://localhost:4004
   ```

4. Run each app in a separate terminal, starting from the project root:

   ```sh
   cd backend
   npm run dev
   ```

   ```sh
   cd frontend
   npm run dev
   ```

Open `http://localhost:5173`. If Vite uses another port, update `APP_ORIGIN` to match. The API runs on port `4004`, with routes under `/auth`, `/user`, and `/sessions`.

In development, `backend/src/utils/sendMail.ts` redirects emails to `delivered@resend.dev`; verification and reset messages will not reach the registered user's inbox.

## Commands

- Run `npm run build` inside either app to build it.
- Run `npm run lint` or `npm run preview` inside `frontend/` to lint or preview the frontend build.
