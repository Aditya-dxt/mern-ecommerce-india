import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Cart Routes (Private)
|--------------------------------------------------------------------------
| All routes require authentication
*/

// 🧾 Cart summary (for navbar / checkout)
router.get("/summary", protect, getCartSummary);

// 🛒 Get full cart
router.get("/", protect, getCart);

// ➕ Add item to cart
router.post("/", protect, addToCart);

// ✏️ Update item quantity
router.put("/", protect, updateCartItem);

// 🗑️ Clear entire cart
router.delete("/", protect, clearCart);

// ❌ Remove single item from cart
router.delete("/:productId", protect, removeCartItem);

export default router;