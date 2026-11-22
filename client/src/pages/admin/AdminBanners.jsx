
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    link: "",
    order: "",
    isActive: true,
    features: "",
  });

  const [image, setImage] = useState(null);

  // =========================
  // FETCH BANNERS
  // =========================
  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/banners");

      setBanners(res.data.banners || res.data || []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // IMAGE
  // =========================
  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  // =========================
  // ADD / UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("buttonText", form.buttonText);
      formData.append("link", form.link);
      formData.append("order", form.order);
      formData.append("isActive", form.isActive);

      // Features backend JSON.parse karta hai
      if (form.features.trim()) {
        formData.append("features", form.features);
      }

      // Image only if selected
      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await api.put(`/admin/banners/${editingId}`, formData);
        alert("Banner updated successfully");
      } else {
        if (!image) {
          alert("Banner image is required");
          setSaving(false);
          return;
        }

        await api.post("/admin/banners", formData);
        alert("Banner added successfully");
      }

      // RESET FORM
      setForm({
        title: "",
        subtitle: "",
        buttonText: "",
        link: "",
        order: "",
        isActive: true,
        features: "",
      });

      setImage(null);
      setEditingId(null);

      // Reset file input
      const fileInput = document.getElementById("banner-image");
      if (fileInput) {
        fileInput.value = "";
      }

      await fetchBanners();
    } catch (error) {
      console.error("Banner save error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save banner"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (banner) => {
    setEditingId(banner._id);

    setForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      buttonText: banner.buttonText || "",
      link: banner.link || "",
      order: banner.order ?? "",
      isActive:
        banner.isActive !== undefined ? banner.isActive : true,
      features: banner.features
        ? JSON.stringify(banner.features)
        : "",
    });

    // New image optional during update
    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await api.delete(`/admin/banners/${id}`);

      alert("Banner deleted successfully");

      await fetchBanners();
    } catch (error) {
      console.error("Delete banner error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to delete banner"
      );
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      title: "",
      subtitle: "",
      buttonText: "",
      link: "",
      order: "",
      isActive: true,
      features: "",
    });

    setImage(null);

    const fileInput = document.getElementById("banner-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================
  // IMAGE URL
  // =========================
  const getImageUrl = (image) => {
    if (!image) return "";

    // Complete URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Relative backend path
    const baseURL = api.defaults.baseURL?.replace(/\/api\/?$/, "");

    return `${baseURL}${image.startsWith("/") ? image : `/${image}`}`;
  };

  return (
    <div className="space-y-6">

      {/* =========================
          ADD / EDIT FORM
      ========================= */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {editingId ? "Edit Banner" : "Add Banner"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Summer Furniture Sale"
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Rent premium furniture at affordable prices"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* BUTTON TEXT */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Button Text
            </label>

            <input
              type="text"
              name="buttonText"
              value={form.buttonText}
              onChange={handleChange}
              placeholder="Shop Now"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* LINK */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Button Link
            </label>

            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="/products"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* ORDER */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Position / Order
            </label>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              placeholder="1"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Banner Image
            </label>

            <input
              id="banner-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />

            {editingId && (
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          {/* FEATURES */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Features JSON
            </label>

            <textarea
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder='["Free Delivery","Easy Rental","Premium Quality"]'
              rows={3}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              id="banner-active"
            />

            <label
              htmlFor="banner-active"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Active
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Banner"
                  : "Add Banner"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      </div>

      {/* =========================
          BANNER LIST
      ========================= */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Hero Banners
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <Table
            headers={[
              "Image",
              "Title",
              "Subtitle",
              "Position",
              "Active",
              "Actions",
            ]}
          >
            {banners.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No banners
                </td>
              </tr>
            ) : (
              banners.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >

                  {/* IMAGE */}
                  <td className="px-4 py-3">
                    {b.image ? (
                      <img
                        src={getImageUrl(b.image)}
                        alt={b.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No image
                      </span>
                    )}
                  </td>

                  {/* TITLE */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    {b.title}
                  </td>

                  {/* SUBTITLE */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {b.subtitle || "-"}
                  </td>

                  {/* ORDER */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {b.order ?? "-"}
                  </td>

                  {/* ACTIVE */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        b.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(b)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded mr-2 hover:bg-blue-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminBanners;
