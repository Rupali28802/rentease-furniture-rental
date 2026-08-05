import { useEffect, useState } from "react";
import { api } from "../../api/axios";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/settings")
      .then((res) => setSettings(res.data.settings))
      .finally(() => setLoading(false));
  }, []);

  const update = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await api.put("/admin/settings", { [key]: value });
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  const prefs = settings?.preferences || {};

  return (
    <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Platform Settings
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Language
          </label>
          <select
            value={prefs.language || "en"}
            onChange={(e) =>
              update("preferences", { ...prefs, language: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              Email Notifications
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send email updates to users
            </p>
          </div>
          <button
            onClick={() =>
              update("notifications", {
                ...settings?.notifications,
                email: !settings?.notifications?.email,
              })
            }
            className={`w-12 h-6 rounded-full transition ${
              settings?.notifications?.email ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transition ${
                settings?.notifications?.email ? "ml-6" : "ml-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              SMS Notifications
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send SMS alerts to users
            </p>
          </div>
          <button
            onClick={() =>
              update("notifications", {
                ...settings?.notifications,
                sms: !settings?.notifications?.sms,
              })
            }
            className={`w-12 h-6 rounded-full transition ${
              settings?.notifications?.sms ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transition ${
                settings?.notifications?.sms ? "ml-6" : "ml-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
