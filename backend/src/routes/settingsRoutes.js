import express from "express";
import {
  getSettings,
  updateSettings,
  addSettingsAddress,
  addPaymentMethod,
  deletePaymentMethod,
  updateNotifications,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All settings routes are protected
router.get("/:userId", protect, getSettings);
router.put("/:userId", protect, updateSettings);
router.post("/address", protect, addSettingsAddress);
router.post("/payment", protect, addPaymentMethod);
router.delete("/payment/:id", protect, deletePaymentMethod);
router.put("/notifications/:userId", protect, updateNotifications);

export default router;
