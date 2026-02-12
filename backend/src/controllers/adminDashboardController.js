import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";


// ======================================================
// ADMIN DASHBOARD SUMMARY
// ======================================================
export const getAdminDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue,
      },
    });

  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// MONTHLY REVENUE
// ======================================================
export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: {
            year: { $year: "$paidAt" },
            month: { $month: "$paidAt" },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = revenue.map((item) => ({
      month: monthNames[item._id.month - 1],
      revenue: item.revenue,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    console.error("Monthly Revenue Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// ORDER STATUS
// ======================================================
export const getOrderStatusStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error("Order Status Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// TOP SELLING PRODUCTS
// GET /api/admin/analytics/top-products
// ======================================================
export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          revenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
          name: { $first: "$items.name" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// DAILY REVENUE
// GET /api/admin/analytics/revenue-daily
// ======================================================
export const getDailyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// LOW STOCK PRODUCTS
// GET /api/admin/analytics/low-stock
// ======================================================
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      countInStock: { $lte: 5 },
      isActive: true,
    }).select("name countInStock price");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// USER GROWTH
// GET /api/admin/analytics/user-growth
// ======================================================
export const getUserGrowth = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
