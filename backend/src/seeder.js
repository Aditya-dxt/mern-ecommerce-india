import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Order from "./models/Order.js";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

await User.deleteMany();
await Product.deleteMany();
await Order.deleteMany();

// Create Admin
const admin = await User.create({
  name: "Admin",
  email: "admin@test.com",
  password: "123456",
  role: "admin",
});

// Create Product
// Create Product (MATCHING YOUR Product MODEL)
const product = await Product.create({
  name: "Sneaker X",
  description: "Premium running sneaker with lightweight comfort.",
  price: 5000,
  image: "https://via.placeholder.com/500",
  category: "Footwear",   // ✅ MUST MATCH ENUM
  countInStock: 20,
  isActive: true,
});


// Create Order (MATCHING YOUR Order.js MODEL)
await Order.create({
  userId: admin._id,
  items: [
    {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 2,
    },
  ],
  address: {
    fullName: "Admin",
    phone: "9999999999",
    pincode: "110001",
    city: "Delhi",
    state: "Delhi",
    addressLine: "Test Address",
  },
  totalAmount: 10000,
  paymentMethod: "COD",
  paymentStatus: "paid",
  isPaid: true,
  paidAt: new Date(),
  orderStatus: "delivered",
});

console.log("Database Seeded Successfully");
process.exit();
