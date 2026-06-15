import React, { createContext, useContext, useState, useEffect } from "react";
import {api}from "../api/axios";
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);
const defaultFilters = {
  category: "",
  minPrice: "",
  maxPrice: "",
  tenure: "",
  page: 1,
  limit: 20,
  sort: "popular",
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters,setFilters] = useState(defaultFilters)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
 const [loading,setLoading] = useState(true);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/products");
//         console.log(res.data);
        
//         //  ensure array hai
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
      setLoading(true)

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
    }finally{
      setLoading(false);
    }
  };
  fetchProducts();
}, [filters]);


  return (
    <ProductContext.Provider value={{ products,filters,setFilters,pagination ,loading,defaultFilters}}>
      {children}
    </ProductContext.Provider>
  );
};
