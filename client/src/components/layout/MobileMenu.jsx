// import { FaTimes, FaCouch } from "react-icons/fa";

// const MobileMenu = ({ mobileMenu, setMobileMenu, categories }) => {
//   return (
//     <>
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transition-all duration-300 ${
//           mobileMenu ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b">
//           <div className="flex items-center gap-2">
//             <FaCouch className="text-green-700 text-2xl" />

//             <h2 className="text-2xl font-bold">FurniRent</h2>
//           </div>

//           <button onClick={() => setMobileMenu(false)}>
//             <FaTimes className="text-2xl" />
//           </button>
//         </div>

//         <div className="flex flex-col gap-5 p-5">
//           {categories.map((item, index) => (
//             <button key={index} className="text-left hover:text-green-700">
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       {mobileMenu && (
//         <div
//           onClick={() => setMobileMenu(false)}
//           className="fixed inset-0 bg-black/40 z-40"
//         />
//       )}
//     </>
//   );
// };

// export default MobileMenu;

// import { useNavigate } from "react-router-dom";

// import {
//   FaTimes,
//   FaCouch,
//   FaHome,
//   FaBox,
//   FaTag,
//   FaMoon,
//   FaSun,
//   FaMapMarkerAlt,
//   FaChevronRight,
//   FaQuestionCircle,
//   FaPhoneAlt,
//   FaUser,
// } from "react-icons/fa";

// const MobileMenu = ({
//   mobileMenu,
//   setMobileMenu,
//   categories,
//   darkMode,
//   setDarkMode,
//   location,
// }) => {
//   const navigate = useNavigate();

//   const toggleTheme = () => {
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");

//       localStorage.setItem("theme", "light");

//       setDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark");

//       localStorage.setItem("theme", "dark");

//       setDarkMode(true);
//     }
//   };

//   const menuLinks = [
//     {
//       name: "Home",
//       icon: <FaHome />,
//       path: "/",
//     },

//     {
//       name: "Shop",
//       icon: <FaCouch />,
//       path: "/products",
//     },

//     {
//       name: "Offers",
//       icon: <FaTag />,
//       path: "/offers",
//     },

//     {
//       name: "Orders",
//       icon: <FaBox />,
//       path: "/orders",
//     },
//   ];

//   return (
//     <>
//       {/* SIDEBAR */}

//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-2xl transition-all duration-300 overflow-y-auto ${
//           mobileMenu ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* HEADER */}

//         <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
//           <div
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <FaCouch className="text-green-700 text-2xl" />

//             <h2 className="text-2xl font-bold dark:text-white">
//               Furni<span className="text-red-500">Rent</span>
//             </h2>
//           </div>

//           <button onClick={() => setMobileMenu(false)}>
//             <FaTimes className="text-2xl dark:text-white" />
//           </button>
//         </div>

//         {/* ACCOUNT */}

//         <div className="p-5 border-b dark:border-gray-700">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center text-xl">
//               <FaUser />
//             </div>

//             <div>
//               <h3 className="font-semibold dark:text-white">Hello, Guest</h3>

//               <button className="text-sm text-green-700 font-medium">
//                 Login / Register
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* LOCATION */}

//         <div className="p-5 border-b dark:border-gray-700">
//           <div className="flex items-center gap-3">
//             <FaMapMarkerAlt className="text-red-500" />

//             <div>
//               <p className="text-xs text-gray-500">Deliver to</p>

//               <p className="text-sm font-semibold dark:text-white">
//                 {location}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* THEME */}

//         <div className="p-5 border-b dark:border-gray-700">
//           <button
//             onClick={toggleTheme}
//             className="w-full flex items-center justify-between"
//           >
//             <div className="flex items-center gap-3 dark:text-white">
//               {darkMode ? <FaSun /> : <FaMoon />}

//               <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
//             </div>

//             <FaChevronRight className="dark:text-white" />
//           </button>
//         </div>

//         {/* MAIN MENU */}

//         <div className="p-5 border-b dark:border-gray-700">
//           <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
//             Main Menu
//           </h3>

//           <div className="flex flex-col gap-2">
//             {menuLinks.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   navigate(item.path);

//                   setMobileMenu(false);
//                 }}
//                 className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//               >
//                 <div className="flex items-center gap-3 dark:text-white">
//                   {item.icon}

//                   <span>{item.name}</span>
//                 </div>

//                 <FaChevronRight className="text-sm dark:text-white" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* CATEGORIES */}

//         <div className="p-5 border-b dark:border-gray-700">
//           <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
//             Categories
//           </h3>

//           <div className="flex flex-col gap-2">
//             {categories.map((item, index) => (
//               <button
//                 key={index}
//                 className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//               >
//                 <span className="dark:text-white">{item}</span>

//                 <FaChevronRight className="text-sm dark:text-white" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* SUPPORT */}

//         <div className="p-5">
//           <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
//             Support
//           </h3>

//           <div className="flex flex-col gap-2">
//             <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all dark:text-white">
//               <FaQuestionCircle />

//               <span>Help Center</span>
//             </button>

//             <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all dark:text-white">
//               <FaPhoneAlt />

//               <span>Contact Us</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* OVERLAY */}

//       {mobileMenu && (
//         <div
//           onClick={() => setMobileMenu(false)}
//           className="fixed inset-0 bg-black/40 z-40"
//         />
//       )}
//     </>
//   );
// };

// export default MobileMenu;

import { useNavigate } from "react-router-dom";

import {
  FaTimes,
  FaCouch,
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaUser,
  FaMapMarkerAlt,
  FaChevronRight,
  FaHeadset,
  FaMoon,
  FaSun,
  FaPercent,
  FaFire,
} from "react-icons/fa";

const MobileMenu = ({
  mobileMenu,
  setMobileMenu,
  categories,
  darkMode,
  setDarkMode,
  
}) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

      setDarkMode(true);
    }
  };

  const mainLinks = [
    {
      title: "Home",
      icon: <FaHome />,
      path: "/",
    },

    {
      title: "New Arrivals",
      icon: <FaFire />,
      path: "/new-arrivals",
    },

    {
      title: "Offers & Deals",
      icon: <FaPercent />,
      path: "/offers",
    },

    {
      title: "My Orders",
      icon: <FaBoxOpen />,
      path: "/orders",
    },

    {
      title: "Wishlist",
      icon: <FaHeart />,
      path: "/wishlist",
    },

    {
      title: "My Account",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* OVERLAY */}

      <div
        onClick={() => setMobileMenu(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#111827] z-50 transition-all duration-300 shadow-2xl flex flex-col ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="relative bg-gradient-to-r from-green-700 to-green-600 px-5 pt-6 pb-8 text-white">
          <button
            onClick={() => setMobileMenu(false)}
            className="absolute top-5 right-5"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* LOGO */}

          <div
            onClick={() => {
              navigate("/");

              setMobileMenu(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaCouch className="text-3xl" />

            <h1 className="text-3xl font-bold tracking-wide">
              Furni<span className="text-red-500 ">Rent</span>
            </h1>
          </div>

          {/* USER */}

          <div className="mt-7 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-2xl">
              <FaUser />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Hello, Guest</h2>

              <button className="text-sm text-white/90 underline">
                Login / Register
              </button>
            </div>
          </div>
        </div>

        {/* MAIN LINKS */}

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Explore
          </p>

          <div className="space-y-1">
            {mainLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);

                  setMobileMenu(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex items-center gap-4 dark:text-white">
                  <span className="text-lg">{item.icon}</span>

                  <span className="font-medium">{item.title}</span>
                </div>

                <FaChevronRight className="text-sm text-gray-400" />
              </button>
            ))}
          </div>

          {/* CATEGORIES */}

          <div className="mt-8">
            <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Top Categories
            </p>

            <div className="space-y-1">
              {categories.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <span className="font-medium dark:text-white">{item}</span>

                  <FaChevronRight className="text-sm text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="border-t dark:border-gray-800 p-4 bg-gray-50 dark:bg-[#0f172a]">
          {/* THEME */}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <div className="flex items-center gap-4 dark:text-white">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}

              <span className="font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>

            <div
              className={`w-11 h-6 rounded-full flex items-center px-1 transition-all ${
                darkMode
                  ? "bg-green-600 justify-end"
                  : "bg-gray-300 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          </button>

          {/* SUPPORT */}

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all mt-2 dark:text-white">
            <FaHeadset />

            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;