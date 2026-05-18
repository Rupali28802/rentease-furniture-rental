import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/logout", protect, logoutUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset/:token",resetPassword);


export default router;