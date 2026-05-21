# 🛒 SneakerVault — Premium E-Commerce Platform (India)

A modern, ultra-premium sneaker e-commerce web application built using the **MERN stack** (MongoDB, Express, React/Next.js, Node.js), designed specifically for **Indian users**.

This project has been developed step-by-step to simulate a **real-world production-level e-commerce platform**, focusing on clean architecture, scalability, and best practices.

> 🔗 **Live Demo**: _Coming Soon_

---

## 🖼️ Preview

| Dark Mode | Light Mode |
|-----------|------------|
| Midnight Zinc theme with violet accents | Warm violet theme with clean whites |

---

## 🚀 Features

### ✅ Implemented (Day-01)
- Modern responsive UI using **Next.js 16 + Tailwind CSS v4**
- Premium dark-themed landing page (Hero section with snap-scroll)
- Reusable Navbar component with glassmorphism effect
- Server-side rendering with **Next.js App Router**
- Clean and scalable project structure (monorepo: `frontend/` + `backend/`)
- Git & GitHub version control

---

### ✅ Implemented (Day-02)
- Product listing page with responsive grid layout
- Reusable **ProductCard** component with 3D flip animation on hover
- Real product data from MongoDB (API-connected)
- Add to Cart functionality
- Cart management using **React Context API**
- Live cart count badge update in Navbar
- Cart page with product images, quantity controls & remove
- Total price calculation with tax & shipping
- Empty cart state with animated illustration
- Free shipping progress bar

---

### ✅ Implemented (Day-03)
- Authentication foundation using **React Context API**
- Login & Signup functionality (JWT-based)
- Global auth state management via `AuthContext`
- Navbar auth state (Login / Logout / Avatar)
- Guest-friendly cart (add items without login, stored in localStorage)
- Auth-aware checkout flow (login required before payment)
- Login enforced only at checkout stage (real-world UX)
- Clean separation of cart and authentication logic

---

### ✅ Implemented (Day-04) ⭐
- Persistent authentication using **localStorage** (JWT token)
- Persistent cart state across page refresh (synced with backend for logged-in users)
- Production-ready `AuthContext` & `CartContext` architecture
- User remains logged in after page reload
- Cart items preserved after refresh
- Profile avatar displayed in Navbar after login
- Logout functionality with proper state cleanup
- **Dark / Light theme toggle** with `ThemeContext` and CSS custom properties
- Defensive UI handling to prevent runtime crashes

---

### ✅ Implemented (Day-05) 🚀
**Complete Checkout Flow & UI Stabilization**

- Protected checkout routes (login required)
- Checkout page with product summary, thumbnails & total price
- **Dual payment method selection** — Pay with Card (Stripe) or Cash on Delivery
- Animated radio-button payment method picker
- Delivery address form with clean, responsive layout (Street, City, State, ZIP, Country)
- Order success page with automatic **payment verification**
- Stripe test card info displayed conditionally
- SSL security badge in order summary
- Cart clearance after successful order
- UI polished across Products, Login, Checkout & Cart pages
- Production-level routing & state handling

---

### ✅ Implemented (Day-06) 🔐
**Backend Orders & Authentication Foundation**

- Connected **MongoDB Atlas** using Mongoose ODM
- Environment-based configuration using `.env`
- Designed Order schema with items, shipping, payment status & timestamps
- Implemented Orders API:
  - `POST /api/orders` → create order with stock validation
  - `GET /api/orders/my` → fetch user's orders
  - `GET /api/orders/:id` → fetch single order
- Created User model with password hashing (**bcryptjs**)
- Implemented JWT-based authentication
- Built authentication middleware to protect backend routes
- Followed **MVC architecture** (models, controllers, routes)
- Global error handler middleware with structured JSON responses

---

### ✅ Implemented (Day-07) 🛡️🔥
**Secure Auth Flow, Protected APIs & Testing**

- User Registration API (`POST /api/auth/register`)
- JWT token generation on successful registration
- Protected Orders API using JWT middleware
- Authorization via `Bearer Token`
- Order creation linked to authenticated user (`req.user._id`)
- Order validation with required fields
- API testing using **Thunder Client / Postman**
- Clean API responses with proper status codes
- Role-based access control (user / admin)

---

### ✅ Implemented (Day-08) 🔑🧠
**Login API, Backend Stability & Production Debugging**

- Implemented **User Login API** (`POST /api/auth/login`)
- Secure password comparison using **bcryptjs**
- JWT token generation on successful login
- End-to-end authentication flow (Register → Login → Protected Routes)
- Profile endpoint (`GET /api/auth/me`)
- Backend stability with comprehensive error handling
- Helmet security headers integration
- CORS configuration for frontend origin

---

### ✅ Implemented (Day-09) 🛍️📦
**Products API & Public Catalog Backend**

- Designed **Product model** with real-world fields (brand, sizes, stock, ratings, tags)
- Product CRUD APIs (Admin-ready)
- Public product listing API with:
  - Text search across name, brand, description, tags
  - Category & brand filtering
  - Price range filtering
  - Sorting (price, rating, newest)
  - Pagination with page & limit
- Product reviews & ratings system
- Average rating calculation
- Soft delete using `isActive` flag
- Brand enum: Nike, Adidas, Jordan, New Balance, Puma, Reebok, Converse, Vans
- Category enum: Running, Casual, Sports, Limited Edition
- Text & compound indexes for search performance

---

### ✅ Implemented (Day-10) 🛒📦
**Cart & Order Architecture (Production-Grade)**

- Cart model linked to authenticated users
- Add / update / remove cart items via API
- Cart populated with full product details (images, price, name)
- Secure cart APIs with JWT authentication
- Order placement from cart with:
  - Server-side price validation (prevents client manipulation)
  - Size-specific stock verification
  - Automatic stock reduction on order
- Automatic cart clearance after order placement
- Shipping address handling (street, city, state, ZIP, country)
- Free shipping calculation (orders over $100)
- Tax calculation (8%)
- Guest cart stored in localStorage, synced on login

---

### ✅ Implemented (Day-11) 🧑‍💼📊
**Admin Order Management & Stock Control**

- Admin-only order management APIs
- View all orders with pagination & filters (status, payment)
- Update order status (delivery status, payment status, tracking number)
- Stock reduction on order placement
- Out-of-stock validation (backend rejects oversold sizes)
- **Revenue analytics API** (`GET /api/orders/stats/summary`):
  - Total orders, revenue, users, products
  - Recent orders
  - Status distribution
- Production-ready admin-user role separation

---

### ✅ Implemented (Day-12) 📊📈
**Admin Analytics Dashboard**

- Protected Admin Dashboard UI (role-based access)
- Dashboard stats cards (Total Revenue, Orders, Users, Products)
- Order management table with status badges
- Product management (add/edit/delete products)
- User management (view all users)
- MongoDB aggregation pipelines for analytics
- Clean admin layout with sidebar navigation
- Responsive admin interface

---

### ✅ Implemented (Day-13) 💳🔥
**Stripe Backend Payment System**

- Secure Stripe Checkout Session creation
- Backend-controlled payment amount validation
- Stripe metadata linked with Order ID
- Webhook integration with signature verification
- Raw body parsing for Stripe webhook security
- Automatic order update on `checkout.session.completed`
- Secure storage of `stripeSessionId` and `stripePaymentIntentId`
- Image URL validation (filters non-HTTPS URLs for Stripe compatibility)
- Database sync (`paymentStatus: pending → paid`)
- Production-ready payment architecture

---

### ✅ Implemented (Day-14) 💳⚡🔥
**Full Stripe Frontend Integration & Cash on Delivery**

- Stripe Checkout redirect-based payment flow
- Secure session creation from backend
- Payment confirmation via `GET /api/payment/verify`
- Auto-redirect to Order Success page after Stripe payment
- **Cash on Delivery** (COD) payment option:
  - Order placed without Stripe
  - Redirects to success page directly
- Animated payment method selector (Card vs COD)
- Stripe test card info banner (conditional display)
- Payment status auto-sync with database on success page
- Order marked as paid after verification
- Payment spinner → confirmation badge animation
- Production-level end-to-end payment lifecycle:
  `Cart → Checkout → Stripe/COD → Verify → Success → Orders`

---

### ✅ Implemented (Day-15) 🔁💸🔥
**Wishlist, Reviews & User Dashboard**

- **Wishlist system**:
  - Add/remove products from wishlist (heart icon)
  - Wishlist tab in user dashboard
  - Persistent across sessions
- **Product reviews & ratings**:
  - Star rating selector with hover animations
  - Review form (title + comment + rating)
  - Reviews list with user avatars & dates
  - Average rating displayed on product cards
- **User Dashboard** with tabbed interface:
  - Orders tab (order history with status badges)
  - Profile tab (user info)
  - Wishlist tab (saved products)
- Clean state management across all features

---

### ✅ Implemented (Day-16) 🎨✨🔥
**Ultra-Premium Frontend Architecture & UX System**

- Cinematic hero section with animated gradient text & floating sneaker cards
- Section-based **snap-scroll** system on homepage
- Framer Motion page transitions & micro-interactions
- **Product card flip animation** (front: image + price, back: description + details)
- Dynamic **dark/light theme** with CSS custom properties
- Glassmorphism navbar with backdrop blur
- Featured products section with staggered reveal animations
- Categories section with gradient hover effects
- Promotional banner with countdown aesthetics
- Ultra-premium footer with brand links & social icons
- Scroll-reactive navbar opacity
- Custom scrollbar styling
- Background gradient orbs with blur effects
- Noise texture overlay for depth
- Progress bars with gradient fills
- Skeleton loading states with shimmer animation
- Responsive grid architecture across all breakpoints

---

### ✅ Implemented (Day-17) 🔍📱
**Enhanced Product Detail Page & Cart UX**

- **Rich product detail page** with 3-tab system:
  - **Details & Features** tab: key features with animated checkmarks, care instructions, available colors with swatches, tags
  - **Specifications** tab: 4 feature cards (Cushioning, Material, Outsole, Weight) with hover elevation + full specs table
  - **Reviews** tab: write & browse reviews
- **Brand-specific content** for Nike, Adidas, Jordan, New Balance, Puma, Converse
- Technology highlight banner (⚡) in product sidebar
- Image gallery with thumbnail strip & angle labels
- Related products section ("You Might Also Like")
- **Cart page images** — real product images instead of emoji placeholders
- Hover zoom effect on cart item images
- Product thumbnails in checkout order summary

---

## 🛡️ Security Highlights

- JWT-based authentication with Bearer tokens
- Role-based admin access control
- Backend-controlled payment amount validation
- Stripe webhook signature verification
- Secure environment variable handling (`.env`)
- Helmet HTTP security headers
- CORS origin restriction
- Protected API routes with middleware
- Password hashing with bcryptjs
- Stripe image URL sanitization
- Global error handler with structured responses

---

## 🏗️ Architecture Highlights

- **Monorepo** structure (`frontend/` + `backend/`)
- MVC backend architecture (Models → Controllers → Routes)
- Next.js App Router with file-based routing
- React Context API for state management (Auth, Cart, Theme)
- Role-based user/admin separation
- Payment lifecycle: Cart → Order → Stripe/COD → Verify → Dashboard
- Inventory management with size-level stock tracking
- CSS Design System with custom properties & theme tokens
- Responsive-first design with CSS Grid & Flexbox
- Axios HTTP client with JWT interceptor

---

## 🎯 UI / UX Enhancements

- Scroll-reactive glassmorphism navbar
- Dark / Light theme toggle with smooth CSS transitions
- Active route highlighting with animated underline
- Smooth dropdown animation for authenticated users
- Role-aware avatar system
- Clean state-driven button rendering
- Section snap-scroll with controlled release
- Responsive grid architecture
- Framer Motion micro-interactions & hover effects
- Skeleton shimmer loading states
- Toast notifications for user feedback
- Premium gradient text effects
- Background orb decorations with blur

---

## 🧩 Frontend Architecture Highlights

- Component-driven Next.js App Router structure
- Context API for Authentication, Cart & Theme state
- Snap-scroll container with section management
- Framer Motion `AnimatePresence` for tab transitions
- Custom CSS design system (no utility-first dependency)
- Modular component organization (`home/`, `layout/`, `products/`, `ui/`)
- Axios instance with automatic JWT token injection
- Image-first product displays throughout the app

---

## 🔜 Upcoming Features (Day-18+)

- Razorpay integration (India payment gateway)
- Order cancellation & refund system
- Return & replacement workflow
- Email notifications (Order / Shipping / Refund)
- Invoice PDF generation
- Cloudinary image upload integration
- Product image zoom on hover
- Performance optimization (ISR, image optimization)
- Production logging & monitoring
- Deployment (Render / Railway / Vercel)
- CI/CD pipeline setup

---

## 🏗️ Architecture Overview

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + React 19 + Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Backend | Node.js + Express.js 4 (MVC) |
| Database | MongoDB Atlas (Mongoose 8 ODM) |
| Authentication | JWT (Role-Based Access) |
| Payments | Stripe Checkout + Cash on Delivery |
| Security | Helmet + CORS + Protected Routes |
| Styling | Custom CSS Design System + Theme Tokens |
| HTTP Client | Axios with JWT Interceptor |
| Notifications | react-hot-toast |
| Icons | react-icons (HeroIcons) |
| Environment | dotenv |

---

## 🧠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion
- Swiper.js
- Axios
- react-hot-toast
- react-icons
- @stripe/react-stripe-js

### Backend
- Node.js
- Express.js
- JWT Authentication (jsonwebtoken)
- bcryptjs
- Mongoose ODM
- Stripe SDK
- Helmet
- express-validator

### Database
- MongoDB Atlas

### Tools
- Git & GitHub
- VS Code
- npm
- Thunder Client / Postman
- Stripe CLI (webhook testing)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Stripe account (free test mode)

### Clone the repository
```bash
git clone https://github.com/Aditya-dxt/mern-ecommerce-india.git
cd mern-ecommerce-india
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=http://localhost:3000
```

Seed the database (optional):
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### Access the app
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)
- Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📂 Project Structure

```
mern-ecommerce-india/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Pages (App Router)
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Auth, Cart, Theme providers
│   │   └── lib/             # API utilities
│   └── package.json
├── backend/                 # Express.js REST API
│   ├── config/              # Database connection
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth & error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Seeder & helpers
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Aditya**
- GitHub: [@Aditya-dxt](https://github.com/Aditya-dxt)

---

> Built with ❤️ in India 🇮🇳
