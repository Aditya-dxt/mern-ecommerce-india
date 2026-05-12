const express = require('express');
const router = express.Router();
const { getProducts, getProduct, searchAutocomplete, createProduct, updateProduct, deleteProduct, getAdminProducts } = require('../controllers/productController');
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

router.get('/search/autocomplete', searchAutocomplete);
router.get('/admin/all', protect, admin, getAdminProducts);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// Review sub-routes
router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/reviews', protect, createReview);

module.exports = router;

// Day 9: Added admin-only routes for create, update, delete