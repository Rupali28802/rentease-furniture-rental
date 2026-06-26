import express from "express";
import {
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
  toggleWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",protect, addToWishlist);
router.get("/", protect, getWishlist);
router.get("/toggle",protect,toggleWishlist)
router.delete("/delete", protect, deleteFromWishlist);

export default router;
