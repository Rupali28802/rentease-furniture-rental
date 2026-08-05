import { useState } from "react";
import { api } from "../../api/axios";

const defaultPrefs = {
  email: true,
  sms: true,
  orderUpdates: true,
  promotions: false,
};

export default function NotificationForm({ userId, onMessage }) {
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [saving, setSaving] = useState(false);

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/settings/notifications/${userId}`, prefs);
      onMessage("success", "Notification preferences saved!");
    } catch (err) {
      onMessage("error", "Could not save preferences");
    } finally {
      setSaving(false);
    }
  };

  const toggles = [
    { key: "email", label: "Email Notifications" },
    { key: "sms", label: "SMS Notifications" },
    { key: "orderUpdates", label: "Order Updates" },
    { key: "promotions", label: "Promotions & Offers" },
  ];

  return (
    <div className="max-w-lg">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
        Notification Preferences
      </h3>
      <div className="space-y-3">
        {toggles.map((t) => (
          <label
            key={t.key}
            className="flex items-center justify-between p-3 border rounded-md cursor-pointer"
          >
            <span className="text-gray-700 dark:text-gray-300">{t.label}</span>
            <input
              type="checkbox"
              checked={prefs[t.key]}
              onChange={() => handleToggle(t.key)}
              className="w-5 h-5 accent-green-600"
            />
          </label>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
}
