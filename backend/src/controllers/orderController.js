import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// @desc    Create order from cart
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // 🔹 Get user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🔹 Create order items from cart
    const orderItems = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalAmount = cart.totalPrice;

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod,
    });

    // 🔹 Clear cart after order placed
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders
// @access  Private
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
