import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the fully populated cart from backend
  const refreshCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial sync (refresh/login ke baad)
  useEffect(() => {
    refreshCart();
  }, []);

  // Add to Cart
  const addToCart = async (productId, tenure, deliveryDate) => {
    try {
      await api.post("/cart", { productId, tenure, deliveryDate });
      // Re-fetch the fully populated cart from backend so product data is present
      await refreshCart();
    } catch (err) {
      console.error("Error adding to cart", err);
      throw err;
    }
  };

  // Remove
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  // Update
  const updateCart = async (id, quantity) => {
    try {
      const res = await api.put(`/cart/${id}`, { quantity });
      setCartItems((prev) =>
        prev.map((item) => (item._id === id ? res.data.cartItem : item)),
      );
    } catch (err) {
      console.error("Error updating cart", err);
    }
  };

  // Clear
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        refreshCart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
