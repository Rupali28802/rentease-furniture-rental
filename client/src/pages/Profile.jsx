import {
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"
import { getInitials } from "../utils/getInitials";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-3xl font-bold">
          {user ? getInitials(user.name) : <FaUser />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user ? user.name : "Guest User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {user ? user.email : "Please login to access your account"}
          </p>
        </div>
      </div>

      {/* Account Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-4 p-5 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 transition"
        >
          <FaBoxOpen className="text-green-600 dark:text-green-400 text-xl" />
          <span className="font-medium text-gray-800 dark:text-white">
            My Orders
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigate("/wishlist")}
          className="flex items-center gap-4 p-5 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 transition"
        >
          <FaHeart className="text-red-500 dark:text-red-400 text-xl" />
          <span className="font-medium text-gray-800 dark:text-white">
            Wishlist
          </span>
        </button>

        {/* Addresses */}
        <button
          onClick={() => navigate("/profile/addresses")}
          className="flex items-center gap-4 p-5 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 transition"
        >
          <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xl" />
          <span className="font-medium text-gray-800 dark:text-white">
            Saved Addresses
          </span>
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-4 p-5 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 transition"
        >
          <FaCog className="text-gray-700 dark:text-gray-300 text-xl" />
          <span className="font-medium text-gray-800 dark:text-white">
            Settings
          </span>
        </button>
      </div>

      {/* Logout */}
      {user && (
        <div className="mt-8">
          <button
            onClick={async() => {
              try {
                await logout();
                 navigate("/login");
              } catch (error) {
                console.log("Logout error:",error.message);
                
              }
             
            }}
            className="flex items-center gap-4 p-5 rounded-xl border hover:bg-red-50 dark:hover:bg-red-900 dark:border-gray-700 transition text-red-600 dark:text-red-400"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
