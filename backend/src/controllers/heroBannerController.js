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

// UPDATE BANNER

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, subtitle, buttonText, link, isActive, order,features } = req.body;

    const banner = await HeroBanner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // NEW IMAGE UPLOAD

    if (req.file) {
      // DELETE OLD IMAGE

      if (banner.image) {
        const oldImagePath = path.join(
          "uploads/hero",
          path.basename(banner.imageUrl),
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      banner.image = `/uploads/hero/${req.file.filename}`;
    }

    // UPDATE FIELDS

    banner.title = title || banner.title;
    banner.subtitle = subtitle || banner.subtitle;
    banner.buttonText = buttonText || banner.buttonText;
    banner.link = link || banner.link;

    banner.isActive = isActive !== undefined ? isActive : banner.isActive;

    banner.order = order !== undefined ? order : banner.order;
    banner.features = features ? JSON.parse(features) : banner.features;

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    res.status(500).json({
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
        path.basename(banner.imageUrl),
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
