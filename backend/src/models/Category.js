
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. Sofas
    slug: { type: String, required: true, unique: true }, // e.g. sofas
    image: { type: String }, // uploaded file name
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
