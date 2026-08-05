import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/categories")
      .then((res) => setCategories(res.data.categories))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Categories
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Name", "Slug", "Status"]}>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                No categories
              </td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr
                key={c._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {c.slug}
                </td>
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
              </tr>
            ))
          )}
        </Table>
      )}
    </div>
  );
};

export default AdminCategories;
