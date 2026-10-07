# AAFI Designs

## Authentication

The backend is the source of truth for authentication and roles. New accounts are created at `/signup`; regular users land on `/book`, and database-backed administrators land on `/admin`. Frontend guards protect user and admin pages, while the backend independently verifies identity and database role for admin APIs.

Access tokens are short-lived and kept in memory. A rotating, opaque refresh token is stored in an HTTP-only cookie, allowing a valid session to survive browser refresh without exposing the refresh token to frontend JavaScript. Signing out revokes the refresh session.

## Local setup

1. Configure `backend/.env` with the database connection, administrator login email, a unique administrator password of at least 12 characters, and a cryptographically random `JWT_SECRET` of at least 32 characters.
2. Start MySQL and run `npm start` from `backend`. On first startup, the backend hashes the configured administrator password into the `admins` table. The example placeholder password is deliberately not seeded.
3. Run `npm install` and `npm run dev` from `frontend`. The default API URL is `http://localhost:5000/api`.
4. Visit `/login` to sign in or `/signup` to create a regular user account.

If the `admins` table is empty, create an administrator from an interactive terminal by running `npm run admin:create` in `backend`. Enter the admin email and a unique password (12-72 characters); password input is hidden and only its bcrypt hash is stored. Then open `/admin/login`.

Never commit `.env` files. If SMTP or JWT credentials have been exposed, revoke or rotate them.

## Checks

- `npm run build` creates the production frontend bundle.
- `npm run lint` runs ESLint. Existing unrelated lint violations in the repository may need to be resolved separately.
