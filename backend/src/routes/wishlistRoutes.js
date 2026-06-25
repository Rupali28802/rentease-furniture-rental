import express from "express";
import {
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
  toggleWishlist
} from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/wishlist/add", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.get("/toggle",authMiddleware,toggleWishlist)
router.delete("/wishlist/delete", authMiddleware, deleteFromWishlist);

export default router;
