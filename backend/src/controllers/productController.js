import Product from "../models/Product.js";
import Review from "../models/review.js";
import Notification from "../models/Notification.js";
import fs from "fs";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    
    const galleryImages = req.files?.gallery
      ? req.files.gallery.map((file) => file.path)
      : req.body.gallery || [];

    const product = await Product.create({
      ...req.body,

      image: req.files?.image ? req.files.image[0].path : req.body.image,

      gallery: galleryImages,
    });

    await Notification.create({
      user: req.user._id,
      title: "Product Added 🏷️",
      message: `${product.name} added successfully`,
      type: "SYSTEM",
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Product.distinct("category");

//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// GET ALL PRODUCTS (Search + Filter + Pagination)
export const getProducts = async (req, res) => {
  try {
    let {
      search,
      category,
      minPrice,
      maxPrice,
      tenure,
      page = 1,
      limit = 20,
      available,
      sort = "popular",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    let query = {};

    //  Search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Category filter
    if (category) {
      // Agar comma separated string aayi ho to split kar lo
      const categories = category.split(",");
      if (categories.length > 1) {
        query.category = { $in: categories };
      } else {
        query.category = categories[0]; // single slug
      }
    }

    //  Price filter
    if (minPrice || maxPrice) {
      query.pricePerMonth = {};
      if (minPrice) query.pricePerMonth.$gte = Number(minPrice);
      if (maxPrice) query.pricePerMonth.$lte = Number(maxPrice);
    }

    // Tenure
    if (tenure) {
      query.tenureOptions = { $in: [Number(tenure)] };
    }
    //  Availability filter
    if (available !== undefined) {
      query.isAvailable = available === "true";
    }

    let sortOption = {};
    if (sort === "priceLow") sortOption = { pricePerMonth: 1 };
    else if (sort === "priceHigh") sortOption = { pricePerMonth: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const reviews = await Review.find({ product: product._id }).populate(
      "user",
      "name",
    );
    // ✅ Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    res.json({
      product,
      reviews,
      averageRating: avgRating,
      reviewCount: reviews.length,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    //  old image delete
    if (req.file && product.image) {
      fs.unlink(product.image, (err) => {
        if (err) console.log("Old image delete error:", err);
      });
    }

    // update allowed fields only
    const fields = [
      "name",
      "description",
      "category",
      "pricePerMonth",
      "deposit",
      "tenureOptions",
      "stock",
      "isAvailable",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    if (req.file) {
      product.image = req.file.path;
    }

    product = await product.save();
     await Notification.create({
       user: req.user._id,
       title: "Product Updated ✏️",
       message: `${product.name} updated successfully`,
       type: "SYSTEM",
     });

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    //  delete image file
    if (product.image) {
      fs.unlink(product.image, (err) => {
        if (err) console.log("Delete image error:", err);
      });
    }

    await product.deleteOne();

    await Notification.create({
      user: req.user._id,
      title: "Product Deleted ",
      message: `${product.name} removed successfully`,
      type: "SYSTEM",
    });


    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


