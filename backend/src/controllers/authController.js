import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ========================
// Generate JWT
// ========================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ========================
// REGISTER USER
// ========================
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      // role defaults from schema (e.g., "user")
    });

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 🔥 IMPORTANT
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// LOGIN USER
// ========================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 🔥 CRITICAL FIX
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};
