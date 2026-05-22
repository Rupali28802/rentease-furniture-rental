import express from "express";
import upload from "../config/multer.js";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getCategories);
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  addCategory,
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateCategory,
);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;
