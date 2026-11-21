import express from "express";
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import promoBannerRoutes from "./routes/promoBannerRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.get("/",(req,res)=>{
    res.send("Rentease backend is running")
})
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "https://rentease-furniture-rental-ukdn-one.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// );

// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// auth route
app.use("/api/auth", authRoutes);
app.use("/api/hero-banners", heroBannerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/promo-banners", promoBannerRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
// app.use("/api/coupons", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);
export default app;
