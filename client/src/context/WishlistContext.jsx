import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios"; 
const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist"); 
        setWishlist(res.data.items || []);
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    try {
      const res = await api.post("/wishlist/toggle", { productId });
      if (res.data.items) {
        setWishlist(res.data.items);
        
      } else {
        setWishlist((prev) => {
          const exists = prev.some((item) => item.product._id === productId);
          if (exists) {
            return prev.filter((item) => item.product._id !== productId);
          } else {
            return [...prev, { product: { _id: productId } }];
          }
        });
      }
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
