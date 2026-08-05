import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/banners")
      .then((res) => setBanners(res.data.banners))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Hero Banners
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Image", "Title", "Subtitle", "Position", "Active"]}>
          {banners.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No banners
              </td>
            </tr>
          ) : (
            banners.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {b.title}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {b.subtitle || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {b.position}
                </td>
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
              </tr>
            ))
          )}
        </Table>
      )}
    </div>
  );
};

export default AdminBanners;
