const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

const createCheckoutSession = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('items.product', 'name images');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const lineItems = order.items.map(item => {
      // Stripe requires images to be publicly accessible HTTPS URLs
      // Filter out local/relative URLs that Stripe can't reach
      const validImages = [];
      if (item.image) {
        const img = item.image;
        if (img.startsWith('https://') && !img.includes('localhost')) {
          validImages.push(img);
        }
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            ...(validImages.length > 0 && { images: validImages }),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Add shipping as a line item if applicable
    if (order.shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Shipping' },
          unit_amount: Math.round(order.shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Add tax as a line item
    if (order.tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tax' },
          unit_amount: Math.round(order.tax * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      metadata: { orderId: order._id.toString() },
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ success: true, data: { sessionId: session.id, url: session.url } });
  } catch (error) {
    console.error('[Stripe Error]', error.type, error.message);
    if (error.raw) {
      console.error('[Stripe Raw Error]', error.raw.message);
    }
    // Return the actual Stripe error message for easier debugging
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create payment session',
    });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        stripePaymentIntentId: session.payment_intent
      });
    }
  }

  res.json({ received: true });
};

const verifyPayment = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const order = await Order.findOne({ stripeSessionId: sessionId });

    if (session.payment_status === 'paid' && order) {
      order.paymentStatus = 'paid';
      order.stripePaymentIntentId = session.payment_intent;
      await order.save();
    }

    res.json({ success: true, data: { paymentStatus: session.payment_status, order } });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckoutSession, handleWebhook, verifyPayment };

// Day 13: Webhook handler for checkout.session.completed
// Day 13: Payment verification with session retrieval