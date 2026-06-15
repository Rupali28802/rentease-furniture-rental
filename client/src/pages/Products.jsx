

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";

export default function ProductsPage() {
  const { products,categories, filters, setFilters,defaultFilters, pagination, loading } = useProducts();

  const [liked, setLiked] = useState({});
  const [price, setPrice] = useState(filters.maxPrice || 5000);

  // const categories = [
  //   "Sofa",
  //   "Beds",
  //   "Dining",
  //   "Appliances",
  //   "Office Furniture",
  //   "TV & Entertainment",
  // ];

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetFilters = ()=>{
    setPrice(5000);
    setFilters(defaultFilters);
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* FILTERS */}
      <aside
        className="w-[260px] 
      border-r   border-r-gray-300
       p-5"
      >
        <h2 className="font-semibold text-lg mb-5">Filters</h2>

        {/* CATEGORY */}
        {/* <div className="mb-6">
          <h3 className="font-medium mb-3">Category</h3>

          {categories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: cat.slug,
                    page: 1,
                  }))
                }
              />

              {cat.name}
            </label>
          ))}
        </div> */}
        {/* CATEGORY FILTER (Multi Select) */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Category</h3>

          {categories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.category?.includes(cat.slug)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters((prev) => ({
                      ...prev,
                      category: [...(prev.category || []), cat.slug],
                      page: 1,
                    }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      category: prev.category.filter((c) => c !== cat.slug),
                      page: 1,
                    }));
                  }
                }}
              />
              {cat.name}
            </label>
          ))}
        </div>

        {/* PRICE */}
        <div className="mb-8">
          <h3 className="font-medium mb-3">Price Range</h3>

          <div className="flex justify-between text-xs mb-2">
            <span>₹0</span>
            <span>₹{price}</span>
          </div>

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

        {/* TENURE */}
        <div>
          <h3 className="font-medium mb-3">Tenure (Months)</h3>

          {[3, 6, 12, 24].map((month) => (
            <label
              key={month}
              className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="tenure"
                checked={filters.tenure === String(month)}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    tenure: String(month),
                    page: 1,
                  }))
                }
              />
              {month}+
            </label>
          ))}
        </div>

        {/* <button
          className="mt-6 w-full bg-green-700 text-black py-2 rounded-lg"
          onClick={() =>
            setFilters({
              category: "",
              minPrice: "",
              maxPrice: "",
              tenure: "",
              page: 1,
              limit: 20,
              sort: "popular",
            })
          }
        >
          Reset Filters
        </button> */}
        <button
          className="mt-6 w-full bg-green-700 text-black py-2 rounded-lg"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </aside>

      {/* PRODUCTS */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-xl">All Products</h1>

          <div className="flex items-center gap-4 mt-2">
            <h3 className="mt-1 font-medium">Sort By</h3>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                  page: 1,
                }))
              }
              className="border rounded-lg px-3 py-2 text-sm 
               bg-white text-gray-700 
             
               focus:outline-none "
            >
              <option value="popular">Popular</option>
              <option value="priceLow">Price Low to High</option>
              <option value="priceHigh">Price High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className=" shadow-xl rounded-xl overflow-hidden bg-white relative hover:shadow-lg transition"
                >
                  {/* HEART */}
                  <button
                    onClick={() => toggleLike(product._id)}
                    className="absolute  right-3  p-2 "
                  >
                    <FaHeart
                      className={`${
                        liked[product._id] ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>

                  {/* IMAGE */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* INFO */}
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-2">{product.name}</h3>

                    <p className="font-bold">
                      ₹{product.pricePerMonth}
                      <span className="text-gray-500 text-sm font-normal">
                        {" "}
                        / month
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      + Deposit ₹{product.deposit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={pagination.page === 1}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                className="border px-4 py-2 rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span>
                {pagination.page} / {pagination.pages}
              </span>

              <button
                disabled={pagination.page === pagination.pages}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                className="border px-4 py-2 rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}