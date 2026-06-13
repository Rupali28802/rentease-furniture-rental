// import React, { useState } from "react";
// import { useProducts } from "../context/ProductContext";
// import { FaHeart } from "react-icons/fa";

// export default function ProductsPage() {
//   const { products,setFilters } = useProducts();
//   const [liked, setLiked] = useState({});

//   const toggleLike = (id) => {
//     setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCategoryChange = (e) => {
//     setFilters((prev) => ({ ...prev, category: e.target.value }));
//   };

//   const handlePriceChange = (e) => {
//     setFilters((prev) => ({ ...prev, maxPrice: e.target.value }));
//   };

//   const handleTenureChange = (e) => {
//     setFilters((prev) => ({ ...prev, tenure: e.target.value }));
//   };

  
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-50 border-r p-4">
//         <h2 className="font-bold mb-3">Filters</h2>
//         {/* Category */}
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Category</h3>
//           {[
//             "Sofa",
//             "Beds",
//             "Dining",
//             "Appliances",
//             "Office Furniture",
//             "TV & Entertainment",
//           ].map((cat) => (
//             <label key={cat} className="flex items-center gap-2 text-sm mb-1">
//               <input
//                 type="checkbox"
//                 value={cat}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     category: e.target.checked ? e.target.value : "",
//                   }))
//                 }
//               />
//               {cat}
//             </label>
//           ))}
//         </div>

//         {/* Price Range */}
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Price Range</h3>
//           <input
//             type="range"
//             min="0"
//             max="5000"
//             className="w-full"
//             onChange={(e) =>
//               setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
//             }
//           />
//         </div>

//         {/* Tenure */}
//         <div>
//           <h3 className="font-semibold mb-2">Tenure (Months)</h3>
//           {["3", "6", "12", "24"].map((t) => (
//             <label key={t} className="flex items-center gap-2 text-sm mb-1">
//               <input
//                 type="checkbox"
//                 value={t}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     tenure: e.target.checked ? e.target.value : "",
//                   }))
//                 }
//               />
//               {t}+
//             </label>
//           ))}
//         </div>
//       </aside>

//       {/* Right Section */}
//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">All Products</h1>
//           <select className="border rounded px-2 py-1 text-sm">
//             <option>Sort by: Popular</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//           </select>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.isArray(products) &&
//             products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white shadow rounded-lg p-4 relative"
//               >
//                 <button
//                   onClick={() => toggleLike(product._id)}
//                   className="absolute top-2 right-2"
//                 >
//                   <FaHeart
//                     className={`text-xl ${liked[product._id] ? "text-red-500" : "text-gray-300"}`}
//                   />
//                 </button>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-32 object-contain mb-3"
//                 />
//                 <h3 className="text-gray-800 font-semibold text-sm mb-1">
//                   {product.name}
//                 </h3>
//                 <p className="text-green-600 font-bold text-sm">
//                   ₹{product.pricePerMonth}/month
//                 </p>
//                 <p className="text-gray-600 text-xs">
//                   Deposit ₹{product.deposit}
//                 </p>
//                 {/* <p className="text-gray-500 text-xs mt-2">
//                   {product.description}
//                 </p> */}
//               </div>
//             ))}
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { FaHeart } from "react-icons/fa";

export default function ProductsPage() {
  const { products, setFilters } = useProducts();
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r p-4">
        <h2 className="font-bold mb-3">Filters</h2>

        {/* Category */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category</h3>
          {[
            "Sofa",
            "Beds",
            "Dining",
            "Appliances",
            "Office Furniture",
            "TV & Entertainment",
          ].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm mb-1">
              <input
                type="radio"
                name="category"
                value={cat}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="5000"
            className="w-full"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
          />
        </div>

        {/* Tenure */}
        <div>
          <h3 className="font-semibold mb-2">Tenure (Months)</h3>
          {["3", "6", "12", "24"].map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm mb-1">
              <input
                type="radio"
                name="tenure"
                value={t}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, tenure: e.target.value }))
                }
              />
              {t}+
            </label>
          ))}
        </div>
      </aside>

      {/* Right Section */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <select className="border rounded px-2 py-1 text-sm">
            <option>Sort by: Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg p-4 relative"
              >
                <button
                  onClick={() => toggleLike(product._id)}
                  className="absolute top-2 right-2"
                >
                  <FaHeart
                    className={`text-xl ${
                      liked[product._id] ? "text-red-500" : "text-gray-300"
                    }`}
                  />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-3"
                />
                <h3 className="text-gray-800 font-semibold text-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-green-600 font-bold text-sm">
                  ₹{product.pricePerMonth}/month
                </p>
                <p className="text-gray-600 text-xs">
                  Deposit ₹{product.deposit}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      </main>
    </div>
  );
}
