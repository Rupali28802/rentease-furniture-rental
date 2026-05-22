// controllers/categoryController.js
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      name: 1,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const addCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image required" });

    const category = new Category({
      name,
      slug,
      image: req.file.filename,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Not found" });

    if (req.file) {
      // delete old image
      if (category.image) {
        const oldPath = path.join("uploads/categories", category.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      category.image = req.file.filename;
    }

    category.name = req.body.name || category.name;
    category.slug = req.body.slug || category.slug;
    category.isActive = req.body.isActive ?? category.isActive;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Not found" });

    if (category.image) {
      const oldPath = path.join("uploads/categories", category.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
