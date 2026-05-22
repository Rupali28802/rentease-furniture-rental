// import { useNavigate } from "react-router-dom";

// import {
//   FaBars,
//   FaCouch,
//   FaHeart,
//   FaSearch,
//   FaShoppingCart,
//   FaMoon,
//   FaSun,
//   FaMapMarkerAlt,
//   FaChevronDown,
// } from "react-icons/fa";

// const MobileNavbar = ({
//   search,
//   setSearch,
//   mobileSearch,
//   setMobileSearch,
//   setMobileMenu,
//   cartCount,
//   wishlistCount,
//   location,
//   darkMode,
//   setDarkMode,
// }) => {
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!search.trim()) return;

//     navigate(`/products?search=${search}`);
//   };


//   return (
//     <div className="md:hidden">
//       {/* TOP */}

//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <button onClick={() => setMobileMenu(true)}>
//             <FaBars className="text-xl dark:text-white" />
//           </button>

//           <h1
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
//           >
//             <FaCouch className="text-green-700" />

//             <div className="flex items-center gap-0">
//               <span className="text-green-700 text-sm">Furni</span>

//               <span className="text-red-500 text-sm">Rent</span>
//             </div>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5 dark:text-white">
//           <button onClick={() => setMobileSearch(!mobileSearch)}>
//             <FaSearch />
//           </button>

//           <div className="relative">
//             <FaHeart />

//             {wishlistCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                 {wishlistCount}
//               </span>
//             )}
//           </div>

//           <div className="relative">
//             <FaShoppingCart />

//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* LOCATION */}

//       <div className="mt-3">
//         <button className=" border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 flex items-center justify-start bg-white dark:bg-gray-800 ">
//           <div className="flex items-center gap-3">
//             <FaMapMarkerAlt className="text-red-500" />

//             <div className="text-left leading-tight">
//               <p className="text-[11px] text-gray-500">Deliver to</p>

//               <p className="text-sm font-semibold dark:text-white">
//                 {location}
//               </p>
//             </div>
//           </div>

//           <FaChevronDown className="dark:text-white ml-4" />
//         </button>
//       </div>

//       {/* SEARCH */}

//       {mobileSearch && (
//         <div className="mt-3 flex">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search furniture..."
//             className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 rounded-l-xl outline-none"
//           />

//           <button
//             onClick={handleSearch}
//             className="bg-green-700 text-white px-6 rounded-r-xl"
//           >
//             <FaSearch />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileNavbar;

import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCouch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";

const MobileNavbar = ({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  location,
  setMobileMenu,
}) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
  };

  return (
    <div className="flex flex-col w-full md:hidden">
      {/* TOP NAVBAR */}
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenu(true)}>
            <FaBars className="text-xl dark:text-white" />
          </button>

          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
          >
            <FaCouch className="text-green-700" />
            <div className="flex items-center gap-0">
              <span className="text-green-700 text-sm">Furni</span>
              <span className="text-red-500 text-sm">Rent</span>
            </div>
          </h1>
        </div>

        {/* SEARCH BAR (always visible like tablet) */}
        <div className="flex flex-1 max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search furniture..."
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 outline-none rounded-l-xl text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-4 rounded-r-xl"
          >
            <FaSearch />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 dark:text-white">
          {/* WISHLIST */}
          <div className="relative cursor-pointer">
            <FaHeart className="text-lg" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* CART */}
          <div className="relative cursor-pointer">
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* ACCOUNT */}
          <FaUser className="text-lg cursor-pointer" />
        </div>
      </div>

      {/* LOCATION BAR (separate, below navbar, above hero) */}
      <div className="bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-2">
        <FaMapMarkerAlt className="text-red-500" />
        <p className="text-sm font-semibold dark:text-white">
          Deliver to: {location}
        </p>
        <FaChevronDown className="dark:text-white ml-1" />
      </div>
    </div>
  );
};

export default MobileNavbar;
