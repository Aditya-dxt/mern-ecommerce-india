import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import { updateProductStock } from "../controllers/productController.js";

const router = express.Router();

// Admin: Update stock
router.put(
  "/products/:id/stock",
  protect,
  adminOnly,
  updateProductStock
);

export default router;
