// import React, { createContext, useContext, useEffect, useState } from "react";
// import { api } from "../api/axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // useEffect(() => {
//   //   api.get("/cart")
//   //   .then(res=>setCartItems(res.data.items || []))

//   //   .catch(err=>console.error(err));
//   // },[]);

//   // const addToCart = async(productId,tenure,deliveryDate)=>{
//   //   const res = await api.post("/cart",{productId,tenure,deliveryDate});
//   //   setCartItems(prev=>[...prev,res.data.cartItem]);
//   // };

//   // CartContext.jsx
//   useEffect(() => {
//     // Optional: sirf refresh/login ke baad sync ke liye
//     const fetchCart = async () => {
//       try {
//         const res = await api.get("/cart");
//         setCartItems(res.data.items || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCart();
//   }, []);

//   // AddToCart
//   const addToCart = async (productId, tenure, deliveryDate) => {
//     try {
//       const res = await api.post("/cart", { productId, tenure, deliveryDate });
//       setCartItems((prev) => [...prev, res.data.cartItem]); // turant update
//     } catch (err) {
//       console.error("Error adding to cart", err);
//     }
//   };

//   const removeFromCart = async (id) => {
//     await api.delete(`/cart/${id}`);
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//   };

//   const updateCart = async (id, quantity) => {
//     const res = await api.put(`/cart/${id}`, { quantity });
//     setCartItems((prev) =>
//       prev.map((item) => (item._id === id ? res.data.cartItem : item)),
//     );
//   };

//   const clearCart = async () => {
//     await api.delete("/cart");
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };;

// export const useCart = ()=>useContext(CartContext)


import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Initial sync (refresh/login ke baad)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };
    fetchCart();
  }, []);

  // Add to Cart
  const addToCart = async (productId, tenure, deliveryDate) => {
    try {
      const res = await api.post("/cart", { productId, tenure, deliveryDate });
      const newItem = res.data.cartItem;

      // Agar item already hai to update karo, warna push karo
      setCartItems((prev) =>
        prev.some((item) => item._id === newItem._id)
          ? prev.map((item) => (item._id === newItem._id ? newItem : item))
          : [...prev, newItem],
      );
    } catch (err) {
      console.error("Error adding to cart", err);
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
      value={{ cartItems, addToCart, removeFromCart, updateCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
