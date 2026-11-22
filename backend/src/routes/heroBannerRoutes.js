
import express from "express";
import upload from "../config/multer.js";

import {
  getBanners,
  getAdminBanners,
  addBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/heroBannerController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Home page ke liye active Hero Banners
router.get("/", getBanners);

// Admin page ke liye saare Hero Banners
router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAdminBanners
);

// Admin - Add Hero Banner
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  addBanner
);

// Admin - Update Hero Banner
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateBanner
);

// Admin - Delete Hero Banner
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBanner
);

export default router;

