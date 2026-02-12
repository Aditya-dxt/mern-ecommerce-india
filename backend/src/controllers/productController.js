import Product from "../models/Product.js";

// @desc   Create a product (ADMIN)
// @route  POST /api/products
// @access Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all products (PUBLIC)
// @route  GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 8;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    let sortOption = { createdAt: -1 };

    if (req.query.sort === "price_asc") sortOption = { price: 1 };
    if (req.query.sort === "price_desc") sortOption = { price: -1 };

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc   Update product
// @route  PUT /api/products/:id
// @access Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete product (soft delete)
// @route  DELETE /api/products/:id
// @access Admin
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Create product review
// @route  POST /api/products/:id/reviews
// @access Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // 🚫 ADMIN CANNOT REVIEW PRODUCTS
    if (req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Admins are not allowed to review products" });
    }

    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get product reviews
// @route  GET /api/products/:id/reviews
// @access Public
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "reviews rating numReviews isActive"
    );

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      rating: product.rating,
      numReviews: product.numReviews,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
export const getTopProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const products = await Product.find({ isActive: true })
      .sort({ rating: -1, numReviews: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// @desc   Admin: Update product stock only
// @route  PUT /api/admin/products/:id/stock
// @access Admin
// ===============================
export const updateProductStock = async (req, res) => {
  try {
    const { countInStock } = req.body;

    if (countInStock === undefined) {
      return res.status(400).json({
        message: "countInStock is required",
      });
    }

    if (countInStock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.countInStock = countInStock;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
