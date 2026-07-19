import express from "express";
import { cancleOrder, getOrderById, getOrders, placeOrder, updateOrderStatus} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/",protect,getOrders); 
router.get("/:id",protect,getOrderById)
router.get("/:id/status",protect,authorize("admin"),updateOrderStatus)
router.put("/:id/cancel",protect,cancleOrder)

export default router;
