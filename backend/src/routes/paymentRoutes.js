import express from "express";
import { razorpayWebhook, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Verify Razorpay payment
router.post("/verify", protect, verifyPayment);
router.post("/webhook",razorpayWebhook)

export default router;
