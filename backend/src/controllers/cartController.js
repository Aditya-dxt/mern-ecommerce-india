import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ➕ Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      price: product.price,
      quantity,
    });
  }

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({ success: true, cart });
};

// 🛒 Get full cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name price image"
  );

  if (!cart) {
    return res.status(200).json({ success: true, cart: null });
  }

  res.status(200).json({ success: true, cart });
};

// ✏️ Update cart item
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  res.status(200).json({ success: true, cart });
};

// ❌ Remove single item
export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    cart,
  });
};

// 🗑️ Clear cart
export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [], totalPrice: 0 }
  );

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
};

// 🧾 Cart Summary (NEW API)
export const getCartSummary = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(200).json({
      success: true,
      totalItems: 0,
      totalPrice: 0,
    });
  }

  const totalItems = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  res.status(200).json({
    success: true,
    totalItems,
    totalPrice: cart.totalPrice,
  });
};
