import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
// Icons
import {
  FaUserCog,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
} from "react-icons/fa";
// Sub-components
import ProfileForm from "../components/settings/ProfileForm";
import AddressForm from "../components/settings/AddressForm";
import PaymentForm from "../components/settings/PaymentForm";
import NotificationForm from "../components/settings/NotificationForm";

const Settings = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwdLoading, setPwdLoading] = useState(false);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage("error", "New passwords do not match");
      return;
    }
    setPwdLoading(true);
    try {
      await api.put("/auth/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      showMessage("success", "Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Could not change password",
      );
    } finally {
      setPwdLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUserCog /> },
    { id: "address", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "payment", label: "Payment", icon: <FaCreditCard /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
  ];

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h1>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar / Tabs */}
        <aside className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 flex md:flex-col md:gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

            {/* Back to profile */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition mt-1"
            >
              ← Back to Profile
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Profile Settings
                </h2>
                <ProfileForm
                  user={user}
                  setUser={setUser}
                  onMessage={showMessage}
                />

                {/* Change Password */}
                <div className="mt-8 border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Change Password
                  </h2>
                  <form
                    onSubmit={handlePasswordChange}
                    className="space-y-4 max-w-md"
                  >
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                      className={inputCls}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      required
                      className={inputCls}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className={inputCls}
                    />
                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
                    >
                      {pwdLoading ? "Updating..." : "Change Password"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Address Management
                </h2>
                <AddressForm onMessage={showMessage} />
              </div>
            )}

            {activeTab === "payment" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Payment Methods
                </h2>
                <PaymentForm userId={user?._id} onMessage={showMessage} />
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Notification Preferences
                </h2>
                <NotificationForm userId={user?._id} onMessage={showMessage} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
