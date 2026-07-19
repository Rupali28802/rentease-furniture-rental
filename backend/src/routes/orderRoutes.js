import express from "express";
import { getOrders, placeOrder, updateOrderStatus} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/",protect,getOrders); 
router.get("/:id/status",protect,authorize("admin"),updateOrderStatus)

export default router;
