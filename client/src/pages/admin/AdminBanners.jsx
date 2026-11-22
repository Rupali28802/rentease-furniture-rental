import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminBanners = () => {
  // =====================================================
  // HERO BANNER STATES
  // =====================================================

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

  // =====================================================
  // PROMO BANNER STATES
  // =====================================================

  const [promoBanners, setPromoBanners] = useState([]);
  const [promoLoading, setPromoLoading] = useState(true);
  const [promoSaving, setPromoSaving] = useState(false);

  const [promoEditingId, setPromoEditingId] = useState(null);

  const [promoForm, setPromoForm] = useState({
    type: "offer",
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [promoImage, setPromoImage] = useState(null);

  // =====================================================
  // FETCH HERO BANNERS
  // =====================================================

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await api.get("/hero-banners/admin");

      setBanners(res.data.banners || res.data || []);
    } catch (error) {
      console.error("Failed to fetch hero banners:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH PROMO BANNERS
  // =====================================================

  const fetchPromoBanners = async () => {
    try {
      setPromoLoading(true);

      const res = await api.get("/promo-banners");

      setPromoBanners(res.data || []);
    } catch (error) {
      console.error("Failed to fetch promo banners:", error);
    } finally {
      setPromoLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchBanners();
    fetchPromoBanners();
  }, []);

  // =====================================================
  // HERO INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // HERO IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  // =====================================================
  // HERO ADD / UPDATE
  // =====================================================

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

      if (form.features.trim()) {
        formData.append("features", form.features);
      }

      if (image) {
        formData.append("image", image);
      }

      // UPDATE HERO
      if (editingId) {
        await api.put(`/hero-banners/${editingId}`, formData);

        alert("Hero banner updated successfully");
      }

      // ADD HERO
      else {
        if (!image) {
          alert("Hero banner image is required");
          setSaving(false);
          return;
        }

        await api.post("/hero-banners", formData);

        alert("Hero banner added successfully");
      }

      // RESET
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

      const fileInput = document.getElementById("banner-image");

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchBanners();
    } catch (error) {
      console.error("Hero banner save error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save hero banner",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // HERO EDIT
  // =====================================================

  const handleEdit = (banner) => {
    setEditingId(banner._id);

    setForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      buttonText: banner.buttonText || "",
      link: banner.link || "",
      order: banner.order ?? "",
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      features: banner.features ? JSON.stringify(banner.features) : "",
    });

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // HERO DELETE
  // =====================================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hero banner?")) {
      return;
    }

    try {
      await api.delete(`/hero-banners/${id}`);

      alert("Hero banner deleted successfully");

      await fetchBanners();
    } catch (error) {
      console.error("Delete hero banner error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to delete hero banner",
      );
    }
  };

  // =====================================================
  // HERO CANCEL
  // =====================================================

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

  // =====================================================
  // HERO IMAGE URL
  // =====================================================

  const getImageUrl = (banner) => {
    if (!banner?.image?.data) {
      return "";
    }

    return `data:${banner.image.contentType};base64,${banner.image.data}`;
  };

  // =====================================================
  // PROMO INPUT
  // =====================================================

  const handlePromoChange = (e) => {
    const { name, value } = e.target;

    setPromoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PROMO IMAGE
  // =====================================================

  const handlePromoImageChange = (e) => {
    setPromoImage(e.target.files[0] || null);
  };

  // =====================================================
  // PROMO ADD / UPDATE
  // =====================================================

  const handlePromoSubmit = async (e) => {
    e.preventDefault();

    try {
      setPromoSaving(true);

      const formData = new FormData();

      formData.append("type", promoForm.type);
      formData.append("title", promoForm.title);
      formData.append("subtitle", promoForm.subtitle);
      formData.append("buttonText", promoForm.buttonText);
      formData.append("buttonLink", promoForm.buttonLink);

      // Image
      if (promoImage) {
        formData.append("image", promoImage);
      }

      // UPDATE PROMO
      if (promoEditingId) {
        await api.put(`/promo-banners/${promoEditingId}`, formData);

        alert("Promo banner updated successfully");
      }

      // ADD PROMO
      else {
        if (!promoImage) {
          alert("Promo banner image is required");
          setPromoSaving(false);
          return;
        }

        await api.post("/promo-banners", formData);

        alert("Promo banner added successfully");
      }

      // RESET FORM
      setPromoForm({
        type: "offer",
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: "",
      });

      setPromoImage(null);
      setPromoEditingId(null);

      const fileInput = document.getElementById("promo-banner-image");

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchPromoBanners();
    } catch (error) {
      console.error("Promo banner save error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save promo banner",
      );
    } finally {
      setPromoSaving(false);
    }
  };

  // =====================================================
  // PROMO EDIT
  // =====================================================

  const handlePromoEdit = (banner) => {
    setPromoEditingId(banner._id);

    setPromoForm({
      type: banner.type || "offer",
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      buttonText: banner.buttonText || "",
      buttonLink: banner.buttonLink || "",
    });

    setPromoImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PROMO DELETE
  // =====================================================

  const handlePromoDelete = async (id) => {
    if (!window.confirm("Delete this promo banner?")) {
      return;
    }

    try {
      await api.delete(`/promo-banners/${id}`);

      alert("Promo banner deleted successfully");

      await fetchPromoBanners();
    } catch (error) {
      console.error("Delete promo banner error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to delete promo banner",
      );
    }
  };

  // =====================================================
  // PROMO CANCEL
  // =====================================================

  const handlePromoCancel = () => {
    setPromoEditingId(null);

    setPromoForm({
      type: "offer",
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    });

    setPromoImage(null);

    const fileInput = document.getElementById("promo-banner-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // PROMO IMAGE URL
  // =====================================================

  const getPromoImageUrl = (banner) => {
    if (!banner?.image?.data) {
      return "";
    }

    return `data:${banner.image.contentType};base64,${banner.image.data}`;
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="space-y-6">
      {/* =================================================
          HERO BANNER FORM
      ================================================= */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {editingId ? "Edit Hero Banner" : "Add Hero Banner"}
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
              Hero Banner Image
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
                  ? "Update Hero Banner"
                  : "Add Hero Banner"}
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

      {/* =================================================
          HERO BANNER LIST
      ================================================= */}

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
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hero banners
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
                    {b.image?.data ? (
                      <img
                        src={getImageUrl(b)}
                        alt={b.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
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

      {/* =================================================
          PROMO BANNER FORM
      ================================================= */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {promoEditingId ? "Edit Promo Banner" : "Add Promo Banner"}
        </h2>

        <form onSubmit={handlePromoSubmit} className="space-y-4">
          {/* TYPE */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Banner Type
            </label>

            <select
              name="type"
              value={promoForm.type}
              onChange={handlePromoChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="offer">Offer</option>

              <option value="newArrival">New Arrival</option>
            </select>
          </div>

          {/* TITLE */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={promoForm.title}
              onChange={handlePromoChange}
              placeholder="Summer Offer"
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
              value={promoForm.subtitle}
              onChange={handlePromoChange}
              placeholder="Get premium furniture at special prices"
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
              value={promoForm.buttonText}
              onChange={handlePromoChange}
              placeholder="Shop Now"
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* BUTTON LINK */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Button Link
            </label>

            <input
              type="text"
              name="buttonLink"
              value={promoForm.buttonLink}
              onChange={handlePromoChange}
              placeholder="/products"
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* IMAGE */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Promo Banner Image
            </label>

            <input
              id="promo-banner-image"
              type="file"
              accept="image/*"
              onChange={handlePromoImageChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />

            {promoEditingId && (
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={promoSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {promoSaving
                ? "Saving..."
                : promoEditingId
                  ? "Update Promo Banner"
                  : "Add Promo Banner"}
            </button>

            {promoEditingId && (
              <button
                type="button"
                onClick={handlePromoCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* =================================================
          PROMO BANNER LIST
      ================================================= */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Promo Banners
        </h2>

        {promoLoading ? (
          <p className="text-gray-500">Loading promo banners...</p>
        ) : (
          <Table
            headers={[
              "Image",
              "Type",
              "Title",
              "Subtitle",
              "Button",
              "Actions",
            ]}
          >
            {promoBanners.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No promo banners
                </td>
              </tr>
            ) : (
              promoBanners.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {/* IMAGE */}

                  <td className="px-4 py-3">
                    {b.image?.data ? (
                      <img
                        src={getPromoImageUrl(b)}
                        alt={b.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </td>

                  {/* TYPE */}

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {b.type === "newArrival" ? "New Arrival" : "Offer"}
                  </td>

                  {/* TITLE */}

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    {b.title}
                  </td>

                  {/* SUBTITLE */}

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {b.subtitle || "-"}
                  </td>

                  {/* BUTTON */}

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {b.buttonText || "-"}
                  </td>

                  {/* ACTIONS */}

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handlePromoEdit(b)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded mr-2 hover:bg-blue-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handlePromoDelete(b._id)}
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
