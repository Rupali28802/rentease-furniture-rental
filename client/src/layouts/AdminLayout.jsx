import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaUserShield } from "react-icons/fa";
import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("admin-theme") === "dark",
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700 dark:text-gray-200 text-xl"
          >
            <FaBars />
          </button>

          <div className="hidden lg:block text-gray-600 dark:text-gray-300 text-sm font-medium">
            Admin Dashboard
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 transition"
              title="Toggle dark mode"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
            >
              <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                <FaUserShield />
              </span>
              <span className="hidden sm:block font-medium">
                {user?.name || "Admin"}
              </span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
