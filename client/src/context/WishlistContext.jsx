

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios"; // ✅ sirf custom instance use karo

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist"); // ✅ baseURL + /wishlist
        setWishlist(res.data.items || []);
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    try {
      const res = await api.post("/wishlist/toggle", { productId }); // ✅ baseURL + /wishlist/toggle
      setWishlist(res.data.items || []);
    } catch (error) {
      console.log("Wishlist toggle error:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
