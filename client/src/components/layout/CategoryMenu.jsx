// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // ✅ React Icons

// export default function CategoryMenu() {
//   const [categories, setCategories] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/categories")
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ✅ Custom order (Offers last)
//   const orderedSlugs = [
//     "sofa",
//     "beds",
//     "appliances",
//     "office",
//     "Storage",
//     "home-decore",
//     "offers", // 👈 Offers moved to last
//   ];
//   const filteredCategories = orderedSlugs
//     .map((slug) => categories.find((cat) => cat.slug === slug))
//     .filter(Boolean);

//   return (
//     <div className="mt-1 py-2">
//       <div className="container flex items-center gap-6 md:gap-4">
//         {/* ✅ Custom Dropdown */}
//         <div className="relative ">
//           <button
//             onClick={() => setOpen(!open)}
//             className="bg-green-600 text-white text-sm md:text-base text-sm md:text-base lg:text-lg px-2  lg:px-4 py-2 rounded cursor-pointer flex items-center justify-between w-56"
//           >
//             All Categories
//             {open ? (
//               <FaChevronUp className="ml-2 text-sm" />
//             ) : (
//               <FaChevronDown className="ml-2 text-sm" />
//             )}
//           </button>

//           {open && (
//             <div
//               className="absolute mt-2 w-56 bg-white shadow-lg rounded z-50 
//                          max-h-64 overflow-y-auto scrollbar-hide"
//             >
//               {categories.map((cat) => (
//                 <div
//                   key={cat._id}
//                   onClick={() => {
//                     window.location.href = `/category/${cat.slug}`;
//                     setOpen(false);
//                   }}
//                   className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
//                 >
//                   {cat.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ✅ Inline Links (custom order with Offers last) */}
//         <div className="flex gap-6">
//           {filteredCategories.map((cat) => (
//             <a
//               key={cat._id}
//               href={`/category/${cat.slug}`}
//               className={`text-lg font-medium tracking-wide hover:text-green-600 ${
//                 cat.slug === "offers"
//                   ? "text-red-600 font-bold"
//                   : "text-gray-800"
//               }`}
//             >
//               {cat.name}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Correct slugs
  const orderedSlugs = [
    "sofa",
    "beds",
    "appliances",
    "dining",
    "office",
    "Storage",
    "home-decor",
    "offers",
  ];
  const filteredCategories = orderedSlugs
    .map((slug) => categories.find((cat) => cat.slug === slug))
    .filter(Boolean);

  return (
    <div className="mt-1 py-2">
      <div className="flex items-center gap-3 md:gap-4  px-4 overflow-x-auto tracking-wider">
        {/* Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setOpen(!open)}
            className="bg-green-600 text-white text-sm md:text-base lg:text-lg px-3 lg:px-4 py-2 rounded flex items-center justify-between w-44 md:w-52 lg:w-56"
          >
            All Categories
            {open ? (
              <FaChevronUp className="ml-2 text-sm" />
            ) : (
              <FaChevronDown className="ml-2 text-sm" />
            )}
          </button>

          {open && (
            <div className="absolute mt-2 w-44 md:w-52 lg:w-56 bg-white shadow-lg rounded z-50 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    navigate(`/category/${cat.slug}`);
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

        {/* Inline Links */}
        <div className="flex gap-3 md:gap-4  ml-2 lg:gap-8 tracking-wider">
          {filteredCategories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className={`font-medium tracking-wide hover:text-green-600
                text-sm md:text-base lg:text-lg lg:gap-4
                ${cat.slug === "offers" ? "text-red-600 font-bold" : "text-gray-800"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
