### Bistro Boss Restaurant — Full‑Stack App

A full‑stack restaurant application with a React (Vite) frontend and a Node/Express backend. Includes authentication (Firebase), role‑based routing, a shopping cart, and checkout flow. The client is set up for Tailwind CSS. The server is configured for deployment on Vercel; the client includes Firebase Hosting config.

### Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS
- **Auth**: Firebase Authentication (email/password and social login)
- **HTTP**: Axios (secured instance with interceptors)
- **Payments**: Stripe (Checkout form/components present)
- **Backend**: Node.js, Express
- **Database**: MongoDB (expected), JWT for protected routes
- **Deploy**: Client on Firebase Hosting; Server on Vercel

### Monorepo Structure

```
restaurant/
  ├─ bistro-boss-restaurant-client/     # Vite + React + Tailwind client
  │  ├─ src/
  │  │  ├─ providers/AuthProvider.jsx   # Firebase auth context
  │  │  ├─ Routes/                      # Router, PrivateRoute, AdminRoute
  │  │  ├─ hooks/                       # useAuth, useAxiosSecure, useCart, useMenu, useAdmin
  │  │  ├─ pages/                       # Home, Menu, Order, Dashboard, etc.
  │  │  └─ firebase/firebase.config.js  # Firebase client config
  │  ├─ public/menu.json                # Sample menu data
  │  ├─ public/reviews.json             # Sample reviews data
  │  ├─ tailwind.config.js
  │  ├─ postcss.config.js
  │  ├─ vite.config.js
  │  └─ firebase.json                   # Firebase hosting config
  └─ bistro-boss-restaurant-server/     # Express server (Vercel-ready)
     ├─ index.js
     ├─ vercel.json                     # Vercel config
     └─ package.json
```

### Key Features

- **Responsive UI** with Tailwind CSS
- **Authentication & Authorization** using Firebase; guarded routes via `PrivateRoute` and role‑based `AdminRoute`
- **Menu browsing** by categories; **cart management** for users
- **Dashboard** for users (orders, payments) and **admin** (manage users/items)
- **Checkout flow** with Stripe components
- **API integration** via secure Axios instance (JWT support expected)

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (Atlas or local)
- Firebase project (Web app) for Authentication
- Stripe account and keys (Publishable + Secret)

### Environment Variables

Create `.env` files as below. Do not commit secrets.

Client (`bistro-boss-restaurant-client/.env`):

```
# API base URL (points to your server)
VITE_API_URL=http://localhost:5000

# Firebase client config
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Stripe publishable key
VITE_STRIPE_PK=pk_test_...
```

Server (`bistro-boss-restaurant-server/.env`):

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster/<db>?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key
STRIPE_SECRET_KEY=sk_test_...

# CORS / client origin
CLIENT_ORIGIN=http://localhost:5173
```

Note: variable names may differ inside the code. If a variable is missing at runtime, check `src/firebase/firebase.config.js`, `src/hooks/useAxiosSecure.jsx`, payment components, and `bistro-boss-restaurant-server/index.js` for exact names.

### Install & Run (Local)

Open two terminals, one for client and one for server.

Client:

```
cd bistro-boss-restaurant-client
npm install
npm run dev
# Vite default: http://localhost:5173
```

Server:

```
cd bistro-boss-restaurant-server
npm install

# Prefer dev if available, otherwise start
npm run dev
# or
npm start

# Expected: http://localhost:5000
```

### Typical API Routes (reference)

These are commonly used in similar apps; consult `bistro-boss-restaurant-server/index.js` for the authoritative list.

- `GET /menu` — fetch menu items
- `GET /reviews` — fetch reviews
- `GET /carts?email=<user>` — get user cart
- `POST /carts` — add to cart
- `DELETE /carts/:id` — remove from cart
- `GET /users` — list users (admin)
- `PATCH /users/admin/:id` — promote to admin
- `POST /create-payment-intent` — Stripe payment intent
- `POST /payments` — record payment

### Firebase Authentication

- Create a Firebase project and a Web App
- Enable Email/Password and desired OAuth provider(s) (e.g., Google)
- Copy the config into client `.env` as `VITE_FIREBASE_*` and/or `src/firebase/firebase.config.js`

### Stripe Setup

- Add publishable key to client `.env` as `VITE_STRIPE_PK`
- Add secret key to server `.env` as `STRIPE_SECRET_KEY`
- Ensure the server exposes a route to create payment intents and the client uses it in the checkout form

### Deployment

Client (Firebase Hosting):

```
cd bistro-boss-restaurant-client
npm run build
# If not initialized:
# npm install -g firebase-tools
# firebase login
# firebase init hosting (choose this folder, set build as dist)
firebase deploy
```

Server (Vercel):

```
cd bistro-boss-restaurant-server
# Ensure vercel.json exists and correct entrypoint (index.js)
# npm i -g vercel
vercel
# or connect repo to Vercel dashboard and set env variables
```

### Project Scripts (common)

Client:

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview build locally

Server:

- `npm run dev` — run with nodemon (if configured)
- `npm start` — run server with Node

### Useful Paths

- `bistro-boss-restaurant-client/src/Routes/Routes.jsx` — route definitions
- `bistro-boss-restaurant-client/src/Routes/PrivateRoute.jsx` — auth guard
- `bistro-boss-restaurant-client/src/Routes/AdminRoute.jsx` — admin guard
- `bistro-boss-restaurant-client/src/hooks/useAxiosSecure.jsx` — secured Axios client
- `bistro-boss-restaurant-client/src/pages/Dashboard/Payment/` — Stripe checkout components
- `bistro-boss-restaurant-server/index.js` — Express server, routes, and middleware

### Troubleshooting

- If API calls fail locally, verify `VITE_API_URL` and server `PORT`, and CORS settings (`CLIENT_ORIGIN`).
- If authentication fails, confirm Firebase config and enabled providers.
- If payments fail, ensure both Stripe keys are correctly set and the server route for payment intents is reachable.

### License

This project is provided as‑is for learning and development. Add a license if you intend to distribute.


