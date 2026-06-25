import Wishlist from "../models/Wishlist.js";

//  Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const exists = wishlist.items.some(
        (item) => item.product.toString() === productId,
      );
      if (!exists) {
        wishlist.items.push({ product: productId });
      }
    }

    await wishlist.save();
    res.json({items:wishlist.items});
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
    );
    res.json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// toogle wishlist

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const index = wishlist.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (index > -1) {
        wishlist.items.splice(index, 1); 
      } else {
        wishlist.items.push({ product: productId }); 
      }
    }

    await wishlist.save();
    res.json({ items: wishlist.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete product from wishlist
export const deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await wishlist.save();
    res.json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

