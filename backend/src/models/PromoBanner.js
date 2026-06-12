// models/Banner.js
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["offer", "newArrival"], required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true }, 
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("PromoBanner", bannerSchema);
