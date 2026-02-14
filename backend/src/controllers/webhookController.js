import stripe from "../utils/stripe.js";
import Order from "../models/Order.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook signature verification failed.");
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("🔔 Stripe Event Received:", event.type);

  // =========================
  // PAYMENT SUCCESS
  // =========================
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;

    const order = await Order.findById(orderId);

    if (order && !order.isPaid) {
      order.paymentStatus = "paid";
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();

      console.log("✅ Order marked as paid:", orderId);
    }
  }

  // =========================
  // PAYMENT FAILED
  // =========================
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;

    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = "failed";
      await order.save();

      console.log("❌ Payment failed for order:", orderId);
    }
  }

  res.status(200).json({ received: true });
};
