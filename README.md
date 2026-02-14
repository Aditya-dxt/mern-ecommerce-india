# 🛒 MERN E-Commerce Website (India)

A modern, premium e-commerce web application built using the **MERN stack**, designed specifically for **Indian users**.

This project is being developed step-by-step to simulate a **real-world production-level e-commerce platform**, focusing on clean architecture, scalability, and best practices.

---

## 🚀 Features

### ✅ Implemented (Day-01)
- Modern responsive UI using **React + Tailwind CSS**
- Premium landing page (Hero section)
- Reusable Navbar component
- Client-side routing with **React Router**
- Clean and scalable project structure
- Git & GitHub version control

---

### ✅ Implemented (Day-02)
- Product listing page with grid layout
- Reusable Product Card component
- Dummy product data (API-ready structure)
- Add to Cart functionality
- Cart management using **React Context API**
- Live cart count update in Navbar
- Cart page with product details
- Remove item from cart
- Total price calculation
- Empty cart state handling

---

### ✅ Implemented (Day-03)
- Authentication foundation using **React Context API**
- Login functionality (Email-based, mock logic)
- Global auth state management
- Navbar auth state (Login / Logout)
- Guest-friendly cart (add items without login)
- Buy Now functionality on product cards
- Auth-aware Buy Now flow (login required before checkout)
- Login enforced only at checkout stage (real-world UX)
- Clean separation of cart and authentication logic

---

### ✅ Implemented (Day-04) ⭐
- Persistent authentication using **localStorage**
- Persistent cart state across page refresh
- Production-ready AuthContext & CartContext architecture
- User remains logged in after page reload
- Cart items preserved after refresh
- Profile avatar displayed in Navbar after login
- Logout functionality with proper state cleanup
- Defensive UI handling to prevent runtime crashes
- Debugged real-world React context & refresh issues

---

### ✅ Implemented (Day-05) 🚀  
**Complete Checkout Flow & UI Stabilization**

- Protected checkout & cart routes (login required)
- Buy Now → Login → Checkout flow implemented
- Checkout page with product summary & total price
- Delivery address page with clean, responsive form
- Order success page with cart clearance
- Fixed cart item removal bug (single-item removal)
- UI polished across Products, Login, Checkout & Address pages
- Production-level routing & state handling

---

### ✅ Implemented (Day-06) 🔐  
**Backend Orders & Authentication Foundation**

- Connected **MongoDB Atlas** using Mongoose
- Environment-based configuration using `.env`
- Designed Order schema with validation & timestamps
- Implemented Orders API:
  - POST `/api/orders` → create order
  - GET `/api/orders` → fetch orders
- Created User model with password hashing (**bcryptjs**)
- Implemented JWT-based authentication
- Built authentication middleware to protect backend routes
- Followed MVC architecture (models, controllers, routes)
- Debugged real-world backend issues

---

### ✅ Implemented (Day-07) 🛡️🔥  
**Secure Auth Flow, Protected APIs & Testing**

- User Registration API (`POST /api/auth/register`)
- JWT token generation on successful registration
- Protected Orders API using JWT middleware
- Authorization via `Bearer Token`
- Order creation linked to authenticated user (`req.user._id`)
- Order validation with required fields
- API testing using **Thunder Client**
- Clean API responses with proper status codes

---

### ✅ Implemented (Day-08) 🔑🧠  
**Login API, Backend Stability & Production Debugging**

- Implemented **User Login API** (`POST /api/auth/login`)
- Secure password comparison using **bcrypt**
- JWT token generation on successful login
- End-to-end authentication flow
- Fixed ES module import/export crashes
- Backend stability ensured before frontend integration

---

### ✅ Implemented (Day-09) 🛍️📦  
**Products API & Public Catalog Backend**

- Designed **Product model** with real-world fields
- Product CRUD APIs (Admin-ready)
- Public product listing API
- Pagination, search & sorting
- Product reviews & ratings system
- Top-rated products API
- Soft delete using `isActive`
- MVC-aligned backend architecture

---

### ✅ Implemented (Day-10) 🛒📦  
**Cart & Order Architecture (Production-Grade)**

- Cart model linked to authenticated users
- Add / update / remove cart items
- Secure cart APIs
- Order placement from cart
- Automatic cart clearance
- Address & payment method handling
- Fetch logged-in user orders

---

### ✅ Implemented (Day-11) 🧑‍💼📊  
**Admin Order Management & Stock Control**

- Admin-only order APIs
- Strict order status transitions
- Stock reduction on order placement
- Out-of-stock validation (Backend + Frontend sync)
- Revenue analytics API
- Paid order calculation
- Production-ready admin-user separation

---

### ✅ Implemented (Day-12) 📊📈  
**Admin Analytics Dashboard**

- Protected Admin Dashboard UI
- Revenue charts using **Recharts**
- MongoDB aggregation pipelines
- Order status distribution chart
- Monthly revenue analytics
- Low stock monitoring
- User growth tracking
- Clean reusable chart architecture

---

### ✅ Implemented (Day-13) 💳🔥  
**Stripe Backend Payment System**

- Secure Stripe PaymentIntent creation
- Backend-controlled payment amount validation
- Stripe metadata linked with Order & User
- Webhook integration with signature verification
- Raw body parsing for Stripe security
- Automatic order update on `payment_intent.succeeded`
- Secure storage of `stripePaymentIntentId`
- Stripe CLI local webhook testing
- Database sync (`isPaid`, `paymentStatus`)
- Production-ready payment architecture

---

### ✅ Implemented (Day-14) 💳⚡🔥  
**Full Stripe Elements Frontend Integration & Payment Resume System**

- Stripe Elements secure card payment UI
- Client Secret passed securely from backend
- Payment confirmation using `confirmCardPayment`
- Auto-redirect to Order Success page
- Webhook-based real-time payment confirmation
- Resume Payment button for pending Stripe orders
- Prevent double payment attempts
- Conditional UI rendering (Paid / Pending / Complete Payment)
- Payment status auto-sync with database
- Order marked as paid only after webhook verification
- Production-level end-to-end payment lifecycle:
  Cart → Order → PaymentIntent → Stripe → Webhook → DB Update

---

## 🛡️ Security Highlights

- JWT-based authentication
- Role-based admin access control
- Backend-controlled payment amount validation
- Stripe webhook signature verification
- Secure environment variable handling
- Protected API routes
- Stock & order integrity validation
- Prevention of duplicate payment attempts
- Payment confirmation only via verified webhook

---

## 🔜 Upcoming Features (Day-15+)

- Order cancellation & refund system
- Razorpay integration (India gateway)
- Email notifications (Order & Shipping updates)
- Cloudinary image uploads
- Performance optimization
- Deployment (Render / Railway / Vercel)
- Production logging & monitoring
- CI/CD pipeline

---

## 🏗️ Architecture Overview

- Frontend: React + Tailwind + Context API
- Backend: Node.js + Express (MVC)
- Database: MongoDB Atlas (Mongoose ODM)
- Authentication: JWT (Role-Based Access)
- Charts: Recharts
- Security: Protected Routes + Middleware
- Environment Config: dotenv
- Testing: Thunder Client

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Context API

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas

### Tools
- Git & GitHub
- VS Code
- npm

---

## ⚙️ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/Aditya-dxt/mern-ecommerce-india.git
