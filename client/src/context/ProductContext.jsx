// // import React, { createContext, useContext, useState, useEffect } from "react";
// // import {api}from "../api/axios";
// // import axios from "axios";

// // const ProductContext = createContext();

// // export const useProducts = () => useContext(ProductContext);
// // const defaultFilters = {
// //   category: "",
// //   minPrice: "",
// //   maxPrice: "",
// //   tenure: "",
// //   page: 1,
// //   limit: 20,
// //   sort: "popular",
// // };

// // export const ProductProvider = ({ children }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [filters,setFilters] = useState(defaultFilters)
// //   const [pagination, setPagination] = useState({
// //     total: 0,
// //     page: 1,
// //     pages: 1,
// //   });
// //  const [loading,setLoading] = useState(true);
// //   useEffect(() => {
// //     const fetchCategories= async () => {
// //       try {
// //         const res = await axios.get("/products/products-categories");
      
      
// // console.log("Categories Response:", res.data);

// // setCategories(res.data);
// //         setCategories(res.data || [])
// //       } catch (err) {
// //         console.error("Error fetching products-categories:", err);
// //       }
// //     };
// //    fetchCategories()
// //   }, []);

// // useEffect(() => {
// //   const fetchProducts = async () => {
// //     try {
// //       setLoading(true)

// //       const res = await api.get("/products",{params:filters}); 
// //        console.log("API Response:", res.data);
// //       setProducts(res.data.products||[]);
// //      setPagination({
// //        total: res.data.total,
// //        page: res.data.page,
// //        pages: res.data.pages,
// //      });

      
      
// //     } catch (err) {
// //       console.error("Error fetching products:", err);
// //     }finally{
// //       setLoading(false);
// //     }
// //   };
// //   fetchProducts();
// // }, [filters]);


// //   return (
// //     <ProductContext.Provider value={{ products,categories,filters,setFilters,pagination ,loading,defaultFilters}}>
// //       {children}
// //     </ProductContext.Provider>
// //   );
// // };


// import React, { createContext, useContext, useState, useEffect } from "react";
// import { api } from "../api/axios";
// import axios from "axios";

// const ProductContext = createContext();

// export const useProducts = () => useContext(ProductContext);

// const defaultFilters = {
//   category: [],
//   minPrice: "",
//   maxPrice: "",
//   tenure: "",
//   page: 1,
//   limit: 20,
//   sort: "popular",
// };

// export const ProductProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState(defaultFilters);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     pages: 1,
//   });
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/categories");
//         console.log("Categories Response:", res.data);
//         setCategories(res.data || []);
//       } catch (err) {
//         console.log("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ✅ Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("/products", { params: filters });
       
        
// const data = res.data.data || res.data
//  console.log(data);
//         setProducts(data.products || []);
//         setPagination({
//           total: res.data.total,
//           page: res.data.page,
//           pages: res.data.pages,
//         });
//       } catch (err) {
//         console.log("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [filters]);

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         categories,
//         filters,
//         setFilters,
//         pagination,
//         loading,
//         defaultFilters,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/axios"; // apna axios instance jisme baseURL set hai
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
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // ✅ hamesha array
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        console.log("Categories Response:", res.data);

        // Agar response object hai jisme array andar hai
        const data = res.data.data || res.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch Products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await api.get("/products", { params: filters });
  //       console.log("Products Response:", res.data);

  //       // ✅ Handle nested response
  //       const data = res.data.data || res.data;
  //       setProducts(Array.isArray(data.products) ? data.products : []);
  //       setPagination({
  //         total: data.total || 0,
  //         page: data.page || 1,
  //         pages: data.pages || 1,
  //       });
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, [filters]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products", { params: filters });
      console.log("Products Response:", res.data);

      // ✅ Handle nested response
      const data = res.data.data || res.data;

      setProducts(Array.isArray(data.products) ? data.products : []);
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        pages: data.pages || 1,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
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
