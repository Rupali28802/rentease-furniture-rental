import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState(null);

  const load = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewActivity = async (id) => {
    try {
      const res = await api.get(`/admin/users/${id}/activity`);
      setActivity(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load user activity");
    }
  };

  const toggleBlock = async (id) => {
    try {
      const res = await api.put(`/admin/users/${id}/block`);
      alert(res.data.message);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  const updateRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      alert(`Role updated to ${role}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          All Users
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <Table
            headers={[
              "Name",
              "Email",
              "Mobile",
              "Role",
              "Status",
              "Joined",
              "Actions",
            ]}
          >
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No users
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {u.email}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {u.mobile}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      className={`border border-gray-300 dark:border-gray-600 rounded text-sm px-2 py-1 bg-white dark:bg-gray-700 ${
                        u.role === "admin"
                          ? "text-green-700 font-medium"
                          : u.role === "vendor"
                            ? "text-purple-700 font-medium"
                            : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <option value="user">user</option>
                      <option value="vendor">vendor</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.isBlocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewActivity(u._id)}
                        className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        Activity
                      </button>
                      <button
                        onClick={() => toggleBlock(u._id)}
                        className={`text-xs px-2 py-1 rounded ${
                          u.isBlocked
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {u.isBlocked ? "Activate" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </Table>
        )}
      </div>

      {/* User Activity Modal */}
      {activity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                User Activity - {activity.user?.name}
              </h3>
              <button
                onClick={() => setActivity(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {activity.rentals?.length || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Active Rentals
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {activity.orderHistory?.length || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Orders
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {activity.reviews?.length || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Reviews
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {activity.payments?.length || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Payments
                </p>
              </div>
            </div>

            {/* Rental History */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                Rental/Order History
              </h4>
              {activity.orderHistory?.length === 0 ? (
                <p className="text-sm text-gray-500">No orders found</p>
              ) : (
                <div className="space-y-2">
                  {activity.orderHistory?.map((o) => (
                    <div
                      key={o._id}
                      className="flex justify-between items-center border dark:border-gray-600 rounded p-2 text-sm"
                    >
                      <div>
                        <p className="text-gray-800 dark:text-white font-medium truncate max-w-[200px]">
                          {o.items?.[0]?.product?.name || o._id}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700 dark:text-gray-300">
                          ₹{o.totalAmount?.toLocaleString()}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                Reviews
              </h4>
              {activity.reviews?.length === 0 ? (
                <p className="text-sm text-gray-500">No reviews found</p>
              ) : (
                <div className="space-y-2">
                  {activity.reviews?.map((r) => (
                    <div
                      key={r._id}
                      className="border dark:border-gray-600 rounded p-2 text-sm"
                    >
                      <p className="text-gray-800 dark:text-white font-medium">
                        {r.product?.name} - {r.rating}★
                      </p>
                      <p className="text-gray-500">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
