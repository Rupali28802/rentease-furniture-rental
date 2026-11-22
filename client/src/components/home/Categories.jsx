import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SHOP CATEGORY API:",api.defaults.baseURL+"/categories");
    
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Only show selected categories
  const allowedSlugs = [
    "sofa",
    "beds",
    "appliances",
    "office",
    "Storage",
    "home-decore",
  ];
  const filteredCategories = categories.filter((cat) =>
    allowedSlugs.includes(cat.slug),
  );

  return (
    <section className="py-8">
      <div className="w-full px-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide">Shop by Category</h2>
          <button
            onClick={() => navigate("/categories")}
            className="text-green-900 font-medium hover:underline"
          >
            View All
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredCategories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${cat.slug}`}
              className="flex flex-col items-center justify-center p-4 bg-white shadow rounded hover:shadow-lg transition"
            >
              {/* ✅ If you want to use images from backend */}
              {cat.image ? (
                <img
                  // src={`https://rentease-furniture-rental-ur25.vercel.app/api/uploads/categories/${cat.image}`}
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-contain mb-3"
                  onError={(e) => {
                    console.error(
                      "CATEGORY IMAGE NOT FOUND:",
                      e.currentTarget.src,
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-gray-800 font-medium">{cat.name}</span>
              )}
              <span className="text-gray-800 font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
