const User = require('../models/User');

const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist', 'name price images brand category averageRating');
    res.json({ success: true, data: user.wishlist });
  } catch (error) { next(error); }
};

const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist' });
    }
    user.wishlist.push(req.params.productId);
    await user.save();
    await user.populate('wishlist', 'name price images brand category averageRating');
    res.json({ success: true, data: user.wishlist });
  } catch (error) { next(error); }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.json({ success: true, data: user.wishlist });
  } catch (error) { next(error); }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
