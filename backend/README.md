# PayKuberFX Backend (Auth)

## Requirements
- Node 18+
- MongoDB running locally or provide remote URI

## Setup
1. clone repo
2. cd backend
3. npm install
4. copy .env.example to .env and fill values (MONGO_URI, JWT_SECRET, AES_KEY/IV)
5. npm run dev   (uses nodemon) or npm start

## Endpoints
- POST /api/auth/signup
  body: { name?, email, password }
  returns: { message, token }

- POST /api/auth/login
  body: { email, password }
  returns: { message, token }

- GET /api/profile  (protected)
  header: Authorization: Bearer <token>

## Notes
- Passwords are hashed with bcrypt (one-way, cannot be decrypted) — this is best practice.
- utils/crypto.js provides optional AES encrypt/decrypt for other fields (not passwords).
