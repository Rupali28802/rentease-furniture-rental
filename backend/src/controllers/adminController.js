import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";
import Coupon from "../models/Coupon.js";
import Review from "../models/Review.js";
import Notification from "../models/Notification.js";
import HeroBanner from "../models/HeroBanner.js";
import Banner from "../models/Banner.js";
import BlogPost from "../models/BlogPost.js";
import Payment from "../models/Payment.js";
import Settings from "../models/Settings.js";

// ============================
// OVERVIEW
// ============================
export const getOverview = async (req, res) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const [users, products, orders, reviews, bookings] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Review.countDocuments(),
      Order.countDocuments({
        status: { $in: ["confirmed", "active", "delivered"] },
      }),
    ]);

    // Revenue (paid orders + refunds)
    const paidOrders = await Order.find({ paymentStatus: "paid" }).select(
      "totalAmount createdAt",
    );
    const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);

    // 7-day revenue for % change
    const last7 = paidOrders
      .filter((o) => o.createdAt >= weekAgo)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    const prev7 = paidOrders
      .filter((o) => o.createdAt >= twoWeeksAgo && o.createdAt < weekAgo)
      .reduce((acc, o) => acc + o.totalAmount, 0);

    const pctChange = (metric, cur, prev) => {
      if (prev === 0) return cur > 0 ? 100 : 0;
      return Math.round(((cur - prev) / prev) * 100);
    };

    const users7 = await User.countDocuments({ createdAt: { $gte: weekAgo } });
    const usersPrev = await User.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: weekAgo },
    });
    const products7 = await Product.countDocuments({
      createdAt: { $gte: weekAgo },
    });
    const productsPrev = await Product.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: weekAgo },
    });
    const orders7 = await Order.countDocuments({
      createdAt: { $gte: weekAgo },
    });
    const ordersPrev = await Order.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: weekAgo },
    });

    res.json({
      counts: {
        users,
        products,
        orders,
        revenue: totalRevenue,
        bookings,
        reviews,
      },
      changes: {
        users: pctChange("users", users7, usersPrev),
        products: pctChange("products", products7, productsPrev),
        orders: pctChange("orders", orders7, ordersPrev),
        revenue: pctChange("revenue", last7, prev7),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// SALES (line chart - last 7 days)
// ============================
export const getSales = async (req, res) => {
  try {
    const days = 7;
    const labels = [];
    const revenue = [];
    const ordersCount = [];

    for (let i = days - 1; i >= 0; i--) {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - i);
      const next = new Date(day);
      next.setDate(next.getDate() + 1);

      const dayOrders = await Order.find({
        paymentStatus: "paid",
        createdAt: { $gte: day, $lt: next },
      }).select("totalAmount");

      labels.push(
        day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      );
      revenue.push(dayOrders.reduce((a, o) => a + o.totalAmount, 0));
      ordersCount.push(dayOrders.length);
    }

    res.json({ labels, revenue, orders: ordersCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// ORDERS (status breakdown + recent)
// ============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name image pricePerMonth")
      .sort("-createdAt")
      .limit(50);

    // Status breakdown
    const statusCounts = {};
    orders.forEach((o) => {
      statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
    });

    res.json({ orders, statusBreakdown: statusCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// ACTIVITY (recent activity logs)
// ============================
export const getActivity = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort("-createdAt")
      .limit(10)
      .select("title message type read createdAt");

    const orders = await Order.find()
      .sort("-updatedAt")
      .limit(5)
      .select("activityLog status updatedAt _id");

    const activities = [];

    notifications.forEach((n) =>
      activities.push({
        id: n._id,
        type: n.type,
        text: `${n.title} - ${n.message}`,
        timestamp: n.createdAt,
      }),
    );

    orders.forEach((o) => {
      const latest = o.activityLog?.[o.activityLog.length - 1];
      if (latest) {
        activities.push({
          id: `${o._id}-${latest.timestamp}`,
          type: "ORDER",
          text: `Order ${o._id} ${latest.action}`,
          timestamp: latest.timestamp || o.updatedAt,
        });
      }
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json({ activities: activities.slice(0, 15) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// TOP PRODUCTS
// ============================
export const getTopProducts = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "paid" }).populate(
      "items.product",
      "name image pricePerMonth",
    );

    const map = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!item.product) return;
        const id = item.product._id.toString();
        if (!map[id]) {
          map[id] = {
            _id: id,
            name: item.product.name,
            image: item.product.image,
            pricePerMonth: item.product.pricePerMonth,
            ordersCount: 0,
            revenue: 0,
          };
        }
        map[id].ordersCount += item.quantity || 1;
        map[id].revenue += item.totalRent || 0;
      });
    });

    const products = Object.values(map).sort((a, b) => b.revenue - a.revenue);
    res.json({ products: products.slice(0, 10) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// GENERIC CRUD HELPERS
// ============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle block/activate user account
export const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      user: { _id: user._id, name: user.name, isBlocked: user.isBlocked },
      message: user.isBlocked
        ? "User blocked successfully"
        : "User activated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user activity + rental history
export const getUserActivity = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const [orders, reviews, payments] = await Promise.all([
      Order.find({ user: user._id })
        .populate("items.product", "name image pricePerMonth")
        .sort("-createdAt"),
      Review.find({ user: user._id })
        .populate("product", "name image")
        .sort("-createdAt"),
      Payment.find({ user: user._id }).sort("-createdAt"),
    ]);

    res.json({
      user,
      rentals: orders.filter((o) =>
        ["confirmed", "active", "delivered", "completed"].includes(o.status),
      ),
      orderHistory: orders,
      reviews,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = req.body.slug || name.toLowerCase().replace(/\s+/g, "-");
    const category = await Category.create({ ...req.body, slug });
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.user._id },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order with full payment + rental details
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email mobile")
      .populate("items.product", "name image pricePerMonth deposit");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payments = await Payment.find({ order: order._id });
    res.json({ order, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve return request
export const processReturn = async (req, res) => {
  try {
    const { status, returnCondition } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status === "approved") {
      order.isReturned = true;
      order.status = "returned";
      order.returnCondition = returnCondition || "good";
      order.returnRequested = false;
    } else if (status === "rejected") {
      order.returnRequested = false;
    }

    order.activityLog.push({
      action: `Return ${status}`,
      updatedBy: req.user._id,
    });

    await order.save();
    res.json({ order, message: `Return ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Extend rental tenure
export const extendTenure = async (req, res) => {
  try {
    const { months } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Add additional rent cost
    const rentPerMonth = order.items.reduce(
      (acc, item) => acc + (item.totalRent || 0) / (item.tenure || 1),
      0,
    );
    const additional = rentPerMonth * months;

    order.extendedTenure = (order.extendedTenure || 0) + months;
    order.rentalStatus = "extended";
    order.totalAmount += additional;
    order.activityLog.push({
      action: `Extended tenure by ${months} months`,
      updatedBy: req.user._id,
    });

    await order.save();
    res.json({ order, message: `Tenure extended by ${months} months` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment manually (mark as paid)
export const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "paid";
    await payment.save();

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "paid",
      status: "confirmed",
    });

    res.json({ payment, message: "Payment verified" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refund payment / deposit
export const refundPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "refunded";
    await payment.save();

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "refunded",
      refundAmount: amount || payment.amount,
    });

    res.json({ payment, message: "Payment refunded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort("-createdAt");
    res.json({ coupons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ coupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json({ coupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json({ message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("product", "name image")
      .populate("user", "name email")
      .sort("-createdAt");
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort("-createdAt");
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json({ notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort("order");
    res.json({ banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ banner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json({ banner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json({ message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort("-createdAt");
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const { title } = req.body;
    const slug = req.body.slug || title.toLowerCase().replace(/\s+/g, "-");
    const post = await BlogPost.create({ ...req.body, slug });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("order", "totalAmount")
      .sort("-createdAt");
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user._id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user._id });
    }
    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true, upsert: true },
    );
    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, mobile, age, adminRole } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      mobile,
      age: age || 18,
      role: "admin",
      // Default new admins to superadmin unless a specific adminRole is provided
      adminRole: adminRole || "superadmin",
    });
    res.status(201).json({
      user: {
        _id: user._id,
        name,
        email,
        mobile,
        role: "admin",
        adminRole: user.adminRole,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// PRODUCT ANALYTICS
// ============================
export const getProductAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "paid" }).populate(
      "items.product",
      "name category pricePerMonth",
    );

    const productMap = {}; // per product: revenue + rental count
    const categoryMap = {}; // per category: revenue + count

    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!item.product) return;
        const pid = item.product._id.toString();
        const cat = item.product.category || "uncategorized";
        const rent = item.totalRent || 0;
        const qty = item.quantity || 1;

        if (!productMap[pid]) {
          productMap[pid] = {
            _id: pid,
            name: item.product.name,
            category: cat,
            revenue: 0,
            rentalCount: 0,
          };
        }
        productMap[pid].revenue += rent;
        productMap[pid].rentalCount += qty;

        if (!categoryMap[cat]) {
          categoryMap[cat] = { category: cat, revenue: 0, rentalCount: 0 };
        }
        categoryMap[cat].revenue += rent;
        categoryMap[cat].rentalCount += qty;
      });
    });

    const mostRented = Object.values(productMap).sort(
      (a, b) => b.rentalCount - a.rentalCount,
    );
    const topCategories = Object.values(categoryMap).sort(
      (a, b) => b.revenue - a.revenue,
    );
    const revenuePerProduct = Object.values(productMap).sort(
      (a, b) => b.revenue - a.revenue,
    );

    res.json({
      mostRentedProducts: mostRented.slice(0, 10),
      topCategories: topCategories.slice(0, 10),
      revenuePerProduct: revenuePerProduct.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// PRODUCT STOCK MANAGEMENT
// ============================
// body: { action: "increase" | "decrease", amount: number }
export const updateProductStock = async (req, res) => {
  try {
    const { action, amount } = req.body;
    const qty = Number(amount) || 1;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (action === "increase") {
      product.stock += qty;
    } else if (action === "decrease") {
      if (product.stock - qty < 0) {
        return res.status(400).json({ message: "Stock cannot go below 0" });
      }
      product.stock -= qty;
    } else {
      // absolute set
      product.stock = Math.max(0, qty);
    }

    product.isAvailable = product.stock > 0;
    await product.save();

    res.json({ product, message: "Stock updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
