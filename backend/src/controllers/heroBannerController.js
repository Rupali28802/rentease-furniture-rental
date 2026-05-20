import HeroBanner from "../models/HeroBanner.js";
import fs from "fs";
import path from "path";

// GET all banners
export const getBanners = async (req, res) => {
  const banners = await HeroBanner.find();
  res.json(banners);
};

// CREATE banner
export const addBanner = async (req, res) => {
  const { title, subtitle, buttonText, link } = req.body;
  const imageUrl = req.file ? `/uploads/hero/${req.file.filename}` : "";

  const banner = new HeroBanner({
    title,
    subtitle,
    buttonText,
    link,
    imageUrl,
  });
  await banner.save();
  res.json(banner);
};

// UPDATE banner
export const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, buttonText, link } = req.body;

  const banner = await HeroBanner.findById(id);
  if (!banner) return res.status(404).json({ error: "Banner not found" });

  // Agar naya image upload hua hai toh purana delete karo
  if (req.file) {
    const oldImagePath = path.join(
      "uploads/hero",
      banner.imageUrl.split("/").pop(),
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    banner.imageUrl = `/uploads/hero/${req.file.filename}`;
  }

  banner.title = title || banner.title;
  banner.subtitle = subtitle || banner.subtitle;
  banner.buttonText = buttonText || banner.buttonText;
  banner.link = link || banner.link;

  await banner.save();
  res.json(banner);
};

// DELETE banner
export const deleteBanner = async (req, res) => {
  const { id } = req.params;
  const banner = await HeroBanner.findById(id);
  if (!banner) return res.status(404).json({ error: "Banner not found" });

  // Purana image delete karo
  const oldImagePath = path.join(
    "uploads/hero",
    banner.imageUrl.split("/").pop(),
  );
  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath);
  }

  await HeroBanner.findByIdAndDelete(id);
  res.json({ message: "Banner deleted successfully" });
};
