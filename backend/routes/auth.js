const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, updateAddress, getAllUsers, updateUserRole } = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/address', protect, updateAddress);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);

module.exports = router;

// Day 11: Added GET /users (admin)