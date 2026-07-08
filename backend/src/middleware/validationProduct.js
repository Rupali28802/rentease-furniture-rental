import {
  CATEGORY_LIST,
  CATEGORY_NAMES,
  CATEGORY_TENURE_RULES,
} from "../constants/categories.js";
import { TENURE_OPTIONS } from "../constants/tenureOptions.js";
import fs from "fs";

export const validateProduct = (req, res, next) => {
  const { name, category, pricePerMonth, deposit, tenureOptions, stock } =
    req.body || {};

  const deleteImage = () => {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("File delete error:", err);
      });
    }
  };

  // Required fields
  if (!name || !category || !pricePerMonth || !deposit) {
    deleteImage();
    return res.status(400).json({
      message: "name, category, pricePerMonth, deposit are required",
    });
  }

  //  Category validation (against slugs)
  const allowedCategories = CATEGORY_LIST.map((c) => c.slug);
  if (!allowedCategories.includes(category)) {
    deleteImage();
    return res.status(400).json({
      message: `Invalid category. Allowed: ${allowedCategories.join(", ")}`,
    });
  }

  //  Number validation
  if (isNaN(pricePerMonth) || pricePerMonth <= 0) {
    deleteImage();
    return res.status(400).json({
      message: "pricePerMonth must be a positive number",
    });
  }

  if (isNaN(deposit) || deposit < 0) {
    deleteImage();
    return res.status(400).json({
      message: "deposit must be a valid number",
    });
  }

  //  Tenure validation
  if (tenureOptions) {
    const parsed = Array.isArray(tenureOptions)
      ? tenureOptions
      : [tenureOptions];
    const invalid = parsed.filter(
      (t) => !TENURE_OPTIONS.map((opt) => opt.value).includes(Number(t)),
    );

    if (invalid.length > 0) {
      deleteImage();
      return res.status(400).json({
        message: `Invalid tenureOptions. Allowed: ${TENURE_OPTIONS.map((opt) => opt.value).join(", ")}`,
      });
    }

    //  Optional: Dynamic tenure validation per category
    const categoryKey = category.toUpperCase().replace("-", "_");
    const rules = CATEGORY_TENURE_RULES[categoryKey];
    if (rules && !parsed.every((t) => rules.includes(Number(t)))) {
      deleteImage();
      return res.status(400).json({
        message: `Invalid tenureOptions for category ${CATEGORY_NAMES[categoryKey]}. Allowed: ${rules.join(", ")}`,
      });
    }
  }

  //  Stock validation
  if (stock !== undefined && (isNaN(stock) || stock < 0)) {
    deleteImage();
    return res.status(400).json({
      message: "stock must be a valid number",
    });
  }

  next();
};
