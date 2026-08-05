import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["card", "upi"], default: "card" },
    holderName: String,
    number: String,
    expiry: String,
    upiId: String,
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profile: {
      name: String,
      email: String,
      mobile: String,
      age: Number,
    },

    paymentMethods: [paymentMethodSchema],

    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      orderUpdates: { type: Boolean, default: true },
      promotions: { type: Boolean, default: false },
    },

    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Settings", settingsSchema);
