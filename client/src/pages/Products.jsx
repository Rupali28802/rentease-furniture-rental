// // import React, { useState } from "react";
// // import { useProducts } from "../context/ProductContext";
// // import { FaHeart } from "react-icons/fa";

// // export default function ProductsPage() {
// //   const { products, setFilters, pagination, defaultFilters, loading } =
// //     useProducts();

// //   const [selectedCategories, setSelectedCategories] = useState([]);
// //   const [selectedTenures, setSelectedTenures] = useState([]);
// //   const [price, setPrice] = useState(5000);

// //   // Toggle like

// //   // Toggle category
// //   const toggleCategory = (cat) => {
// //     setSelectedCategories((prev) =>
// //       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
// //     );
// //     setFilters((prev) => ({
// //       ...prev,
// //       category: selectedCategories.includes(cat)
// //         ? prev.category.filter((c) => c !== cat)
// //         : [...selectedCategories, cat],
// //       page: 1,
// //     }));
// //   };

// //   // Toggle tenure
// //   const toggleTenure = (t) => {
// //     setSelectedTenures((prev) =>
// //       prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
// //     );
// //     setFilters((prev) => ({
// //       ...prev,
// //       tenure: selectedTenures.includes(t)
// //         ? prev.tenure.filter((x) => x !== t)
// //         : [...selectedTenures, t],
// //       page: 1,
// //     }));
// //   };

// //   // Reset all
// //   const resetFilters = () => {
// //     setSelectedCategories([]);
// //     setSelectedTenures([]);
// //     setPrice(5000);
// //     setFilters(defaultFilters);
// //   };

// //   return (
// //     <div className="flex">
// //       {/* Sidebar Filters */}
// //       <aside className="w-64 p-4 border-r">
// //         <h2 className="font-bold mb-4">Filters</h2>

// //         {/* Category */}
// //         <div className="mb-5">
// //           <h3 className="font-semibold mb-2">Category</h3>
// //           {["Sofa", "Beds", "Dining", "Appliances", "Office Furniture"].map(
// //             (cat) => (
// //               <label key={cat} className="block">
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedCategories.includes(cat)}
// //                   onChange={() => toggleCategory(cat)}
// //                 />
// //                 <span className="ml-2">{cat}</span>
// //               </label>
// //             ),
// //           )}
// //         </div>

// //         {/* Price */}
// //         <div className="mb-5">
// //           <p className="mb-2">₹0 - ₹{price}</p>
// //           <input
// //             type="range"
// //             min="0"
// //             max="5000"
// //             value={price}
// //             className="w-full"
// //             onChange={(e) => {
// //               setPrice(e.target.value);
// //               setFilters((prev) => ({
// //                 ...prev,
// //                 maxPrice: e.target.value,
// //                 page: 1,
// //               }));
// //             }}
// //           />
// //         </div>

// //         {/* Tenure */}
// //         <div>
// //           <h3 className="font-semibold mb-2">Tenure</h3>
// //           {[3, 6, 12, 24].map((month) => (
// //             <label key={month} className="block">
// //               <input
// //                 type="checkbox"
// //                 checked={selectedTenures.includes(month)}
// //                 onChange={() => toggleTenure(month)}
// //               />
// //               <span className="ml-2">{month} Months</span>
// //             </label>
// //           ))}
// //         </div>

// //         {/* Reset Button */}
// //         <button
// //           onClick={resetFilters}
// //           className="mt-4 w-full bg-red-500 text-white py-2 rounded"
// //         >
// //           Reset All Filters
// //         </button>
// //       </aside>

// //       {/* Products */}
// //       <main className="flex-1 p-6">
// //         <div className="flex justify-between mb-6">
// //           <h1 className="text-2xl font-bold">Products</h1>
// //           <select
// //             onChange={(e) =>
// //               setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))
// //             }
// //             className="border px-3 py-2 rounded"
// //           >
// //             <option value="popular">Popular</option>
// //             <option value="priceLow">Price Low → High</option>
// //             <option value="priceHigh">Price High → Low</option>
// //           </select>
// //         </div>

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <div className="grid grid-cols-4 gap-5">
// //             {products.map((product) => (
// //               <div
// //                 key={product._id}
// //                 className="border rounded-xl overflow-hidden"
// //               >

// //                 <img
// //                   src={product.image}
// //                   alt={product.name}
// //                   className="h-48 w-full object-cover"
// //                 />
// //                 <div className="p-4">
// //                   <h3 className="font-semibold">{product.name}</h3>
// //                   <p className="font-bold">₹{product.pricePerMonth}/month</p>
// //                   <p className="text-sm text-gray-500">
// //                     Deposit ₹{product.deposit}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Pagination */}
// //         <div className="flex justify-center mt-6 gap-3">
// //           <button
// //             disabled={pagination.page === 1}
// //             onClick={() =>
// //               setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
// //             }
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Prev
// //           </button>
// //           <span>
// //             Page {pagination.page} of {pagination.pages}
// //           </span>
// //           <button
// //             disabled={pagination.page === pagination.pages}
// //             onClick={() =>
// //               setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
// //             }
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useProducts } from "../context/ProductContext";

// export default function ProductsPage() {
//   const { products, setFilters, pagination, loading, defaultFilters } =
//     useProducts();

//   const [price, setPrice] = useState(5000);

//   const [liked, setLiked] = useState({});

//   const toggleLike = (id) => {
//     setLiked((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const resetFilters = () => {
//     setPrice(5000);
//     setFilters(defaultFilters);
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 border-r p-5 bg-white">
//         <h2 className="font-bold text-xl mb-5">Filters</h2>

//         {/* Category */}
//         <div className="mb-6">
//           <h3 className="font-semibold mb-3">Category</h3>

//           {["Sofa", "Beds", "Dining", "Appliances", "Office Furniture"].map(
//             (cat) => (
//               <label key={cat} className="flex items-center mb-2">
//                 <input
//                   type="radio"
//                   name="category"
//                   value={cat}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       category: e.target.value,
//                       page: 1,
//                     }))
//                   }
//                 />

//                 <span className="ml-2">{cat}</span>
//               </label>
//             ),
//           )}
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <h3 className="font-semibold mb-3">Price</h3>

//           <input
//             type="range"
//             min="0"
//             max="5000"
//             value={price}
//             className="w-full"
//             onChange={(e) => {
//               setPrice(e.target.value);

//               setFilters((prev) => ({
//                 ...prev,
//                 maxPrice: e.target.value,
//                 page: 1,
//               }));
//             }}
//           />

//           <p className="mt-2">₹0 - ₹{price}</p>
//         </div>

//         {/* Tenure */}
//         <div className="mb-6">
//           <h3 className="font-semibold mb-3">Tenure</h3>

//           {[3, 6, 12, 24].map((month) => (
//             <label key={month} className="flex items-center mb-2">
//               <input
//                 type="radio"
//                 name="tenure"
//                 value={month}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     tenure: e.target.value,
//                     page: 1,
//                   }))
//                 }
//               />

//               <span className="ml-2">{month} Months</span>
//             </label>
//           ))}
//         </div>

//         <button
//           onClick={resetFilters}
//           className="w-full bg-red-500 text-white py-2 rounded-lg"
//         >
//           Reset Filters
//         </button>
//       </aside>

//       {/* Products */}
//       <main className="flex-1 p-6 bg-gray-50">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">All Products</h1>

//           <select
//             className="border px-4 py-2 rounded-lg"
//             onChange={(e) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 sort: e.target.value,
//                 page: 1,
//               }))
//             }
//           >
//             <option value="popular">Popular</option>

//             <option value="priceLow">Price Low → High</option>

//             <option value="priceHigh">Price High → Low</option>
//           </select>
//         </div>

//         {loading ? (
//           <h2>Loading Products...</h2>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products?.map((product) => (
//               <div
//                 key={product._id}
//                 className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
//               >
//                 {/* Heart */}
//                 <button
//                   onClick={() => toggleLike(product._id)}
//                   className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow"
//                 >
//                   <FaHeart
//                     className={`text-lg ${
//                       liked[product._id] ? "text-red-500" : "text-gray-300"
//                     }`}
//                   />
//                 </button>

//                 {/* Image */}
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-56 w-full object-cover"
//                 />

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg">{product.name}</h3>

//                   <p className="text-green-600 font-bold text-xl mt-2">
//                     ₹{product.pricePerMonth}
//                     <span className="text-sm text-gray-500 font-normal">
//                       /month
//                     </span>
//                   </p>

//                   <p className="text-gray-500 text-sm mt-1">
//                     Deposit ₹{product.deposit}
//                   </p>

//                   <button className="w-full mt-4 bg-black text-white py-2 rounded-lg">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-4 mt-10">
//           <button
//             disabled={pagination.page === 1}
//             onClick={() =>
//               setFilters((prev) => ({
//                 ...prev,
//                 page: prev.page - 1,
//               }))
//             }
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span>
//             Page {pagination.page} of {pagination.pages}
//           </span>

//           <button
//             disabled={pagination.page === pagination.pages}
//             onClick={() =>
//               setFilters((prev) => ({
//                 ...prev,
//                 page: prev.page + 1,
//               }))
//             }
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";

export default function ProductsPage() {
  const { products, filters, setFilters, pagination, loading } = useProducts();

  const [liked, setLiked] = useState({});
  const [price, setPrice] = useState(filters.maxPrice || 5000);

  const categories = [
    "Sofa",
    "Beds",
    "Dining",
    "Appliances",
    "Office Furniture",
    "TV & Entertainment",
  ];

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
  
    <div className="flex min-h-screen bg-white">
    
      {/* FILTERS */}
      <aside className="w-[260px] 
      border-r   border-r-gray-300
       p-5">
        <h2 className="font-semibold text-lg mb-5">Filters</h2>

        {/* CATEGORY */}
        <div className="mb-8">
          <h3 className="font-medium mb-3">Category</h3>

          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: cat,
                    page: 1,
                  }))
                }
              />

              {cat}
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
            max="3000"
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
                    tenure: month,
                    page: 1,
                  }))
                }
              />
              {month}+
            </label>
          ))}
        </div>

        <button
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