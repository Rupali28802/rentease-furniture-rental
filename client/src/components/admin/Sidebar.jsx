import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaClipboardList,
  FaCalendarCheck,
  FaCreditCard,
  FaTicketAlt,
  FaStar,
  FaBell,
  FaImages,
  FaBlog,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, end: true },
  { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
  { to: "/admin/categories", label: "Categories", icon: <FaTags /> },
  { to: "/admin/orders", label: "Orders", icon: <FaClipboardList /> },
  { to: "/admin/bookings", label: "Bookings", icon: <FaCalendarCheck /> },
  { to: "/admin/payments", label: "Payments", icon: <FaCreditCard /> },
  { to: "/admin/coupons", label: "Coupons", icon: <FaTicketAlt /> },
  { to: "/admin/reviews", label: "Reviews", icon: <FaStar /> },
  { to: "/admin/notifications", label: "Notifications", icon: <FaBell /> },
  { to: "/admin/banners", label: "Hero Banners", icon: <FaImages /> },
  { to: "/admin/blog-posts", label: "Blog Posts", icon: <FaBlog /> },
  { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
  { to: "/admin/admins", label: "Admin Users", icon: <FaUserShield /> },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-gray-900 dark:bg-gray-900 text-gray-200 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-5 py-5 border-b border-gray-700 flex items-center gap-2">
          <span className="text-2xl font-bold text-green-500">RentEase</span>
          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
            Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-green-600 text-white border-r-4 border-green-400"
                    : "hover:bg-gray-800"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm w-full px-3 py-2 rounded hover:bg-gray-800 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
