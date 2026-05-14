const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    // Calculate prices from database (prevent client-side manipulation)
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      }

      // Check stock for the selected size
      const sizeData = product.sizes.find(s => s.size === item.size);
      if (!sizeData || sizeData.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name} size ${item.size}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        size: item.size,
        quantity: item.quantity,
        price: product.price
      });

      // Reduce stock
      sizeData.stock -= item.quantity;
      await product.save();
    }

    const shippingCost = subtotal > 100 ? 0 : 9.99;
    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
    const totalPrice = Math.round((subtotal + shippingCost + tax) * 100) / 100;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCost,
      tax,
      totalPrice,
      paymentStatus: 'pending'
    });

    // Clear user's cart
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my
 * @access  Private
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images brand')
      .sort('-createdAt');

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images brand')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure user can only see their own orders (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/orders
 * @access  Admin
 */
const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.deliveryStatus = req.query.status;
    if (req.query.payment) filter.paymentStatus = req.query.payment;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status (admin)
 * @route   PUT /api/orders/:id/status
 * @access  Admin
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const { deliveryStatus, paymentStatus, trackingNumber } = req.body;

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (deliveryStatus === 'delivered') order.deliveredAt = new Date();

    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order stats (admin dashboard)
 * @route   GET /api/orders/stats/summary
 * @access  Admin
 */
const getOrderStats = async (req, res, next) => {
  try {
    const [totalOrders, totalRevenue, recentOrders, statusCounts] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      Order.find().populate('user', 'name email').sort('-createdAt').limit(5),
      Order.aggregate([
        { $group: { _id: '$deliveryStatus', count: { $sum: 1 } } }
      ])
    ]);

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        totalProducts,
        recentOrders,
        statusCounts
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder, getMyOrders, getOrder,
  getAllOrders, updateOrderStatus, getOrderStats
};

// Day 9: Added aggregation pipeline for admin stats
// Day 11: Added delivery status management
// Day 11: Added stock reduction on order creation
// Day 11: Validate stock before accepting order