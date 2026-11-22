import HeroBanner from "../models/HeroBanner.js";
import fs from "fs";
import path from "path";

// GET ALL BANNERS

export const getBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find({
      isActive: true,
    }).sort({ order: 1 });

    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE BANNER

export const addBanner = async (req, res) => {
  try {
    const { title, subtitle, buttonText, link, order,features } = req.body;

    // IMAGE VALIDATION

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

   const image = `/uploads/hero/${req.file.filename}`;

    const banner = await HeroBanner.create({
      title,
      subtitle,
      buttonText,
      link,
      image,
      order,
      features: features ? JSON.parse(features) : [],
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BANNERS FOR ADMIN
export const getAdminBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find().sort({ order: 1 });

    res.status(200).json({
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BANNER

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await HeroBanner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // =========================
    // ONLY UPDATE IMAGE
    // =========================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a new image",
      });
    }

    // Delete old image if it exists
    if (banner.image) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        "hero",
        path.basename(banner.image)
      );

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (error) {
        console.error(
          "Old image delete failed:",
          error.message
        );
      }
    }

    // Save new image path
    banner.image = `/uploads/hero/${req.file.filename}`;

    // Save document
    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Hero banner image updated successfully",
      banner,
    });
  } catch (error) {
    console.error("UPDATE HERO IMAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE BANNER

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await HeroBanner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // DELETE IMAGE

    if (banner.image) {
      const oldImagePath = path.join(
        "uploads/hero",
        path.basename(banner.image),
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await banner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
