import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String, default: "Shop Now" },
    link: { type: String, default: "/shop" },
    image: { type: String },
    position: {
      type: String,
      enum: ["hero", "promo", "footer"],
      default: "hero",
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Banner", bannerSchema);
