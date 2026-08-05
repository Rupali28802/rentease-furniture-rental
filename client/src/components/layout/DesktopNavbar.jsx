import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaCouch,
  FaSearch,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/getInitials";

const DesktopNavbar = ({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="hidden lg:flex items-center justify-around gap-10">
      <h1
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
      >
        <FaCouch className="text-green-700" />
        <span>
          <span className="text-green-700">Furni</span>
          <span className="text-red-500">Rent</span>
        </span>
      </h1>

      {/* Search */}
      <div className="flex flex-1 max-w-2xl">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search furniture..."
          className="w-full px-6 border border-gray-500 py-3 outline-green-600 rounded-l-xl"
        />
        <button
          onClick={() => navigate(`/products?search=${search}`)}
          className="bg-green-700 text-white px-8 rounded-r-xl"
        >
          <FaSearch />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-10">
        {/* <div
          onClick={() => navigate("/new-arrivals")}
          className="cursor-pointer font-medium text-gray-700 hover:text-green-700 transition"
        >
          New Arrivals
        </div>

        <div
          onClick={() => navigate("/offers")}
          className="cursor-pointer font-medium text-red-600 hover:text-red-700 transition"
        >
          Offers & Deals
        </div> */}

       

        <div
          onClick={() => navigate("wishlist")}
          className="relative cursor-pointer"
        >
          <FaHeart className="text-lg" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        {/* <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <FaShoppingCart />
          {cartCount > 0 && <span>{cartCount}</span>}
        </div> */}
        <div
          onClick={() => navigate("cart")}
          className="relative cursor-pointer"
        >
          <FaShoppingCart className="text-lg" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold cursor-pointer"
        >
          {user ? getInitials(user.name) : <FaUser />}
        </div>
      </div>
    </div>
  );
};
export default DesktopNavbar;
