import HeroBanner from "../models/HeroBanner.js";

// ===============================
// GET ALL ACTIVE HERO BANNERS
// ===============================
export const getBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find({
      isActive: true,
    })
      .sort({ order: 1 })
      .lean();

    const formattedBanners = banners.map((banner) => ({
      ...banner,
      image: banner.image
        ? {
            data: banner.image.data ? banner.image.data.toString("base64") : "",
            contentType: banner.image.contentType || "",
          }
        : null,
    }));

    res.status(200).json(formattedBanners);
  } catch (error) {
    console.error("GET HERO BANNERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// CREATE HERO BANNER
// ===============================
export const addBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      buttonText,
      link,
      order,
      features,
    } = req.body;

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

    // Parse features
    let parsedFeatures = [];

    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid features JSON",
        });
      }
    }

    // Save image directly into MongoDB
    const banner = await HeroBanner.create({
      title,
      subtitle,
      buttonText,
      link,
      order: order ? Number(order) : 0,
      features: parsedFeatures,

      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    res.status(201).json({
      success: true,
      message: "Hero banner created successfully",

      banner: {
        _id: banner._id,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonText: banner.buttonText,
        link: banner.link,
        order: banner.order,
        features: banner.features,
        isActive: banner.isActive,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt,
      },
    });
  } catch (error) {
    console.error("ADD HERO BANNER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL HERO BANNERS FOR ADMIN
// ===============================
export const getAdminBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find().sort({ order: 1 }).lean();

    const formattedBanners = banners.map((banner) => ({
      ...banner,
      image: banner.image
        ? {
            data: banner.image.data ? banner.image.data.toString("base64") : "",
            contentType: banner.image.contentType || "",
          }
        : null,
    }));

    res.status(200).json({
      banners: formattedBanners,
    });
  } catch (error) {
    console.error("GET ADMIN HERO BANNERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// UPDATE HERO BANNER
// ===============================
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

    // ===============================
    // UPDATE IMAGE
    // ===============================
    if (req.file) {
      banner.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // ===============================
    // UPDATE OTHER FIELDS
    // ===============================
    if (req.body.title !== undefined) {
      banner.title = req.body.title;
    }

    if (req.body.subtitle !== undefined) {
      banner.subtitle = req.body.subtitle;
    }

    if (req.body.buttonText !== undefined) {
      banner.buttonText = req.body.buttonText;
    }

    if (req.body.link !== undefined) {
      banner.link = req.body.link;
    }

    if (
      req.body.order !== undefined &&
      req.body.order !== ""
    ) {
      banner.order = Number(req.body.order);
    }

    if (req.body.isActive !== undefined) {
      banner.isActive =
        req.body.isActive === true ||
        req.body.isActive === "true";
    }

    // ===============================
    // UPDATE FEATURES
    // ===============================
    if (
      req.body.features !== undefined &&
      req.body.features !== ""
    ) {
      try {
        banner.features = JSON.parse(req.body.features);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid features JSON",
        });
      }
    }

    await banner.save();

    res.status(200).json({
      success: true,
      message: req.file
        ? "Hero banner image updated successfully"
        : "Hero banner updated successfully",

      banner: {
        _id: banner._id,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonText: banner.buttonText,
        link: banner.link,
        order: banner.order,
        features: banner.features,
        isActive: banner.isActive,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt,
      },
    });
  } catch (error) {
    console.error("UPDATE HERO BANNER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE HERO BANNER
// ===============================
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

    // Image is inside MongoDB.
    // No fs.unlinkSync() needed.

    await banner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Hero banner deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HERO BANNER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

