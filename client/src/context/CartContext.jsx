import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    api.get("/cart")
    .then(res=>setCartItems(res.data.items || []))
    .catch(err=>console.error(err));
  },[]);

  const addToCart = async(productId,tenure,deliveryDate)=>{
    const res = await api.post("/cart",{productId,tenure,deliveryDate});
    setCartItems(prev=>[...prev,res.data.cartItem]);
  };

  const removeFromCart = async(id)=>{
    await api.delete(`/cart/${id}`);
    setCartItems(prev=>
        prev.filter(item=>item._id !== id)
    );

  };

  const updateCart = async (id,quantity)=>{
    const res = await api.put(`/cart/${id}`, { quantity });
    setCartItems(prev=>
        prev.map(item=>(item._id === id?res.data.cartItem:item))
    )
  }

  const clearCart = async()=>{
    await api.delete("/cart")
    setCartItems([]);
  }

  return(
    <CartContext.Provider value={{cartItems,addToCart,removeFromCart,updateCart,clearCart}}>
        {children}
    </CartContext.Provider>
  )
};

export const useCart = ()=>useContext(CartContext)
