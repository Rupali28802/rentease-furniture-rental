import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
    allowedSlugs.includes(cat.slug.toLowerCase()),
  );

  return (
    <section className="py-8">
      <div className="w-full px-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide">Shop by Category</h2>
          <Link
            to="/categories"
            className="text-green-600 font-medium hover:underline"
          >
            View All
          </Link>
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
              {cat.image && (
                <img
                  src={`http://localhost:5000/uploads/categories/${cat.image}`}
                  alt={cat.name}
                  className="w-20 h-20 object-contain mb-3"
                />
              )}
              <span className="text-gray-800 font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
