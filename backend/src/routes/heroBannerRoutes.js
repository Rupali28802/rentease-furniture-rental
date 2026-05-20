import express from "express";
import upload from "../config/multer.js";
import {
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/heroBannerController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/", protect, authorize("admin"), upload.single("image"), addBanner);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateBanner,
);
router.delete("/:id", protect, authorize("admin"), deleteBanner);

export default router;
