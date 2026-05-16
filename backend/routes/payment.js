const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.get('/verify', protect, verifyPayment);

module.exports = router;
