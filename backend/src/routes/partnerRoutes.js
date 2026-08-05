import express from "express";
import {
  applyPartner,
  getAllApplications,
  getMyApplications,
} from "../controllers/partnerController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected: submit partner application
router.post("/apply", protect, applyPartner);

// Protected: view my applications
router.get("/applications", protect, getMyApplications);

// Admin: view all applications
router.get(
  "/applications/all",
  protect,
  authorize("admin"),
  getAllApplications,
);

export default router;
