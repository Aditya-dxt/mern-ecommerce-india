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
- Debugged real-world backend issues:
  - MongoDB SRV & DNS errors
  - Authentication & credential issues
  - Environment variable loading problems

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
- Debugged backend issues:
  - `next is not a function`
  - Missing Authorization header
  - JWT verification failures
  - Mongoose schema validation errors
- Clean API responses with proper status codes
- Orders successfully stored & retrieved from MongoDB

---

### ✅ Implemented (Day-08) 🔑🧠  
**Login API, Backend Stability & Production Debugging**

- Implemented **User Login API** (`POST /api/auth/login`)
- Secure password comparison using **bcrypt**
- JWT token generation on successful login
- End-to-end authentication flow (Register → Login → Token → Protected APIs)
- Fixed real **Node.js ES module import/export crashes**
- Debugged server crashes caused by undefined controller bindings
- Verified JWT-protected order routes using login token
- Ensured backend stability before frontend integration
- Comprehensive API testing using **Thunder Client**

---

### ✅ Implemented (Day-09) 🛍️📦  
**Products API & Public Catalog Backend**

- Designed **Product model** with real-world fields
- Product CRUD APIs (Admin-ready architecture)
- Public product listing API
- Product pagination & search support
- Sorting by price & latest products
- Product review system:
  - Add product reviews
  - Rating & review aggregation
- Top-rated products API
- Soft delete using `isActive`
- MVC-aligned controllers & routes
- Thorough API testing using Thunder Client

---

### ✅ Implemented (Day-10) 🛒💳📦  
**Cart, Checkout & Orders (Production-Grade Backend)**

- Cart model linked to authenticated users
- Add items to cart API
- Update cart item quantity API
- Remove item from cart API
- Clear entire cart API
- Cart summary API (total items & price)
- Secure cart routes using JWT middleware
- Order placement from cart
- Auto cart clearance after successful order
- Address & payment method handling
- Fetch logged-in user’s orders
- End-to-end checkout flow tested via Thunder Client
- Debugged real production-level issues:
  - ES module export mismatches
  - Controller-route sync issues
  - Cart & order data consistency
- Backend now mirrors **real e-commerce architecture**

---

## 🔜 Upcoming Features (Day-11+)
- Admin order management (update order status)
- Role-based access control (Admin / User)
- Payment gateway integration (Razorpay / Stripe)
- Order cancellation & refunds
- Email notifications (Order confirmation)
- Image upload using Cloudinary
- Frontend-backend integration
- Deployment (Render / Railway / Vercel)
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
