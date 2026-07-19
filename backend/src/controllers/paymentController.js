

import crypto from "crypto";

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Notification from "../models/Notification.js";

import { sendEmail } from "../utils/sendEmail.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      userId,
    } = req.body;

    // 🔍 FIND ORDER
    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🔐 OWNERSHIP CHECK
    if (order.user._id.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // 🚫 ALREADY PAID CHECK
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Payment already verified",
      });
    }

    // 🔏 VERIFY SIGNATURE
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // ❌ PAYMENT FAILED
    if (razorpay_signature !== expectedSign) {
      order.paymentStatus = "failed";

      await order.save();

      // 🔔 NOTIFICATION
      await Notification.create({
        user: userId,

        title: "Payment Failed ❌",

        message: "Payment verification failed",

        type: "PAYMENT",
      });

      //  EMAIL
      await sendEmail({
        to: order.user.email,

        subject: "Payment Failed",

        text: `Payment failed for order ${order._id}`,

        html: `
          <h2>Payment Failed ❌</h2>

          <p>Your payment verification failed.</p>

          <p>Order ID: ${order._id}</p>
        `,
      });

      return res.status(400).json({
        message: "Invalid signature",
      });
    }

    // ✅ PAYMENT SUCCESS
    order.status = "confirmed";

    order.paymentStatus = "paid";

    order.paymentId = razorpay_payment_id;

    order.razorpayOrderId = razorpay_order_id;

    order.activityLog.push({
      action: "Payment verified successfully",

      updatedBy: userId,
    });

    await order.save();

    // 🔔 NOTIFICATION
    await Notification.create({
      user: userId,

      title: "Payment Successful 🎉",

      message: "Your payment has been verified",

      type: "PAYMENT",
    });

    // 📧 EMAIL
    await sendEmail({
      to: order.user.email,

      subject: "Payment Successful",

      text: `Payment successful for order ${order._id}`,

      html: `
        <h2>Payment Successful 🎉</h2>

        <p>Your payment has been verified successfully.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>
      `,
    });

    // 🛒 CLEAR CART
    await Cart.deleteMany({
      user: userId,
    });

    return res.status(200).json({
      message: "Payment verified successfully",

      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const razorpayWebhook = async(req,res)=>{
  
}