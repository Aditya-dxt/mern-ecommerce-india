import express from "express";
import {
  createOrder,
  getUserOrders
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET MY ORDERS
router.get("/my", protect, getUserOrders);

// CREATE ORDER
router.post("/", protect, createOrder);

// (Optional) GET ALL USER ORDERS (same as /my)
router.get("/", protect, getUserOrders);

export default router;
