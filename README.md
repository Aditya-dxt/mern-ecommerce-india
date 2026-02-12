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

### ✅ Implemented (Day-10) 🛒💳📦  
**Cart, Checkout & Orders (Production-Grade Backend)**

- Cart model linked to authenticated users
- Add / update / remove cart items APIs
- Clear cart & cart summary APIs
- Secure cart routes using JWT
- Order placement directly from cart
- Auto cart clearance after order
- Address & payment method handling
- Fetch logged-in user orders
- Real-world checkout flow
- Debugged controller-route & data consistency issues

---

### ✅ Implemented (Day-11) 🧑‍💼📊📦  
**Admin Order Management, Stock Handling & Analytics**

- Admin-only order management APIs
- Fetch all orders (Admin)
- Fetch single order details (Admin)
- Update order status with strict state transitions:
  - placed → shipped → delivered
  - cancellation rules enforced
- Prevent updates on delivered / cancelled orders
- Order analytics API:
  - Total orders
  - Paid orders
  - Total revenue
- Stock-aware architecture:
  - Product stock (`countInStock`) enforced
  - Stock reduced automatically on order placement
- Out-of-stock handling:
  - “Buy Now” disabled for out-of-stock products
  - Products can still be added to cart
  - Checkout blocked if cart contains out-of-stock items
  - Clear “Out of Stock” indicator shown in cart UI
- Frontend cart & checkout validation synced with backend stock logic
- Production-ready admin + user flow separation
- End-to-end testing using **Thunder Client**

---

### ✅ Implemented (Day-12) 📊📈🧑‍💼  
**Admin Analytics Dashboard & Data Visualization**

- Admin Dashboard UI (Protected Route)
- Total Users / Orders / Products / Revenue summary cards
- Monthly Revenue Aggregation (MongoDB Aggregation Pipeline)
- Revenue Line Chart using **Recharts**
- Order Status Distribution (Pie Chart)
- Paid orders revenue calculation using `isPaid`
- Role-based admin route protection
- Seeder script for analytics testing
- Production-level MongoDB data aggregation logic
- Real-time analytics rendering from backend APIs
- Clean chart component architecture (Reusable)

**Backend Analytics APIs:**
- `GET /api/admin/analytics/dashboard`
- `GET /api/admin/analytics/revenue-monthly`
- `GET /api/admin/analytics/order-status`
- `GET /api/admin/analytics/top-products`
- `GET /api/admin/analytics/low-stock`
- `GET /api/admin/analytics/user-growth`

---

## 🔜 Upcoming Features (Day-13+)

- Payment gateway integration (Razorpay / Stripe)
- Order cancellation & refund system
- Email notifications (Order confirmation)
- Image upload using Cloudinary
- Full frontend-backend integration polish
- Performance optimization
- Deployment (Render / Railway / Vercel)
- Production logging & error monitoring

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
