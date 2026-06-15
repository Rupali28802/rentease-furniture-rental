import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

export default function ProductsPage() {
  const { products, setFilters, pagination, defaultFilters, loading } =
    useProducts();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTenures, setSelectedTenures] = useState([]);
  const [price, setPrice] = useState(5000);

  // Toggle category
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    setFilters((prev) => ({
      ...prev,
      category: selectedCategories.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...selectedCategories, cat],
      page: 1,
    }));
  };

  // Toggle tenure
  const toggleTenure = (t) => {
    setSelectedTenures((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
    setFilters((prev) => ({
      ...prev,
      tenure: selectedTenures.includes(t)
        ? prev.tenure.filter((x) => x !== t)
        : [...selectedTenures, t],
      page: 1,
    }));
  };

  // Reset all
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTenures([]);
    setPrice(5000);
    setFilters(defaultFilters);
  };

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-64 p-4 border-r">
        <h2 className="font-bold mb-4">Filters</h2>

        {/* Category */}
        <div className="mb-5">
          <h3 className="font-semibold mb-2">Category</h3>
          {["Sofa", "Beds", "Dining", "Appliances", "Office Furniture"].map(
            (cat) => (
              <label key={cat} className="block">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="ml-2">{cat}</span>
              </label>
            ),
          )}
        </div>

        {/* Price */}
        <div className="mb-5">
          <p className="mb-2">₹0 - ₹{price}</p>
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            className="w-full"
            onChange={(e) => {
              setPrice(e.target.value);
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
                page: 1,
              }));
            }}
          />
        </div>

        {/* Tenure */}
        <div>
          <h3 className="font-semibold mb-2">Tenure</h3>
          {[3, 6, 12, 24].map((month) => (
            <label key={month} className="block">
              <input
                type="checkbox"
                checked={selectedTenures.includes(month)}
                onChange={() => toggleTenure(month)}
              />
              <span className="ml-2">{month} Months</span>
            </label>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded"
        >
          Reset All Filters
        </button>
      </aside>

      {/* Products */}
      <main className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))
            }
            className="border px-3 py-2 rounded"
          >
            <option value="popular">Popular</option>
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="font-bold">₹{product.pricePerMonth}/month</p>
                  <p className="text-sm text-gray-500">
                    Deposit ₹{product.deposit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-3">
          <button
            disabled={pagination.page === 1}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            disabled={pagination.page === pagination.pages}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
