import express from "express";
import {
  getAllTickets,
  getHelpContent,
  getMyTickets,
  submitContact,
} from "../controllers/helpController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: fetch FAQ + contact info
router.get("/", getHelpContent);

// Protected: submit a support query
router.post("/contact", protect, submitContact);

// Protected: view my tickets
router.get("/tickets", protect, getMyTickets);

// Admin: view all tickets
router.get("/tickets/all", protect, authorize("admin"), getAllTickets);

export default router;
