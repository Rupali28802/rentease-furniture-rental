import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCouch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/getInitials";
import { useAddress } from "../../context/AddressContext";

const TabletNavbar = ({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  location,
  setMobileMenu,
}) => {
  const navigate = useNavigate();
  const {selectedAddress} = useAddress()
  const { user } = useAuth();

  return (
    <div className="hidden md:flex lg:hidden flex-col w-full">
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={() => setMobileMenu(true)}>
          <FaBars />
        </button>
        {/* <h1
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-3xl font-bold cursor-pointer"
        >
          <FaCouch className="text-green-700" />{" "}
          <span className="text-green-700 mr-0"> Furni</span>
          <span className="text-red-500">Rent</span>
        </h1> */}
        <h1
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-2xl ml-2 font-bold cursor-pointer"
        >
          <FaCouch className="text-green-700" />
          <span>
            <span className="text-green-700">Furni</span>
            <span className="text-red-500">Rent</span>
          </span>
        </h1>

        <div className="flex flex-1 max-w-2xl ml-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-[350px] border px-4 py-2 rounded-l-xl"
          />
          <button
            onClick={() => navigate(`/products?search=${search}`)}
            className="bg-green-700 text-white px-5 rounded-r-xl"
          >
            <FaSearch />
          </button>
        </div>
        {/* <div className="flex items-center gap-5">
          <FaHeart onClick={() => navigate("/wishlist")} />
          <FaShoppingCart onClick={() => navigate("/cart")} />
          <div
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold cursor-pointer text-sm"
          >
            {user ? getInitials(user.name) : <FaUser />}
          </div>
        </div> */}

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 dark:text-white">
          {/* WISHLIST */}
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

          {/* CART */}
          <div onClick={()=>navigate("cart")} className="relative cursor-pointer">
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* ACCOUNT */}
          <FaUser className="hidden text-lg cursor-pointer" />
        </div>
      </div>
      <div className="bg-white px-4 py-2 flex items-center gap-2">
        <FaMapMarkerAlt className="text-red-500" /> Deliver to: {""}
        {selectedAddress ? `${selectedAddress.city},${selectedAddress.state},${selectedAddress.pincode}`
        :"select address"}
        
      </div>
    </div>
  );
};
export default TabletNavbar;



 