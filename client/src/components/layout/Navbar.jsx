// export default Navbar;

// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

// import {
//   FaHeart,
//   FaShoppingCart,
//   FaUser,
//   FaBars,
//   FaCouch,
//   FaSearch,
//   FaChevronDown,
//   FaTimes,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// const Navbar = () => {
//   // =========================================
//   // NAVIGATE
//   // =========================================

//   const navigate = useNavigate();

//   // =========================================
//   // STATES
//   // =========================================

//   const [search, setSearch] = useState("");

//   const [mobileSearch, setMobileSearch] = useState(false);

//   const [mobileMenu, setMobileMenu] = useState(false);

//   // =========================================
//   // DUMMY BACKEND DATA
//   // =========================================

//   const cartCount = 0;

//   const wishlistCount = 0;

//   const location = "Bangalore, 560001";

//   // =========================================
//   // CATEGORY DATA
//   // =========================================

//   const categories = [
//     "Sofa",
//     "Beds",
//     "Appliances",
//     "Dining",
//     "Office",
//     "Storage",
//     "Home Decor",
//   ];

//   // =========================================
//   // SEARCH FUNCTION
//   // =========================================

//   const handleSearch = () => {
//     if (!search.trim()) {
//       return alert("Please enter search");
//     }

//     navigate(`/products?search=${search}`);
//   };

//   // =========================================
//   // BODY SCROLL FIX
//   // =========================================

//   useEffect(() => {
//     if (mobileMenu) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [mobileMenu]);

//   return (
//     <>
//       {/* ========================================= */}
//       {/* DESKTOP TOP HEADER */}
//       {/* ========================================= */}

//       <div className="hidden lg:flex justify-between items-center px-10 py-2 bg-white text-sm border-b">
//         <div className="flex items-center gap-2 text-gray-600">
//           <FaMapMarkerAlt className="text-red-500" />

//           <p>Deliver to {location}</p>
//         </div>

//         <div className="flex items-center gap-6 text-gray-600">
//           <p className="cursor-pointer hover:text-green-700">Track Order</p>

//           <p className="cursor-pointer hover:text-green-700">Help</p>

//           <p className="cursor-pointer hover:text-green-700">Become Partner</p>
//         </div>
//       </div>

//       {/* ========================================= */}
//       {/* MAIN NAVBAR */}
//       {/* ========================================= */}

//       <div className="bg-white sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           {/* ========================================= */}
//           {/* MOBILE NAVBAR */}
//           {/* ========================================= */}

//           <div className="flex md:hidden items-center justify-between">
//             {/* LEFT */}

//             <div className="flex items-center gap-3">
//               {/* HAMBURGER */}

//               <button onClick={() => setMobileMenu(true)} className="text-xl">
//                 <FaBars />
//               </button>

//               {/* LOGO */}

//               <h1
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
//               >
//                 <FaCouch className="text-green-700" />

//                 <span className="text-green-700">Furni</span>

//                 <span className="text-red-500">Rent</span>
//               </h1>
//             </div>

//             {/* RIGHT */}

//             <div className="flex items-center gap-5">
//               {/* SEARCH */}

//               <button onClick={() => setMobileSearch(!mobileSearch)}>
//                 <FaSearch className="text-lg" />
//               </button>

//               {/* WISHLIST */}

//               <div
//                 onClick={() => navigate("/wishlist")}
//                 className="relative cursor-pointer"
//               >
//                 <FaHeart className="text-lg" />

//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </div>

//               {/* CART */}

//               <div
//                 onClick={() => navigate("/cart")}
//                 className="relative cursor-pointer"
//               >
//                 <FaShoppingCart className="text-lg" />

//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========================================= */}
//           {/* MOBILE LOCATION */}
//           {/* ========================================= */}

//           <div className="md:hidden mt-3">
//             <button className="w- border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="text-red-500" />

//                 <div className="text-left leading-tight">
//                   <p className="text-[11px] text-gray-500">Deliver to</p>

//                   <p className="text-sm font-semibold">{location}</p>
//                 </div>
//               </div>

//               <FaChevronDown className="text-xs ml-3.5" />
//             </button>
//           </div>

//           {/* ========================================= */}
//           {/* MOBILE SEARCH */}
//           {/* ========================================= */}

//           <div
//             className={`md:hidden overflow-hidden transition-all duration-300 ${
//               mobileSearch ? "max-h-20 mt-3" : "max-h-0"
//             }`}
//           >
//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Search furniture..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-l-xl outline-none"
//               />

//               <button
//                 onClick={handleSearch}
//                 className="bg-green-700 text-white px-6 rounded-r-xl"
//               >
//                 <FaSearch />
//               </button>
//             </div>
//           </div>

//           {/* ========================================= */}
//           {/* TABLET NAVBAR */}
//           {/* ========================================= */}

//           <div className="hidden md:flex lg:hidden items-center justify-between gap-4">
//             {/* LEFT */}

//             <div className="flex items-center gap-3 shrink-0">
//               <button onClick={() => setMobileMenu(true)} className="text-2xl">
//                 <FaBars />
//               </button>

//               {/* LOGO */}

//               <h1
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
//               >
//                 <FaCouch className="text-green-700" />

//                 <span className="text-green-700">Furni</span>

//                 <span className="text-red-500">Rent</span>
//               </h1>
//             </div>

//             {/* SEARCH SECTION */}

//             <div className="flex flex-1 max-w-2xl">
//               {/* LOCATION */}

//               <button className="border border-r-0 border-gray-300 px-3 rounded-l-xl flex items-center gap-3 bg-white min-w-[170px]">
//                 <FaMapMarkerAlt className="text-red-500" />

//                 <div className="text-left leading-tight">
//                   <p className="text-[10px] text-gray-500">Deliver to</p>

//                   <p className="text-sm font-semibold">Bangalore</p>
//                 </div>

//                 <FaChevronDown className="text-xs ml-auto" />
//               </button>

//               {/* SEARCH */}

//               <input
//                 type="text"
//                 placeholder="Search furniture..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className="w-full border border-gray-300 px-4 py-3 outline-none"
//               />

//               {/* SEARCH BUTTON */}

//               <button
//                 onClick={handleSearch}
//                 className="bg-green-700 text-white px-5 rounded-r-xl"
//               >
//                 <FaSearch />
//               </button>
//             </div>

//             {/* RIGHT */}

//             <div className="flex items-center gap-5 shrink-0">
//               {/* WISHLIST */}

//               <div
//                 onClick={() => navigate("/wishlist")}
//                 className="relative cursor-pointer"
//               >
//                 <FaHeart className="text-lg" />

//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </div>

//               {/* CART */}

//               <div
//                 onClick={() => navigate("/cart")}
//                 className="relative cursor-pointer"
//               >
//                 <FaShoppingCart className="text-lg" />

//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </div>

//               {/* ACCOUNT */}

//               <div
//                 onClick={() => navigate("/profile")}
//                 className="cursor-pointer"
//               >
//                 <FaUser className="text-lg" />
//               </div>
//             </div>
//           </div>

//           {/* ========================================= */}
//           {/* DESKTOP NAVBAR */}
//           {/* ========================================= */}

//           <div className="hidden lg:flex items-center justify-between gap-4">
//             {/* LEFT */}

//             <h1
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
//             >
//               <FaCouch className="text-green-700" />

//               <span className="text-green-700">Furni</span>

//               <span className="text-red-500">Rent</span>
//             </h1>

//             {/* SEARCH */}

//             <div className="flex flex-1 max-w-2xl">
//               <input
//                 type="text"
//                 placeholder="Search furniture, appliances..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className="w-full border border-gray-300 px-5 py-3 rounded-l-xl outline-none"
//               />

//               <button
//                 onClick={handleSearch}
//                 className="bg-green-700 text-white px-8 rounded-r-xl hover:bg-green-800"
//               >
//                 Search
//               </button>
//             </div>

//             {/* RIGHT */}

//             <div className="flex items-center gap-10">
//               {/* WISHLIST */}

//               <div
//                 onClick={() => navigate("/wishlist")}
//                 className="flex flex-col items-center text-sm cursor-pointer"
//               >
//                 <div className="relative">
//                   <FaHeart className="text-lg" />

//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </div>

//                 <span>Wishlist</span>
//               </div>

//               {/* CART */}

//               <div
//                 onClick={() => navigate("/cart")}
//                 className="flex flex-col items-center text-sm cursor-pointer"
//               >
//                 <div className="relative">
//                   <FaShoppingCart className="text-lg" />

//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>

//                 <span>Cart</span>
//               </div>

//               {/* ACCOUNT */}

//               <div
//                 onClick={() => navigate("/profile")}
//                 className="flex flex-col items-center text-sm cursor-pointer"
//               >
//                 <FaUser className="text-lg" />

//                 <span>Account</span>
//               </div>
//             </div>
//           </div>

//           {/* ========================================= */}
//           {/* DESKTOP CATEGORY MENU */}
//           {/* ========================================= */}

//           <div className="hidden lg:flex items-center gap-10 mt-5 text-base font-medium text-gray-700 overflow-x-auto">
//             <button className="bg-green-700 text-white px-5 py-2 rounded-lg whitespace-nowrap">
//               All Categories
//             </button>

//             {categories.map((item, index) => (
//               <p
//                 key={index}
//                 onClick={() => navigate(`/products/${item}`)}
//                 className="cursor-pointer hover:text-green-700 whitespace-nowrap"
//               >
//                 {item}
//               </p>
//             ))}

//             <p className="cursor-pointer text-red-500 whitespace-nowrap">
//               Offers
//             </p>
//           </div>
//         </div>

//         {/* ========================================= */}
//         {/* MOBILE/TABLET SIDEBAR */}
//         {/* ========================================= */}

//         <div
//           className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transition-all duration-300 ease-in-out ${
//             mobileMenu ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           {/* SIDEBAR HEADER */}

//           <div className="flex items-center justify-between p-5 border-b">
//             <div className="flex items-center gap-2">
//               <FaCouch className="text-green-700 text-2xl" />

//               <h2 className="text-2xl font-bold">FurniRent</h2>
//             </div>

//             <button onClick={() => setMobileMenu(false)}>
//               <FaTimes className="text-2xl" />
//             </button>
//           </div>

//           {/* SIDEBAR MENU */}

//           <div className="flex flex-col gap-5 p-5 text-base font-medium">
//             {categories.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   navigate(`/products/${item}`);

//                   setMobileMenu(false);
//                 }}
//                 className="text-left hover:text-green-700"
//               >
//                 {item}
//               </button>
//             ))}

//             <hr />

//             <button
//               onClick={() => {
//                 navigate("/orders");

//                 setMobileMenu(false);
//               }}
//               className="text-left hover:text-green-700"
//             >
//               Orders
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/profile");

//                 setMobileMenu(false);
//               }}
//               className="text-left hover:text-green-700"
//             >
//               Account
//             </button>
//           </div>
//         </div>

//         {/* ========================================= */}
//         {/* OVERLAY */}
//         {/* ========================================= */}

//         {mobileMenu && (
//           <div
//             onClick={() => setMobileMenu(false)}
//             className="fixed inset-0 bg-black/40 z-40"
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNabar";
import MobileMenu from "./MobileMenu";
import DesktopTopbar from "./DesktopTopbar";
import CategoryMenu from "./CategoryMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const [mobileSearch, setMobileSearch] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const cartCount = 0;

const wishlistCount = 0;

  const location = "Bangalore, 560001";

  const categories = [
    "Sofa",
    "Beds",
    "Appliances",
    "Dining",
    "Office",
    "Storage",
    "Home Decor",
  ];

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);

  return (
    <>
      <DesktopTopbar location={location} />

      <div className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <MobileNavbar
            search={search}
            setSearch={setSearch}
            mobileSearch={mobileSearch}
            setMobileSearch={setMobileSearch}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            location={location}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <TabletNavbar
            search={search}
            setSearch={setSearch}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            location={location}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <DesktopNavbar
            search={search}
            setSearch={setSearch}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <CategoryMenu categories={categories} />
        </div>

        <MobileMenu
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          categories={categories}
        />
      </div>
    </>
  );
};

export default Navbar;