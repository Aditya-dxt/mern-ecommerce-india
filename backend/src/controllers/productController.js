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

    // 🔍 Search by keyword
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // 🔃 Sorting
    let sortOption = { createdAt: -1 }; // default: latest

    if (req.query.sort === "price_asc") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "price_desc") {
      sortOption = { price: -1 };
    }

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

// @desc   Get single product (PUBLIC)
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

// @desc   Update product (ADMIN)
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

// @desc   Delete product (ADMIN - soft delete)
// @route  DELETE /api/products/:id
// @access Admin
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
