// import { useNavigate } from "react-router-dom";

// import {
//   FaBars,
//   FaCouch,
//   FaHeart,
//   FaShoppingCart,
//   FaUser,
//   FaSearch,
//   FaMapMarkerAlt,
//   FaChevronDown,
//   FaMoon,
//   FaSun,
// } from "react-icons/fa";

// const TabletNavbar = ({
//   search,
//   setSearch,
//   cartCount,
//   wishlistCount,
//   location,
//   setMobileMenu,
//   darkMode,
//   setDarkMode,
// }) => {
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!search.trim()) return;

//     navigate(`/products?search=${search}`);
//   };


//   return (
//     <div className="hidden md:flex lg:hidden items-center justify-between gap-4">
//       {/* LEFT */}

//       <div className="flex items-center gap-3">
//         <button onClick={() => setMobileMenu(true)}>
//           <FaBars className="text-2xl dark:text-white" />
//         </button>

//         <h1
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
//         >
//           <FaCouch className="text-green-700" />

//           <div className="flex items-center gap-0">
//             <span className="text-green-700 text-sm">Furni</span>

//             <span className="text-red-500 text-sm">Rent</span>
//           </div>
//         </h1>
//       </div>

//       {/* SEARCH */}

//       <div className="flex flex-1 max-w-2xl">
//         <button className="border border-r-0 border-gray-300 dark:border-gray-700 px-3 rounded-l-xl flex items-center gap-3 bg-white dark:bg-gray-800 min-w-[170px]">
//           <FaMapMarkerAlt className="text-red-500" />

//           <div className="text-left leading-tight">
//             <p className="text-[10px] text-gray-500">Deliver to</p>

//             <p className="text-sm font-semibold dark:text-white">{location}</p>
//           </div>

//           <FaChevronDown className="dark:text-white" />
//         </button>

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search furniture..."
//           className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none"
//         />

//         <button
//           onClick={handleSearch}
//           className="bg-green-700 text-white px-5 rounded-r-xl"
//         >
//           <FaSearch />
//         </button>
//       </div>

//       {/* RIGHT */}

//       <div className="flex items-center gap-5 dark:text-white">
//         {/* WISHLIST */}

//         <div className="relative cursor-pointer">
//           <FaHeart className="text-lg" />

//           {wishlistCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//               {wishlistCount}
//             </span>
//           )}
//         </div>

//         {/* CART */}

//         <div className="relative cursor-pointer">
//           <FaShoppingCart className="text-lg" />

//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </div>

//         {/* ACCOUNT */}

//         <FaUser className="text-lg cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default TabletNavbar;

// TabletNavbar.jsx
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

const TabletNavbar = ({
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
    <div className="hidden md:flex lg:hidden flex-col w-full">
      {/* TOP NAVBAR */}
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenu(true)}>
            <FaBars className="text-2xl dark:text-white" />
          </button>

          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
          >
            <FaCouch className="text-green-700" />
            <div className="flex items-center gap-0">
              <span className="text-green-700 text-sm">Furni</span>
              <span className="text-red-500 text-sm">Rent</span>
            </div>
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-1 max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search furniture..."
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 outline-none rounded-l-xl"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-5 rounded-r-xl"
          >
            <FaSearch />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 dark:text-white">
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

export default TabletNavbar;
