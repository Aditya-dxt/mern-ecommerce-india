const mongoose = require('mongoose');

/**
 * Review Schema
 * Product reviews with ratings linked to users
 */
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews (one review per user per product)
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method to calculate average rating for a product
reviewSchema.statics.calculateAverageRating = async function(productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  const Product = require('./Product');
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(result[0].averageRating * 10) / 10,
      numReviews: result[0].numReviews
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numReviews: 0
    });
  }
};

// Update product ratings after save/remove
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post('findOneAndDelete', function(doc) {
  if (doc) {
    doc.constructor.calculateAverageRating(doc.product);
  }
});

module.exports = mongoose.model('Review', reviewSchema);
