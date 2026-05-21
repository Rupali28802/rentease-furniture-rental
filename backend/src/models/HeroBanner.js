import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    link: {
      type: String,
      default: "/shop",
    },

    image: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("HeroBanner", heroBannerSchema);
