
import express from "express";

import {
  getPromoBanners,
  createPromoBanner,
  updatePromoBanner,
  deletePromoBanner,
} from "../controllers/promoBannerController.js";

import upload from "../config/multer.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL PROMO BANNERS

router.get("/", getPromoBanners);


// CREATE PROMO BANNER

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createPromoBanner,
);


// UPDATE PROMO BANNER

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updatePromoBanner,
);


// DELETE PROMO BANNER

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePromoBanner,
);

export default router;

