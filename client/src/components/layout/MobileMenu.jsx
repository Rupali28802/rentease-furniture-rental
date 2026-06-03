
// import { useNavigate,Link } from "react-router-dom";

// import {
//   FaTimes,
//   FaCouch,
//   FaHome,
//   FaBoxOpen,
//   FaHeart,
//   FaUser,
//   FaMapMarkerAlt,
//   FaChevronRight,
//   FaHeadset,
//   FaMoon,
//   FaSun,
//   FaPercent,
//   FaFire,
// } from "react-icons/fa";

// const MobileMenu = ({
//   mobileMenu,
//   setMobileMenu,
//   categories,
//   darkMode,
//   setDarkMode,
  
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

//   const mainLinks = [
//     {
//       title: "Home",
//       icon: <FaHome />,
//       path: "/",
//     },

//     {
//       title: "New Arrivals",
//       icon: <FaFire />,
//       path: "/new-arrivals",
//     },

//     {
//       title: "Offers & Deals",
//       icon: <FaPercent />,
//       path: "/offers",
//     },

//     {
//       title: "My Orders",
//       icon: <FaBoxOpen />,
//       path: "/orders",
//     },

//     {
//       title: "Wishlist",
//       icon: <FaHeart />,
//       path: "/wishlist",
//     },

//     {
//       title: "My Account",
//       icon: <FaUser />,
//       path: "/profile",
//     },
//   ];

//   return (
//     <>
//       {/* OVERLAY */}

//       <div
//         onClick={() => setMobileMenu(false)}
//         className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
//           mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       />

//       {/* SIDEBAR */}

//       <div
//         className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#111827] z-50 transition-all duration-300 shadow-2xl flex flex-col ${
//           mobileMenu ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* HEADER */}

//         <div className="relative bg-gradient-to-r from-green-700 to-green-600 px-5 pt-6 pb-8 text-white">
//           <button
//             onClick={() => setMobileMenu(false)}
//             className="absolute top-5 right-5"
//           >
//             <FaTimes className="text-2xl" />
//           </button>

//           {/* LOGO */}

//           <div
//             onClick={() => {
//               navigate("/");

//               setMobileMenu(false);
//             }}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <FaCouch className="text-3xl" />

//             <h1 className="text-3xl font-bold tracking-wide">
//               Furni<span className="text-red-500 ">Rent</span>
//             </h1>
//           </div>

//           {/* USER */}

//           <div className="mt-7 flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-2xl">
//               <FaUser />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold">Hello, Guest</h2>

//               <Link to="/login" className="text-sm text-white/90 underline">
//                 Login / Register
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* MAIN LINKS */}

//         <div className="flex-1 overflow-y-auto px-3 py-4">
//           <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//             Explore
//           </p>

//           <div className="space-y-1">
//             {mainLinks.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   navigate(item.path);

//                   setMobileMenu(false);
//                 }}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//               >
//                 <div className="flex items-center gap-4 dark:text-white">
//                   <span className="text-lg">{item.icon}</span>

//                   <span className="font-medium">{item.title}</span>
//                 </div>

//                 <FaChevronRight className="text-sm text-gray-400" />
//               </button>
//             ))}
//           </div>

//           {/* CATEGORIES */}

//           <div className="mt-8">
//             <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//               Top Categories
//             </p>

//             <div className="space-y-1">
//               {categories.map((item, index) => (
//                 <button
//                   key={index}
//                   className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//                 >
//                   <span className="font-medium dark:text-white">{item}</span>

//                   <FaChevronRight className="text-sm text-gray-400" />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}

//         <div className="border-t dark:border-gray-800 p-4 bg-gray-50 dark:bg-[#0f172a]">
//           {/* THEME */}

//           <button
//             onClick={toggleTheme}
//             className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
//           >
//             <div className="flex items-center gap-4 dark:text-white">
//               {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}

//               <span className="font-medium">
//                 {darkMode ? "Light Mode" : "Dark Mode"}
//               </span>
//             </div>

//             <div
//               className={`w-11 h-6 rounded-full flex items-center px-1 transition-all ${
//                 darkMode
//                   ? "bg-green-600 justify-end"
//                   : "bg-gray-300 justify-start"
//               }`}
//             >
//               <div className="w-4 h-4 rounded-full bg-white" />
//             </div>
//           </button>

//           {/* SUPPORT */}

//           <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all mt-2 dark:text-white">
//             <FaHeadset />

//             <span className="font-medium">Help & Support</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MobileMenu;



import { useNavigate, Link } from "react-router-dom";
import {
  FaTimes,
  FaCouch,
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaUser,
  FaChevronRight,
  FaHeadset,
  FaMoon,
  FaSun,
  FaPercent,
  FaFire,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"
import { getInitials } from "../../utils/getInitials"

const MobileMenu = ({
  mobileMenu,
  setMobileMenu,
  categories,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    { title: "Home", icon: <FaHome />, path: "/" },
    { title: "New Arrivals", icon: <FaFire />, path: "/new-arrivals" },
    { title: "Offers & Deals", icon: <FaPercent />, path: "/offers" },
    { title: "My Orders", icon: <FaBoxOpen />, path: "/orders" },
    { title: "Wishlist", icon: <FaHeart />, path: "/wishlist" },
    { title: "My Account", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setMobileMenu(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#111827] z-50 transition-all duration-300 shadow-2xl flex flex-col ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-700 to-green-600 px-5 pt-6 pb-8 text-white">
          <button
            onClick={() => setMobileMenu(false)}
            className="absolute top-5 right-5"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
              setMobileMenu(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaCouch className="text-3xl" />
            <h1 className="text-3xl font-bold tracking-wide">
              Furni<span className="text-red-500">Rent</span>
            </h1>
          </div>

          {/* User */}
          <div className="mt-7 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-2xl font-bold">
              {user ? getInitials(user.name) : <FaUser />}
            </div>
            <div>
              {user ? (
                <>
                  <h2 className="text-lg font-semibold">Hello, {user.name}</h2>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenu(false);
                    }}
                    className="text-sm text-white/90 underline"
                  >
                    View Profile
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">Hello, Guest</h2>
                  <Link to="/login" className="text-sm text-white/90 underline">
                    Login / Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Links */}
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

          {/* Categories */}
          <div className="mt-8">
            <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Top Categories
            </p>
            <div className="space-y-1">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/category/${item.toLowerCase()}`);
                    setMobileMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <span className="font-medium dark:text-white">{item}</span>
                  <FaChevronRight className="text-sm text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-800 p-4 bg-gray-50 dark:bg-[#0f172a]">
          {/* Theme Toggle */}
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

          {/* Support */}
          <button
            onClick={() => navigate("/support")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all mt-2 dark:text-white"
          >
            <FaHeadset />
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
