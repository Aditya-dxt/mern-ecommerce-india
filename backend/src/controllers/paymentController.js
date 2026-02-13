import asyncHandler from "express-async-handler";
import stripe from "../utils/stripe.js";
import Order from "../models/Order.js";

// @desc    Create Stripe PaymentIntent
// @route   POST /api/payment/create-payment-intent/:orderId
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.paymentStatus === "paid") {
    res.status(400);
    throw new Error("Order already paid");
  }

  // Always calculate amount from DB
  const amount = Math.round(order.totalAmount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    metadata: {
      orderId: order._id.toString(),
      userId: order.userId.toString(),
    },
  });

  // Store PaymentIntent ID in DB
  order.stripePaymentIntentId = paymentIntent.id;
  await order.save();

  res.json({
    clientSecret: paymentIntent.client_secret,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
