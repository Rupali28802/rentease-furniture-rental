import express from "express";
import {
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
} from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/wishlist/add", authMiddleware, addToWishlist);
router.get("/wishlist", authMiddleware, getWishlist);
router.delete("/wishlist/delete", authMiddleware, deleteFromWishlist);

export default router;
