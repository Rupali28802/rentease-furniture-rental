import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // ✅ React Icons

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Custom order (Offers last)
  const orderedSlugs = [
    "sofa",
    "beds",
    "appliances",
    "office",
    "Storage",
    "home-decore",
    "offers", // 👈 Offers moved to last
  ];
  const filteredCategories = orderedSlugs
    .map((slug) => categories.find((cat) => cat.slug === slug))
    .filter(Boolean);

  return (
    <div className="mt-1 py-2">
      <div className="container flex items-center gap-6">
        
        {/* ✅ Custom Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center justify-between w-56"
          >
            All Categories
            {open ? (
              <FaChevronUp className="ml-2 text-sm" />
            ) : (
              <FaChevronDown className="ml-2 text-sm" />
            )}
          </button>

          {open && (
            <div
              className="absolute mt-2 w-56 bg-white shadow-lg rounded z-50 
                         max-h-64 overflow-y-auto scrollbar-hide"
            >
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    window.location.href = `/category/${cat.slug}`;
                    setOpen(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Inline Links (custom order with Offers last) */}
        <div className="flex gap-6">
          {filteredCategories.map((cat) => (
            <a
              key={cat._id}
              href={`/category/${cat.slug}`}
              className={`text-lg font-medium tracking-wide hover:text-green-600 ${
                cat.slug === "offers"
                  ? "text-red-600 font-bold"
                  : "text-gray-800"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
