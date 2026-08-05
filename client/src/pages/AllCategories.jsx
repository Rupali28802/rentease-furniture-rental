import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 min-h-screen">
      <div className="w-full px-6 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-wide">
            All Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Browse our complete range of rental categories.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No categories found.
          </div>
        ) : (
          /* Category Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center justify-center p-4 bg-white shadow rounded hover:shadow-lg transition"
              >
                {cat.image ? (
                  <img
                    src={`http://localhost:5000/uploads/categories/${cat.image}`}
                    alt={cat.name}
                    className="w-24 h-24 object-contain mb-3"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded mb-3 text-4xl">
                    🛋️
                  </div>
                )}
                <span className="text-gray-800 font-medium text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
