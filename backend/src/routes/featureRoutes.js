import express, { Router } from "express";
import { getFeature, createFeature, updateFeature, deleteFeature } from "../controllers/featureController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/",protect,authorize("admin") ,createFeature);
router.put("/:id",protect,authorize("admin") ,updateFeature);
router.get("/",getFeature)

router.delete("/:id", protect, authorize("admin"), deleteFeature);
export default router;