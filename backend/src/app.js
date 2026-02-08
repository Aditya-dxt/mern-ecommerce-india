import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

const app = express();

app.use(cors());

// ✅ BODY PARSERS (BOTH REQUIRED)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", protect, orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminOrderRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend is running 🚀" });
});

export default app;