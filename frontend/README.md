# 👟 SneakerVault Frontend

> The modern, cinematic storefront for **SneakerVault** — a premium sneaker e-commerce platform built with Next.js 16, React 19, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-E91E63?style=for-the-badge&logo=framer)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Dev Server](#running-the-dev-server)
- [Available Scripts](#-available-scripts)
- [Design System](#-design-system)
- [Theme Support](#-theme-support)
- [Pages & Routes](#-pages--routes)
- [State Management](#-state-management)
- [API Layer](#-api-layer)

---

## 🌟 Overview

SneakerVault Frontend is a feature-rich, visually immersive storefront designed for sneaker enthusiasts. It delivers a **cinematic browsing experience** with snap-scroll sections, glassmorphism UI elements, 3D product card animations, and a seamless checkout flow powered by Stripe. The interface ships with **dark mode by default** and supports a smooth light mode toggle.

---

## 🛠 Tech Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.2.4` |
| **UI Library** | React | `19.2.4` |
| **Styling** | Tailwind CSS + Custom CSS Design System | `v4` |
| **Animations** | Framer Motion | `12.x` |
| **HTTP Client** | Axios | — |
| **Notifications** | react-hot-toast | — |
| **Icons** | react-icons (HeroIcons) | — |
| **Carousel** | Swiper.js | `12.x` |
| **Payments** | @stripe/react-stripe-js, @stripe/stripe-js | — |

---

## ✨ Key Features

### 🏠 Homepage
- **Snap-scroll layout** with full-viewport cinematic sections
- **Cinematic hero section** with animated content and call-to-action
- **Featured products** carousel powered by Swiper.js
- **Category showcase** with hover effects
- **Promotional banner** with dynamic content

### 🧭 Navigation
- **Glassmorphism navbar** with scroll-reactive blur effect
- Responsive mobile menu
- Dynamic cart item count badge

### 🎨 Theming
- **Dark mode** enabled by default
- **Light mode** toggle with smooth CSS transitions
- Theme state managed globally via `ThemeContext`
- Custom CSS design tokens for consistent styling

### 🛍 Products
- **Product catalog** with filtering and sorting capabilities
- **Product cards** with immersive **3D flip animation** on hover
- **Product detail page** featuring:
  - Image gallery with thumbnail navigation
  - **3-tab content system** — Details & Features, Specifications, Reviews
  - Brand-specific content sections
  - Size selector and quantity picker

### 🛒 Cart
- Real product images with full quantity management
- Dynamic price calculation
- Persistent cart state via `CartContext`

### 💳 Checkout
- **Dual payment methods:**
  - **Stripe** — Secure card payments via Stripe Elements
  - **Cash on Delivery (COD)** — Order now, pay later
- **Success page** with automatic payment verification polling

### 👤 User Dashboard
- Tabbed interface with three sections:
  - **Orders** — View order history and status tracking
  - **Profile** — Edit personal information
  - **Wishlist** — Save favorite products

### 🔐 Authentication
- Login & signup pages with form validation
- JWT-based session management
- Protected routes for authenticated users

### ⚙️ Admin Panel
- Analytics dashboard with key business metrics
- Product and order management interface

### 📱 Responsive Design
- Fully responsive across all screen sizes
- Mobile-first approach with Tailwind breakpoints

---

## 📁 Project Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.js              # Home page (snap-scroll sections)
│   │   ├── layout.js            # Root layout with providers
│   │   ├── globals.css          # Design system & theme tokens
│   │   ├── products/            # Product listing & detail pages
│   │   │   ├── page.js          # Product catalog with filters
│   │   │   └── [id]/page.js     # Product detail with tabs
│   │   ├── cart/page.js         # Shopping cart
│   │   ├── checkout/            # Checkout flow
│   │   │   ├── page.js          # Checkout with Stripe / COD
│   │   │   └── success/page.js  # Payment verification
│   │   ├── auth/                # Authentication
│   │   │   ├── login/page.js    # Login page
│   │   │   └── signup/page.js   # Signup page
│   │   ├── dashboard/page.js    # User dashboard (Orders, Profile, Wishlist)
│   │   ├── admin/page.js        # Admin panel
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── shipping/            # Shipping info
│   │   ├── returns/             # Returns policy
│   │   └── size-guide/          # Size guide
│   ├── components/
│   │   ├── home/                # HeroSection, FeaturedProducts, Categories, PromoBanner
│   │   ├── layout/              # Navbar, Footer, LayoutFooter
│   │   ├── products/            # ProductCard (3D flip animation)
│   │   └── ui/                  # Shared UI components
│   ├── context/
│   │   ├── AuthContext.js       # Authentication state & JWT handling
│   │   ├── CartContext.js       # Cart state management
│   │   └── ThemeContext.js      # Dark / Light theme toggle
│   └── lib/
│       └── api.js               # Axios instance with JWT interceptor
├── .env.local                   # Environment variables (not committed)
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version |
| :--- | :--- |
| **Node.js** | `18.x` or higher |
| **npm** | `9.x` or higher |

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd "E-commerce Platform/frontend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the `frontend/` root directory with the following variables:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Note:** The `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the SneakerVault backend API | `http://localhost:5000/api` |

### Running the Dev Server

```bash
npm run dev
```

The application will start at **[http://localhost:3000](http://localhost:3000)** by default.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev** | `npm run dev` | Start the development server with hot-reloading |
| **Build** | `npm run build` | Create an optimized production build |
| **Start** | `npm run start` | Start the production server (requires build) |
| **Lint** | `npm run lint` | Run ESLint to check for code quality issues |

---

## 🎨 Design System

The frontend ships with a **custom CSS design system** defined in `src/app/globals.css`. It includes:

- **Theme Tokens** — CSS custom properties for colors, spacing, typography, shadows, and border radii that adapt to the active theme.
- **Glassmorphism Utilities** — Backdrop blur and semi-transparent background classes for the navbar and card overlays.
- **Animation Keyframes** — Reusable animations for page transitions, card flips, and scroll-triggered reveals.
- **Component Styles** — Base styles for buttons, inputs, badges, and other recurring UI patterns.

---

## 🌗 Theme Support

SneakerVault uses a `ThemeContext` provider that wraps the entire application in `layout.js`:

| Mode | Description |
| :--- | :--- |
| 🌑 **Dark** (default) | Rich dark palette optimized for product photography |
| ☀️ **Light** | Clean light palette for daylight readability |

Theme toggling is instant with **smooth CSS transitions** applied to background, text, and border colors across all components. User preference is persisted across sessions.

---

## 🗺 Pages & Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | Home | Snap-scroll cinematic landing with hero, featured products, categories, and promo banner |
| `/products` | Product Catalog | Filterable grid of all available sneakers |
| `/products/:id` | Product Detail | Image gallery, tabbed info (Details, Specs, Reviews), add-to-cart |
| `/cart` | Shopping Cart | View cart items, update quantities, proceed to checkout |
| `/checkout` | Checkout | Address form, payment method selection (Stripe / COD) |
| `/checkout/success` | Order Success | Confirmation screen with automatic payment verification |
| `/auth/login` | Login | User authentication |
| `/auth/signup` | Sign Up | New user registration |
| `/dashboard` | User Dashboard | Tabbed view — Orders, Profile, Wishlist |
| `/admin` | Admin Panel | Analytics and management (protected) |
| `/about` | About | Brand story and mission |
| `/contact` | Contact | Contact form and information |
| `/shipping` | Shipping Info | Shipping policies and estimated delivery |
| `/returns` | Returns Policy | Return and refund guidelines |
| `/size-guide` | Size Guide | Sneaker sizing reference chart |

---

## 🧠 State Management

State is managed through **React Context API** providers, composed in `layout.js`:

```
<ThemeProvider>
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
</ThemeProvider>
```

| Context | File | Responsibility |
| :--- | :--- | :--- |
| **ThemeContext** | `context/ThemeContext.js` | Dark/Light mode toggle and persistence |
| **AuthContext** | `context/AuthContext.js` | User authentication state, login/logout, JWT storage |
| **CartContext** | `context/CartContext.js` | Cart items, add/remove/update quantities, cart totals |

---

## 🌐 API Layer

All HTTP communication with the backend is handled through a centralized **Axios instance** located at `src/lib/api.js`.

**Key features:**
- **Base URL** configured from `NEXT_PUBLIC_API_URL` environment variable
- **JWT Interceptor** — Automatically attaches the `Authorization: Bearer <token>` header to every outgoing request when a user is authenticated
- **Centralized error handling** for consistent API response management

```js
// Example usage in components
import api from '@/lib/api';

const products = await api.get('/products');
const order = await api.post('/orders', orderData);
```

---

## 📄 License

This project is part of the **SneakerVault** e-commerce platform.

---

<p align="center">
  Built with ❤️ using <strong>Next.js 16</strong>, <strong>React 19</strong>, and <strong>Tailwind CSS v4</strong>
</p>
