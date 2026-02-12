import express from "express";
// ✅ Split the imports: protect from authMiddleware, adminOnly from adminMiddleware
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js"; 
import {
  getAdminDashboardAnalytics,
  getMonthlyRevenue,
  getTopSellingProducts,
  getOrderStatusStats,
  getDailyRevenue,
  getLowStockProducts,
  getUserGrowth,
} from "../controllers/adminDashboardController.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);
// ... rest of your routes

router.get("/dashboard/analytics", getAdminDashboardAnalytics);
router.get("/analytics/revenue-monthly", getMonthlyRevenue);
router.get("/analytics/top-products", getTopSellingProducts);
router.get("/analytics/order-status", getOrderStatusStats);
router.get("/analytics/revenue-daily", getDailyRevenue);
router.get("/analytics/low-stock", getLowStockProducts);
router.get("/analytics/user-growth", getUserGrowth);

export default router;