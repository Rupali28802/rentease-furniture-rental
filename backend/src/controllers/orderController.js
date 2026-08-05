import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
import razorpay from "../config/razorpay.js";

export const placeOrder = async (req, res) => {
  try {
    const { addressId, couponCode, rentNow } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Get address
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    //  Build order items based on checkout mode
    let orderItems = [];

    if (rentNow) {
      // RENT NOW: create order using only the selected product
      const { productId, tenure, quantity } = req.body;

      if (!productId || !tenure) {
        return res
          .status(400)
          .json({ message: "productId and tenure required for rentNow" });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const qty = quantity || 1;

      orderItems = [
        {
          product: product._id,
          quantity: qty,
          tenure: Number(tenure),
          deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          totalRent: product.pricePerMonth * Number(tenure) * qty,
          deposit: product.deposit * qty,
        },
      ];
    } else {
      // CART CHECKOUT: create order from entire cart
      const cartItems = await Cart.find({ user: req.user._id }).populate(
        "product",
      );

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      orderItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        tenure: item.tenure,
        deliveryDate: item.deliveryDate,
        totalRent: item.totalRent,
        deposit: item.deposit,
      }));
    }

    //  total calculate
    let totalAmount = orderItems.reduce(
      (acc, item) => acc + item.totalRent + item.deposit,
      0,
    );

    // Coupon apply (agar diya ho)
    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (
        coupon &&
        coupon.expiry >= new Date() &&
        coupon.usedCount < coupon.usageLimit
      ) {
        if (coupon.discountType === "percentage") {
          discount = (totalAmount * coupon.discountValue) / 100;
        } else {
          discount = coupon.discountValue;
        }
        totalAmount = totalAmount - discount; // final amount update
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    //  create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      addresses: {
        ...address.toObject(), //  सारे fields आ जाएंगे
      },
      totalAmount,
      discount,
      coupon: couponCode || null,
      status: "pending",
      paymentStatus: "pending", //  important
      activityLog: [
        {
          action: "Order placed",
          updatedBy: req.user._id,
        },
      ],
    });

    //  notification
    await Notification.create({
      user: req.user._id,
      title: "Order Placed 🎉",
      message: `Your order #${order._id} has been placed`,
      type: "ORDER",
    });

    // 📧 EMAIL
    await sendEmail({
      to: user.email,

      subject: "Order Placed Successfully",

      text: `Hello ${user.name},

Your order ${order._id} has been placed successfully.`,

      html: `
        <h2>Order Confirmed 🎉</h2>

        <p>Hello ${user.name},</p>
        <p>Your order has been placed successfully.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      `,
    });

    //  create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `order_${order._id}`,
    });
    // NOTE: Cart is NOT cleared here. The cart is only cleared after
    // successful payment verification in paymentController (verifyPayment).
    // This ensures that if payment fails, the user's cart is preserved.
    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      order,
      razorpayOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get User Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product user",
    );
    if (!order) return res.status(404).json({ message: "order not found" });

    if (
      order.user._id.toString() != req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    order.activityLog.push({
      action: `Status updated to ${status}`,
      updatedBy: req.user._id,
    });

    await order.save();
    await Notification.create({
      user: order.user,
      title: "Order Update ",
      message: `Your order status is now ${status}`,
      type: "ORDER",
    });
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (["confirmed", "shipped", "delivered"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Cannot cancel after confirmation/shipping" });
    }
    order.status = "cancelled";
    order.activityLog.push({
      action: "Order cancelled",
      updatedBy: req.user._id,
    });
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refoundOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.paymentStatus = "refunded";
    order.refundAmount = amount || order.refundAmount;
    order.activityLog.push({
      action: `Refund processed :₹${order.refundAmount}`,
      updatedBy: req.user._id,
    });

    await order.save();

    res.json({ message: "Refund processed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
