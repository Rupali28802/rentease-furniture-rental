import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
  },
  { timestamps: true },
);

export default mongoose.model("SupportTicket", supportTicketSchema);
