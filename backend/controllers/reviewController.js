const Review = require('../models/Review');
const Product = require('../models/Product');

const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
      star,
      count: reviews.filter(r => r.rating === star).length
    }));

    res.json({ success: true, data: reviews, ratingBreakdown });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const existing = await Review.findOne({ user: req.user._id, product: req.params.productId });
    if (existing) return res.status(400).json({ success: false, message: 'Already reviewed' });

    const review = await Review.create({
      user: req.user._id, product: req.params.productId, rating, title, comment
    });
    await review.populate('user', 'name avatar');
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Review.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProductReviews, createReview, deleteReview };
