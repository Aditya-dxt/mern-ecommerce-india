import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", protect, orderRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend is running 🚀" });
});

export default app;
