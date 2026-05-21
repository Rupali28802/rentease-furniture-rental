import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

// ✅ ADD / UPDATE CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, tenure, deliveryDate } = req.body;

    // ✅ validation
    if (!productId || !tenure || !deliveryDate) {
      return res.status(400).json({
        message: "productId, tenure, deliveryDate required",
      });
    }

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid Product ID",
      });
    }

    // ✅ find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ✅ stock validation
    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available",
      });
    }

    // ✅ availability validation
    if (!product.isAvailable) {
      return res.status(400).json({
        message: "Product currently unavailable",
      });
    }

    // ✅ tenure validation
    if (!product.tenureOptions.includes(Number(tenure))) {
      return res.status(400).json({
        message: `Invalid tenure. Allowed: ${product.tenureOptions}`,
      });
    }
    // ✅ delivery date validation
    if (new Date(deliveryDate) < new Date()) {
      return res.status(400).json({
        message: "Delivery date must be in the future",
      });
    }

    // ✅ calculations
    const totalRent = product.pricePerMonth * Number(tenure) * Number(quantity);

    const deposit = product.deposit;

    // ✅ check existing cart item
    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    // ✅ UPDATE EXISTING CART ITEM
    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.tenure = Number(tenure);
      cartItem.deliveryDate = deliveryDate;
      cartItem.totalRent = totalRent;
      cartItem.deposit = deposit;

      await cartItem.save();

      // 🔔 notification
      await Notification.create({
        user: req.user._id,
        title: "Cart Updated 🛒",
        message: `${product.name} updated in cart`,
        type: "SYSTEM",
      });

      return res.json({
        message: "Cart updated successfully",
        cartItem,
      });
    }

    // ✅ CREATE NEW CART ITEM
    cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
      tenure: Number(tenure),
      deliveryDate,
      totalRent,
      deposit,
    });

    // 🔔 notification
    await Notification.create({
      user: req.user._id,
      title: "Added to Cart 🛒",
      message: `${product.name} added to cart`,
      type: "SYSTEM",
    });

    return res.status(201).json({
      message: "Added to cart successfully",
      cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate({
      path: "product",
      select: "name image category pricePerMonth deposit stock isAvailable",
    });

    const grandTotal = cart.reduce(
      (acc, item) => acc + item.totalRent + item.deposit,
      0,
    );

    return res.json({
      items: cart,
      totalItems: cart.length,
      grandTotal,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ UPDATE CART ITEM
export const updateCart = async (req, res) => {
  try {
    const { quantity, tenure, deliveryDate } = req.body;

    let cartItem = await Cart.findById(req.params.id).populate("product");

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    // ✅ quantity update
    if (quantity) {
      if (cartItem.product.stock < quantity) {
        return res.status(400).json({
          message: "Insufficient stock available",
        });
      }

      cartItem.quantity = quantity;
    }

    // ✅ tenure update
    if (tenure) {
      const newTenure = Number(tenure);

      if (!cartItem.product.tenureOptions.includes(newTenure)) {
        return res.status(400).json({
          message: `Invalid tenure. Allowed: ${cartItem.product.tenureOptions}`,
        });
      }

      cartItem.tenure = newTenure;
    }

    // ✅ delivery date update
    if (deliveryDate) {
      cartItem.deliveryDate = deliveryDate;
    }

    // ✅ recalculate totals
    cartItem.totalRent =
      cartItem.product.pricePerMonth * cartItem.tenure * cartItem.quantity;

    cartItem.deposit = cartItem.product.deposit*cartItem.quantity;

    await cartItem.save();

    // 🔔 notification
    await Notification.create({
      user: req.user._id,
      title: "Cart Updated ✏️",
      message: `${cartItem.product.name} updated successfully`,
      type: "SYSTEM",
    });

    return res.json({
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ REMOVE ITEM FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id).populate("product");

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    const productName = cartItem.product.name;

    await cartItem.deleteOne();

    // 🔔 notification
    await Notification.create({
      user: req.user._id,
      title: "Removed from Cart ❌",
      message: `${productName} removed from cart`,
      type: "SYSTEM",
    });

    return res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ CLEAR CART
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user._id,
    });

    // 🔔 notification
    await Notification.create({
      user: req.user._id,
      title: "Cart Cleared 🧹",
      message: "All items removed from cart",
      type: "SYSTEM",
    });

    return res.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
