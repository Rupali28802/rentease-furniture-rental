import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = {
        name: form.name,
        slug: form.slug,
        image: form.image,
      };

      if (editingId) {
        await api.put(`/admin/categories/${editingId}`, data);
      } else {
        await api.post("/admin/categories", data);
      }

      setForm({
        name: "",
        slug: "",
        image: "",
      });

      setEditingId(null);

      await fetchCategories();
    } catch (error) {
      console.log("Category save error:", error);

      alert(error.response?.data?.error || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  // EDIT
  const handleEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name || "",
      slug: category.slug || "",
      image: category.image || "",
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/admin/categories/${id}`);
      await fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);

      alert(error.response?.data?.error || "Failed to delete category");
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      slug: "",
      image: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* ADD / EDIT CATEGORY */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Sofa"
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="sofa"
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/sofa.jpg"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Category"
                  : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CATEGORY LIST */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Categories
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <Table headers={["Image", "Name", "Slug", "Status", "Actions"]}>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No categories
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {/* IMAGE */}
                  <td className="px-4 py-3">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>

                  {/* NAME */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    {c.name}
                  </td>

                  {/* SLUG */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {c.slug}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(c)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded mr-2 hover:bg-blue-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
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

export default AdminCategories;
