import React, { createContext, useContext, useState, useEffect } from "react";
import {api}from "../api/axios";
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    tenure: "",
    page: 1, 
    limit: 10,
  });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/products");
//         console.log(res.data);
        
//         // 👇 ensure array hai
//         setProducts(
//           Array.isArray(res.data) ? res.data : res.data.products || [],
//         );
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products",{params:filters}); 
       console.log("API Response:", res.data);
      setProducts(res.data.products||[]);
     setPagination({
       total: res.data.total,
       page: res.data.page,
       pages: res.data.pages,
     });

      
      
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  fetchProducts();
}, [filters]);


  return (
    <ProductContext.Provider value={{ products,setFilters,pagination }}>
      {children}
    </ProductContext.Provider>
  );
};
