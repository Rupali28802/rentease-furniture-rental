// context/CategoryContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    api.get("/categories")
    .then((res)=>setCategories(res.data))
    .catch((err)=>console.log(err))
  },[])

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
