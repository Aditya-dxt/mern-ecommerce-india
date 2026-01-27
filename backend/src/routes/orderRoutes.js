import express from "express";
import { getAllOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

// DO NOT use protect here
router.get("/", getAllOrders);
router.post("/", createOrder);

export default router;
