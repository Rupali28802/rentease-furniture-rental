import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";
import { FaStar } from "react-icons/fa";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api.get("/admin/reviews");
    setReviews(res.data.reviews);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/admin/reviews/${id}`);
    alert("Review deleted");
    load();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Reviews
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Product", "User", "Rating", "Comment", "Action"]}>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No reviews
              </td>
            </tr>
          ) : (
            reviews.map((r) => (
              <tr
                key={r._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {r.product?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {r.user?.name || "N/A"}
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar /> {r.rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                  {r.comment || "-"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
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
  );
};

export default AdminReviews;
