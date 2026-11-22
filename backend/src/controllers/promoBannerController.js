
import PromoBanner from "../models/PromoBanner.js";
// GET ALL PROMO BANNERS

export const getPromoBanners = async (req, res) => {
  try {
    const banners = await PromoBanner.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedBanners = banners.map((banner) => ({
      ...banner,

      image: banner.image
        ? {
            data: banner.image.data
              ? banner.image.data.toString("base64")
              : "",
            contentType: banner.image.contentType || "",
          }
        : null,
    }));

    res.status(200).json(formattedBanners);
  } catch (err) {
    console.error("GET PROMO BANNERS ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// CREATE PROMO BANNER
export const createPromoBanner = async (req, res) => {
  try {
    const {
      type,
      title,
      subtitle,
      buttonText,
      buttonLink,
    } = req.body;

    console.log("CONTENT TYPE:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Check image
    if (!req.file) {
      return res.status(400).json({
        message: "Banner image is required",
      });
    }

    // Save image directly into MongoDB
    const banner = new PromoBanner({
      type: type || "offer",
      title,
      subtitle,
      buttonText,
      buttonLink,

      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await banner.save();

    res.status(201).json({
      success: true,
      message: "Promo banner created successfully",

      banner: {
        _id: banner._id,
        type: banner.type,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt,
      },
    });
  } catch (err) {
    console.error("CREATE PROMO BANNER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// UPDATE PROMO BANNER
export const updatePromoBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      type,
      title,
      subtitle,
      buttonText,
      buttonLink,
    } = req.body;

    const banner = await PromoBanner.findById(id);

    if (!banner) {
      return res.status(404).json({
        error: "Banner not found",
      });
    }

    // UPDATE IMAGE
  
    if (req.file) {
      banner.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    
    // UPDATE OTHER FIELDS
   
    if (type !== undefined && type !== "") {
      banner.type = type;
    }

    if (title !== undefined && title !== "") {
      banner.title = title;
    }

    if (subtitle !== undefined) {
      banner.subtitle = subtitle;
    }

    if (buttonText !== undefined && buttonText !== "") {
      banner.buttonText = buttonText;
    }

    if (buttonLink !== undefined && buttonLink !== "") {
      banner.buttonLink = buttonLink;
    }

    await banner.save();

    res.status(200).json({
      success: true,

      message: req.file
        ? "Promo banner image updated successfully"
        : "Promo banner updated successfully",

      banner: {
        _id: banner._id,
        type: banner.type,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt,
      },
    });
  } catch (err) {
    console.error("UPDATE PROMO BANNER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};


// DELETE PROMO BANNER

export const deletePromoBanner = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    // Image is stored inside MongoDB.
    // No fs/path delete required.

    await banner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Promo banner deleted successfully",
    });
  } catch (err) {
    console.error("DELETE PROMO BANNER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

