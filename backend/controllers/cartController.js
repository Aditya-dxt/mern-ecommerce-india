const User = require('../models/User');

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.product', 'name price images brand sizes category');

    // Filter out any null products (deleted products)
    const validCart = user.cart.filter(item => item.product);

    res.json({ success: true, data: validCart });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = async (req, res, next) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    const user = await User.findById(req.user._id);

    // Check if item already in cart with same product and size
    const existingIndex = user.cart.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingIndex > -1) {
      // Update quantity
      user.cart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ product: productId, size, quantity });
    }

    await user.save();

    // Return populated cart
    await user.populate('cart.product', 'name price images brand sizes category');

    res.json({ success: true, data: user.cart });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    item.quantity = quantity;
    await user.save();

    await user.populate('cart.product', 'name price images brand sizes category');

    res.json({ success: true, data: user.cart });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
const removeFromCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(item => item._id.toString() !== req.params.itemId);
    await user.save();

    await user.populate('cart.product', 'name price images brand sizes category');

    res.json({ success: true, data: user.cart });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
