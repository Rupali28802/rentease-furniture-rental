import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    businessType: { type: String, required: true },
    city: { type: String, required: true },
    message: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Partner", partnerSchema);
