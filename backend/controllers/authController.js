const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price images brand')
      .populate('cart.product', 'name price images brand sizes');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    // Handle password update
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add/update address
 * @route   PUT /api/auth/address
 * @access  Private
 */
const updateAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { street, city, state, zipCode, country, isDefault } = req.body;

    // If isDefault, unset all other defaults
    if (isDefault) {
      user.addresses.forEach(addr => { addr.isDefault = false; });
    }

    user.addresses.push({ street, city, state, zipCode, country, isDefault });
    await user.save();

    res.json({ success: true, data: user.addresses });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users (admin)
 * @route   GET /api/auth/users
 * @access  Admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-cart -wishlist')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user role (admin)
 * @route   PUT /api/auth/users/:id/role
 * @access  Admin
 */
const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = req.body.role;
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, updateProfile, updateAddress, getAllUsers, updateUserRole };
