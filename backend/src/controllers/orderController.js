import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod } = req.body;

    if (!items || !address) {
      return res.status(400).json({ message: "Items & address required" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user._id,
      items,
      address,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
