import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

const app = express();

app.use(cors());

/* =========================
   STRIPE WEBHOOK (RAW BODY)
   ========================= */
app.use(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" })
);

// Register webhook route AFTER raw body
app.use("/api/webhook", webhookRoutes);

/* =========================
   NORMAL BODY PARSERS
   ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", adminProductRoutes);
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend is running 🚀" });
});

export default app;
