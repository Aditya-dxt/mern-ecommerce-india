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
- **Guest-friendly cart** (add items without login)
- **Buy Now** functionality on product cards
- Auth-aware Buy Now flow (login required before checkout)
- Login enforced only at checkout stage (real-world UX)
- Clean separation of cart and authentication logic

---

### ✅ Implemented (Day-04) ⭐
- **Persistent authentication using `localStorage`**
- **Persistent cart state across page refresh**
- AuthContext & CartContext production-ready architecture
- User remains logged in after page reload
- Cart items preserved after refresh
- Profile avatar displayed in Navbar after login
- Logout functionality with state cleanup
- Defensive UI handling to prevent runtime crashes
- Debugged real-world React issues (context crashes, refresh bugs)

---

### ✅ Implemented (Day-05) 🚀  
**Complete Checkout Flow & UI Stabilization**

- 🔐 Protected checkout & cart routes (login required)
- 🛒 Buy Now → Login → Checkout flow implemented
- 📦 Checkout page with product summary & total price
- 🏠 Delivery address page with clean, responsive form
- ✅ Order success page with cart clearance
- 🛠 Fixed cart item removal bug (single-item removal)
- 🎨 UI restored & polished across Products, Login, Checkout & Address pages
- 🧠 Production-level routing, state handling & defensive checks

---

### ✅ Implemented (Day-06) 🔐  
**Backend Orders & Authentication Foundation**

- 🌐 Connected **MongoDB Atlas** using Mongoose
- 🧩 Proper environment configuration using `.env`
- 🗃 Designed **Order schema** with validation & timestamps
- 📦 Implemented Orders API:
  - POST `/api/orders` → create new order
  - GET `/api/orders` → fetch all orders
- 👤 Created **User model** with password hashing (`bcryptjs`)
- 🔐 Implemented **JWT-based authentication**
- 🛡 Built authentication middleware to protect backend routes
- 🏗 Followed **MVC architecture** for backend (models, controllers, routes)
- 🧠 Solved real-world backend issues:
  - MongoDB SRV & DNS errors
  - Authentication & credential issues
  - Environment variable loading problems

---

## 🔜 Upcoming Features
- User registration with Email + Mobile number
- OTP verification (Email & SMS)
- Forgot password flow with OTP
- User-specific orders (JWT protected)
- Role-based access (Admin / User)
- Payment gateway integration (Razorpay)
- Order history & address persistence
- Backend deployment (Render / Railway)

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
