
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaCouch,
  FaMoon,
  FaSun,
  FaSearch,
} from "react-icons/fa";

const DesktopNavbar = ({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();

  // SEARCH

  const handleSearch = () => {
    if (!search.trim()) {
      return alert("Please enter search");
    }

    navigate(`/products?search=${search}`);
  };

  // THEME

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

  return (
    <div className="hidden lg:flex items-center justify-between gap-6">
      {/* ========================================= */}
      {/* LOGO */}
      {/* ========================================= */}

      <h1
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-3xl font-bold cursor-pointer shrink-0"
      >
        <FaCouch className="text-green-700" />

        <span className="text-green-700">
          Furni
        </span>

        <span className="text-red-500">
          Rent
        </span>
      </h1>

      {/* ========================================= */}
      {/* SEARCH */}
      {/* ========================================= */}

      <div className="flex flex-1 max-w-2xl">
        <input
          type="text"
          placeholder="Search furniture, appliances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSearch()
          }
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-5 py-3 rounded-l-xl outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-green-700 hover:bg-green-800 text-white px-8 rounded-r-xl flex items-center justify-center"
        >
          <FaSearch />
        </button>
      </div>

      {/* ========================================= */}
      {/* RIGHT */}
      {/* ========================================= */}

      <div className="flex items-center gap-10 dark:text-white shrink-0">
        {/* THEME */}

        <button onClick={toggleTheme}>
          {darkMode ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>

        {/* WISHLIST */}

        <div
          onClick={() => navigate("/wishlist")}
          className="flex flex-col items-center text-sm cursor-pointer"
        >
          <div className="relative">
            <FaHeart className="text-lg" />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          <span>Wishlist</span>
        </div>

        {/* CART */}

        <div
          onClick={() => navigate("/cart")}
          className="flex flex-col items-center text-sm cursor-pointer"
        >
          <div className="relative">
            <FaShoppingCart className="text-lg" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          <span>Cart</span>
        </div>

        {/* ACCOUNT */}

        <div
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-sm cursor-pointer"
        >
          <FaUser className="text-lg" />

          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;