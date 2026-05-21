# 👟 SneakerVault API

> **The RESTful backend powering the SneakerVault e-commerce platform — your ultimate destination for premium sneakers.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Stripe](https://img.shields.io/badge/Stripe-17.x-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Seeding](#database-seeding)
- [API Reference](#-api-reference)
  - [Authentication](#-authentication)
  - [Products](#-products)
  - [Cart](#-cart)
  - [Orders](#-orders)
  - [Payment](#-payment)
  - [Reviews](#-reviews)
  - [Wishlist](#-wishlist)
- [Data Models](#-data-models)
- [Security](#-security)
- [Error Handling](#-error-handling)
- [Supported Catalog](#-supported-catalog)

---

## 🌟 Overview

SneakerVault API is a fully-featured, production-ready RESTful backend built with **Node.js** and **Express.js**. It powers a complete sneaker e-commerce experience — from browsing and searching a curated catalog, to cart management, secure Stripe-powered checkout, order tracking, and user reviews.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Secure token-based auth with role-based access control (User / Admin) |
| 🛒 **Cart Management** | Full server-side cart with add, update, remove, and clear operations |
| 💳 **Stripe Payments** | PCI-compliant checkout sessions with webhook verification |
| 📦 **Order Lifecycle** | Complete order tracking from placement through delivery |
| 🔍 **Advanced Search** | Full-text search with filtering, sorting, and pagination |
| ⭐ **Reviews & Ratings** | Product review system with aggregated ratings |
| ❤️ **Wishlist** | Save favorite sneakers for later |
| 🛡️ **Hardened Security** | Helmet, CORS, input validation, and password hashing |

---

## 🛠 Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Runtime** | Node.js | 18.x+ |
| **Framework** | Express.js | 4.21 |
| **Database** | MongoDB Atlas | — |
| **ODM** | Mongoose | 8.7 |
| **Authentication** | jsonwebtoken (JWT) | 9.x |
| **Password Hashing** | bcryptjs | — |
| **Payments** | Stripe | 17.x |
| **Validation** | express-validator | — |
| **Security** | helmet, CORS | — |
| **Configuration** | dotenv | — |

---

## 📁 Project Structure

```
backend/
├── server.js                  # Express app entry point & server bootstrap
├── .env                       # Environment variables (not committed)
│
├── config/
│   └── db.js                  # MongoDB Atlas connection via Mongoose
│
├── models/
│   ├── User.js                # User schema (name, email, password, role, wishlist, cart)
│   ├── Product.js             # Product schema (name, brand, price, sizes, stock, ratings)
│   ├── Order.js               # Order schema (items, shipping, payment status, delivery)
│   └── Review.js              # Review schema (rating, title, comment)
│
├── controllers/
│   ├── authController.js      # Register, Login, Profile, Admin user management
│   ├── productController.js   # CRUD operations, search, filter, pagination
│   ├── cartController.js      # Add, update, remove, clear cart items
│   ├── orderController.js     # Create orders, manage status, admin analytics
│   ├── paymentController.js   # Stripe checkout session, webhook, verification
│   ├── reviewController.js    # Create and retrieve reviews per product
│   └── wishlistController.js  # Add and remove wishlist items
│
├── routes/
│   ├── auth.js                # Authentication routes
│   ├── products.js            # Product routes
│   ├── cart.js                # Cart routes
│   ├── orders.js              # Order routes
│   ├── payment.js             # Payment routes
│   ├── reviews.js             # Review routes
│   └── wishlist.js            # Wishlist routes
│
├── middleware/
│   ├── auth.js                # JWT verification & role-based access control
│   └── errorHandler.js        # Centralized error handling middleware
│
└── utils/
    └── seedData.js            # Database seeder with sample sneaker data
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.x or higher — [Download](https://nodejs.org/)
- **npm** v9.x or higher (ships with Node.js)
- **MongoDB Atlas** account — [Sign Up Free](https://www.mongodb.com/cloud/atlas/register)
- **Stripe** account — [Sign Up](https://dashboard.stripe.com/register)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sneakervault.git
   cd sneakervault/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [section below](#environment-variables))

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The API will start on `http://localhost:5000` (or your configured `PORT`).

### Environment Variables

Create a `.env` file in the `backend/` root directory with the following variables:

```env
# ─── Server ───────────────────────────────────────
PORT=5000

# ─── Database ─────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sneakervault?retryWrites=true&w=majority

# ─── Authentication ───────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# ─── Stripe ───────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ─── Client ───────────────────────────────────────
CLIENT_URL=http://localhost:5173
```

> [!CAUTION]
> Never commit your `.env` file to version control. Ensure it is listed in `.gitignore`.

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Server port (default: `5000`) |
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens |
| `JWT_EXPIRE` | ✅ | Token expiration duration (e.g., `7d`, `24h`) |
| `STRIPE_SECRET_KEY` | ✅ | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook endpoint signing secret |
| `CLIENT_URL` | ✅ | Frontend application URL (for CORS) |

### Database Seeding

Populate your database with sample sneaker products:

```bash
npm run seed
```

This will insert a curated catalog of sneakers across all supported brands and categories.

---

## 📡 API Reference

**Base URL:** `http://localhost:5000/api`

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Legend: 🌐 Public • 🔒 Authenticated • 🛡️ Admin Only

---

### 🔐 Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | 🌐 Public | Register a new user account |
| `POST` | `/api/auth/login` | 🌐 Public | Login and receive JWT token |
| `GET` | `/api/auth/me` | 🔒 Auth | Get current user profile |
| `GET` | `/api/auth/users` | 🛡️ Admin | List all registered users |

<details>
<summary><strong>POST</strong> <code>/api/auth/register</code> — Register a new user</summary>

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** `201 Created`:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "664f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

</details>

<details>
<summary><strong>POST</strong> <code>/api/auth/login</code> — Authenticate and receive token</summary>

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** `200 OK`:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

</details>

---

### 👟 Products

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/products` | 🌐 Public | Get all products (search, filter, paginate) |
| `GET` | `/api/products/:id` | 🌐 Public | Get a single product by ID |
| `POST` | `/api/products` | 🛡️ Admin | Create a new product |
| `PUT` | `/api/products/:id` | 🛡️ Admin | Update an existing product |
| `DELETE` | `/api/products/:id` | 🛡️ Admin | Delete a product |

<details>
<summary><strong>GET</strong> <code>/api/products</code> — Query Parameters</summary>

| Parameter | Type | Description | Example |
|---|---|---|---|
| `search` | `string` | Full-text search on name/brand | `?search=air+max` |
| `brand` | `string` | Filter by brand | `?brand=Nike` |
| `category` | `string` | Filter by category | `?category=Running` |
| `minPrice` | `number` | Minimum price filter | `?minPrice=50` |
| `maxPrice` | `number` | Maximum price filter | `?maxPrice=200` |
| `sort` | `string` | Sort field and direction | `?sort=-price` |
| `page` | `number` | Page number (default: 1) | `?page=2` |
| `limit` | `number` | Results per page (default: 10) | `?limit=20` |

**Example Request:**

```
GET /api/products?brand=Nike&category=Running&minPrice=80&maxPrice=200&sort=-price&page=1&limit=10
```

</details>

---

### 🛒 Cart

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/cart` | 🔒 Auth | Get current user's cart |
| `POST` | `/api/cart` | 🔒 Auth | Add an item to the cart |
| `PUT` | `/api/cart/:itemId` | 🔒 Auth | Update item quantity/size |
| `DELETE` | `/api/cart/:itemId` | 🔒 Auth | Remove a specific item from cart |
| `DELETE` | `/api/cart` | 🔒 Auth | Clear the entire cart |

<details>
<summary><strong>POST</strong> <code>/api/cart</code> — Add item to cart</summary>

**Request Body:**

```json
{
  "productId": "664f...",
  "quantity": 1,
  "size": "10"
}
```

</details>

---

### 📦 Orders

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/orders` | 🔒 Auth | Place a new order |
| `GET` | `/api/orders/my` | 🔒 Auth | Get current user's orders |
| `GET` | `/api/orders/:id` | 🔒 Auth | Get a specific order by ID |
| `GET` | `/api/orders` | 🛡️ Admin | Get all orders |
| `PUT` | `/api/orders/:id/status` | 🛡️ Admin | Update order status |
| `GET` | `/api/orders/stats/summary` | 🛡️ Admin | Get order analytics & summary |

<details>
<summary><strong>PUT</strong> <code>/api/orders/:id/status</code> — Update order status (Admin)</summary>

**Request Body:**

```json
{
  "status": "shipped"
}
```

**Supported Statuses:** `pending` → `processing` → `shipped` → `delivered` → `cancelled`

</details>

---

### 💳 Payment

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/payment/create-checkout-session` | 🔒 Auth | Create a Stripe checkout session |
| `POST` | `/api/payment/webhook` | 🌐 Stripe | Stripe webhook event handler |
| `GET` | `/api/payment/verify` | 🔒 Auth | Verify payment session status |

<details>
<summary><strong>POST</strong> <code>/api/payment/create-checkout-session</code> — Initiate Stripe Checkout</summary>

**Request Body:**

```json
{
  "orderId": "664f..."
}
```

**Response** `200 OK`:

```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

> [!NOTE]
> The `url` should be used to redirect the customer to Stripe's hosted checkout page.

</details>

<details>
<summary><strong>POST</strong> <code>/api/payment/webhook</code> — Stripe Webhook</summary>

This endpoint is called directly by Stripe. It verifies the webhook signature using `STRIPE_WEBHOOK_SECRET` and processes events such as `checkout.session.completed` to update order payment status.

> [!IMPORTANT]
> The webhook endpoint must receive the **raw request body** (not parsed JSON). Ensure `express.raw()` middleware is applied to this route.

</details>

---

### ⭐ Reviews

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/products/:id/reviews` | 🌐 Public | Get all reviews for a product |
| `POST` | `/api/products/:id/reviews` | 🔒 Auth | Submit a review for a product |

<details>
<summary><strong>POST</strong> <code>/api/products/:id/reviews</code> — Submit a review</summary>

**Request Body:**

```json
{
  "rating": 5,
  "title": "Best running shoes ever!",
  "comment": "Incredible comfort and support. Worth every penny."
}
```

| Field | Type | Required | Constraints |
|---|---|---|---|
| `rating` | `number` | ✅ | 1–5 |
| `title` | `string` | ✅ | Max 100 characters |
| `comment` | `string` | ✅ | Max 1000 characters |

</details>

---

### ❤️ Wishlist

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/wishlist/:productId` | 🔒 Auth | Add a product to wishlist |
| `DELETE` | `/api/wishlist/:productId` | 🔒 Auth | Remove a product from wishlist |

---

## 📐 Data Models

### User

```javascript
{
  name:     String,       // required
  email:    String,       // required, unique
  password: String,       // required, hashed with bcryptjs
  role:     String,       // "user" | "admin" (default: "user")
  wishlist: [ObjectId],   // references → Product
  cart: [{
    product:  ObjectId,   // references → Product
    quantity: Number,
    size:     String
  }]
}
```

### Product

```javascript
{
  name:        String,    // required
  brand:       String,    // required (Nike, Adidas, Jordan, etc.)
  price:       Number,    // required
  category:    String,    // Running, Casual, Sports, Limited Edition
  description: String,
  image:       String,    // product image URL
  sizes:       [String],  // available sizes
  stock:       Number,    // inventory count
  ratings: {
    average:   Number,    // aggregated average rating
    count:     Number     // total number of reviews
  }
}
```

### Order

```javascript
{
  user:          ObjectId,    // references → User
  items: [{
    product:     ObjectId,    // references → Product
    quantity:    Number,
    size:        String,
    price:       Number       // price at time of purchase
  }],
  totalAmount:   Number,
  shippingAddress: {
    address:     String,
    city:        String,
    state:       String,
    zipCode:     String
  },
  paymentStatus: String,      // "pending" | "paid" | "failed"
  orderStatus:   String,      // "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  stripeSessionId: String
}
```

### Review

```javascript
{
  user:      ObjectId,    // references → User
  product:   ObjectId,    // references → Product
  rating:    Number,      // 1–5
  title:     String,
  comment:   String,
  createdAt: Date
}
```

---

## 🛡 Security

This API implements multiple layers of security:

| Measure | Implementation |
|---|---|
| **Password Hashing** | All passwords are salted and hashed using `bcryptjs` before storage |
| **JWT Tokens** | Stateless authentication with configurable expiration |
| **Role-Based Access** | Middleware enforces `user` vs `admin` permissions per route |
| **HTTP Headers** | `helmet` sets security headers (CSP, HSTS, X-Frame-Options, etc.) |
| **CORS** | Cross-Origin Resource Sharing configured to allow only `CLIENT_URL` |
| **Input Validation** | `express-validator` sanitizes and validates all incoming request data |
| **Webhook Verification** | Stripe webhook signatures are cryptographically verified |
| **NoSQL Injection** | Mongoose schemas enforce types and sanitize queries |

---

## ⚠️ Error Handling

All errors are processed by a centralized error-handling middleware and return consistent JSON responses:

```json
{
  "success": false,
  "error": "Descriptive error message",
  "stack": "..." 
}
```

> [!NOTE]
> Stack traces are only included in **development** mode. In production, error responses omit stack details for security.

| Status Code | Meaning |
|---|---|
| `400` | Bad Request — validation errors or malformed input |
| `401` | Unauthorized — missing or invalid JWT token |
| `403` | Forbidden — insufficient permissions (e.g., non-admin) |
| `404` | Not Found — resource does not exist |
| `500` | Internal Server Error — unexpected server failure |

---

## 🏷 Supported Catalog

### Brands

| Brand | | Brand | | Brand |
|---|---|---|---|---|
| Nike | | Adidas | | Jordan |
| New Balance | | Puma | | Reebok |
| Converse | | Vans | | |

### Categories

| Category | Description |
|---|---|
| 🏃 **Running** | Performance running and athletic shoes |
| 👟 **Casual** | Everyday lifestyle and streetwear kicks |
| ⚽ **Sports** | Training, basketball, and sport-specific footwear |
| 🔥 **Limited Edition** | Exclusive drops, collabs, and rare releases |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Start server in development mode (with hot-reload) |
| `npm start` | Start server in production mode |
| `npm run seed` | Seed database with sample sneaker data |

---

<div align="center">

**Built with ❤️ for sneakerheads everywhere**

Made with Node.js, Express, MongoDB & Stripe

</div>
