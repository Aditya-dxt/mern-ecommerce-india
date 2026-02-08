import express from "express";
import {
  adminGetAllOrders,
  adminGetOrderById,
  adminUpdateOrderStatus,
  adminOrderAnalytics,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ STATIC ROUTES FIRST
router.get(
  "/orders/analytics",
  protect,
  adminOnly,
  adminOrderAnalytics
);

router.get(
  "/orders",
  protect,
  adminOnly,
  adminGetAllOrders
);

// ❗ DYNAMIC ROUTES LAST
router.get(
  "/orders/:id",
  protect,
  adminOnly,
  adminGetOrderById
);

router.put(
  "/orders/:id/status",
  protect,
  adminOnly,
  adminUpdateOrderStatus
);

export default router;
