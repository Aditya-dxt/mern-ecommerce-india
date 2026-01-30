import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getTopProducts,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id/reviews", getProductReviews);
router.get("/:id", getProductById);

// Private
router.post("/:id/reviews", protect, createProductReview);

// Admin
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
