import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/axios"; // apna axios instance jisme baseURL set hai
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const defaultFilters = {
  category: [],
  minPrice: "",
  maxPrice: "",
  tenure: "",
  page: 1,
  limit: 20,
  sort: "popular",
};

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); 
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);

  //  Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        console.log("Categories Response:", res.data);


        const data = res.data.data || res.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  
useEffect(() => {
  const fetchProducts = async () => {
    // try {
    //   setLoading(true);
    //   console.log("FILTERS:", filters);
    //   const res = await api.get("/products", { params: filters });
    //   console.log("Products Response:", res.data);

    //   // ✅ Handle nested response
    //   const data = res.data.data || res.data;

    //   setProducts(Array.isArray(data.products) ? data.products : []);
    //   setPagination({
    //     total: data.total || 0,
    //     page: data.page || 1,
    //     pages: data.pages || 1,
    //   });
    // } catch (err) {
    //   console.error("Error fetching products:", err);
    // } finally {
    //   setLoading(false);
    // }

    try {
      setLoading(true);
      const params = {
        ...filters,
        category:Array.isArray(filters.category)
        ? filters.category.join(",")
        : filters.category,

      };
      console.log("FILTERS send to API:" , params);
      const res = await api.get("/products",{params});
      console.log("products Response:", res.data);

      const data = res.data.data || res.data;
      setProducts(Array.isArray(data.products) ? data.products : []);
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        pages: data.pages ||1,
      });
     
      
      
    } catch (error) {
      console.log("Error fetching products:",error);
      
    }finally{
      setLoading(false);
    }
  };
  fetchProducts();
}, [filters]);


  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        filters,
        setFilters,
        pagination,
        loading,
        defaultFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
