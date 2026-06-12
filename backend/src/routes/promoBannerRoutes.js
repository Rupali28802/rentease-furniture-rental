import express from "express";
import {
  getPromoBanners,
  createPromoBanner,
  updatePromoBanner,
  deletePromoBanner,
} from "../controllers/promoBannerController.js";
import upload from "../config/multer.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPromoBanners); 
router.post("/", protect, authorize("admin"),  (req, res, next) => {
    console.log(req.body);
    next();
  },  upload.single("image") ,createPromoBanner); 
router.put("/:id", protect, authorize("admin"),  upload.single("image"), updatePromoBanner); 
router.delete("/:id", protect, authorize("admin"), deletePromoBanner); 

export default router;
