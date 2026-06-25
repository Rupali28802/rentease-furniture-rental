import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import promoBannerRoutes from "./routes/promoBannerRoutes.js";
import featureRoutes from "./routes/featureRoutes.js"
import path from "path"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());

// auth route
app.use("/api/auth", authRoutes);
app.use("/api/hero-banners", heroBannerRoutes);
app.use("/api/categories",categoryRoutes)
app.use("/api/promo-banners",promoBannerRoutes)
app.use("/api/features", featureRoutes);
app.use("/api/address",addressRoutes)
app.use("/api/products", productRoutes);
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders", orderRoutes);
app.use("api/coupons",cartRoutes);
app.use("/api/reviews", reviewRoutes);
export default app;
