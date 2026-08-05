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
  FaHandshake,
  FaSun,
  FaMoon,
  FaPercent,
  FaFire,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/getInitials";

const MobileMenu = ({ mobileMenu, setMobileMenu, categories }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const mainLinks = [
    { title: "Home", icon: <FaHome />, path: "/" },
    { title: "New Arrivals", icon: <FaFire />, path: "/new-arrivals" },
    { title: "Offers & Deals", icon: <FaPercent />, path: "/offers" },
    { title: "My Orders", icon: <FaBoxOpen />, path: "/orders" },
    // { title: "Wishlist", icon: <FaHeart />, path: "/wishlist" },
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
{/* Support */}
          <button
            onClick={() => navigate("/help")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all mt-2 dark:text-white"
          >
            <FaHeadset />
            <span className="font-medium">Help & Support</span>
          </button>

          {/* Become Partner */}
          <button
            onClick={() => navigate("/partner")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all mt-2 dark:text-white"
          >
            <FaHandshake />
            <span className="font-medium">Become a Partner</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
