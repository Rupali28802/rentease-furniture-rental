// import PromoBanner from "../models/PromoBanner.js";
// import fs from "fs";
// import path from "path";

// // GET all promo banners
// export const getPromoBanners = async (req, res) => {
//   try {
//     const banners = await PromoBanner.find();
//     res.json(banners);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // CREATE promo banner
// export const createPromoBanner = async (req, res) => {
//   try {
//     const { title, subtitle, buttonText, buttonLink } = req.body;
//     // IMAGE VALIDATION

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Banner image is required",
//       });
//     }

//     const image = req.file.filename;

//     const banner = new PromoBanner({
//       title,
//       subtitle,
//       buttonText,
//       buttonLink,
//       image,
//     });

//     await banner.save();
//     res.status(201).json(banner);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // UPDATE promo banner
// export const updatePromoBanner = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const { title, subtitle, buttonText, buttonLink };
//     const banner = await PromoBanner.findById(id)

//     if (!banner) return res.status(404).json({ error: "Banner not found" });
// if (req.file) {
//   // DELETE OLD IMAGE

//   if (banner.image) {
//     const oldImagePath = path.join("uploads/hero", path.basename(banner.image));

//     if (fs.existsSync(oldImagePath)) {
//       fs.unlinkSync(oldImagePath);
//     }
//   }
//   banner.image = `/uploads/hero/${req.file.filename}`;
// }
//     banner.title = title || banner.title;
//     banner.subtitle = subtitle || banner.subtitle;
//     banner.buttonText = buttonText || banner.buttonText;
//     banner.buttonLink = buttonLink || banner.buttonLink;

//     if (req.file) {
//       banner.image = req.file.filename;
//     }

//     await banner.save();
//     res.json(banner);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE promo banner
// export const deletePromoBanner = async (req, res) => {
//   try {
//     await PromoBanner.findByIdAndDelete(req.params.id);
//     res.json({ message: "Banner deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


import PromoBanner from "../models/PromoBanner.js";
import fs from "fs";
import path from "path";

// GET all promo banners
export const getPromoBanners = async (req, res) => {
  try {
    const banners = await PromoBanner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE promo banner
export const createPromoBanner = async (req, res) => {
  try {
    const { type, title, subtitle, buttonText, buttonLink } = req.body;
  console.log("CONTENT TYPE:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
    

    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const image = `/uploads/promo/${req.file.filename}`;

    const banner = new PromoBanner({
      type:"offer",
      title,
      subtitle,
      buttonText,
      buttonLink,
      image,
    });

    await banner.save();
 


    res.status(201).json(banner);
  } catch (err) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    res.status(500).json({ error: err.message });
  }
};

// UPDATE promo banner
export const updatePromoBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, subtitle, buttonText, buttonLink } = req.body;

    const banner = await PromoBanner.findById(id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    if (req.file) {
      if (banner.image) {
        const oldImagePath = path.join(
          "uploads/promo",
          path.basename(banner.image),
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      banner.image = `/uploads/promo/${req.file.filename}`;
    }

    banner.type = type || banner.type;
    banner.title = title || banner.title;
    banner.subtitle = subtitle || banner.subtitle;
    banner.buttonText = buttonText || banner.buttonText;
    banner.buttonLink = buttonLink || banner.buttonLink;

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE promo banner
export const deletePromoBanner = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (banner.image) {
      const oldImagePath = path.join(
        "uploads/promo",
        path.basename(banner.image),
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await PromoBanner.findByIdAndDelete(req.params.id);
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
