import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getOverview,
  getSales,
  getOrders,
  getActivity,
  getTopProducts,
  getAllUsers,
  updateUser,
  deleteUser,
  toggleUserBlock,
  getUserActivity,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics,
  updateProductStock,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  updateOrderStatus,
  getOrderDetails,
  processReturn,
  extendTenure,
  verifyPayment,
  refundPayment,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllReviews,
  deleteReview,
  getAllNotifications,
  createNotification,
  deleteNotification,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllPayments,
  getSettings,
  updateSettings,
  getAllAdmins,
  createAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// All admin routes are protected + admin-only
router.use(protect, authorize("admin"));

// Dashboard data
router.get("/overview", getOverview);
router.get("/sales", getSales);
router.get("/orders", getOrders);
router.get("/activity", getActivity);
router.get("/top-products", getTopProducts);

// Users
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/block", toggleUserBlock);
router.get("/users/:id/activity", getUserActivity);

// Products
router.get("/products/analytics", getProductAnalytics);
router.get("/products", getAllProducts);
router.put("/products/:id/stock", updateProductStock);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Categories
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Orders
router.get("/orders/:id", getOrderDetails);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/return", processReturn);
router.put("/orders/:id/extend", extendTenure);

// Coupons
router.get("/coupons", getAllCoupons);
router.post("/coupons", createCoupon);
router.put("/coupons/:id", updateCoupon);
router.delete("/coupons/:id", deleteCoupon);

// Reviews
router.get("/reviews", getAllReviews);
router.delete("/reviews/:id", deleteReview);

// Notifications
router.get("/notifications", getAllNotifications);
router.post("/notifications", createNotification);
router.delete("/notifications/:id", deleteNotification);

// Banners
router.get("/banners", getAllBanners);
router.post("/banners", createBanner);
router.put("/banners/:id", updateBanner);
router.delete("/banners/:id", deleteBanner);

// Blog Posts
router.get("/blog-posts", getAllBlogPosts);
router.post("/blog-posts", createBlogPost);
router.put("/blog-posts/:id", updateBlogPost);
router.delete("/blog-posts/:id", deleteBlogPost);

// Payments
router.get("/payments", getAllPayments);
router.put("/payments/:id/verify", verifyPayment);
router.put("/payments/:id/refund", refundPayment);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Admin users
router.get("/admins", getAllAdmins);
router.post("/admins", createAdmin);

export default router;
