import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    alert(`Order marked as ${status}`);
    load();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Orders
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Order ID", "Customer", "Total", "Status", "Action"]}>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No orders
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr
                key={o._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 truncate max-w-[130px]">
                  {o._id}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {o.user?.name || "N/A"}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                  ₹{o.totalAmount?.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded text-sm px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {[
                      "pending",
                      "confirmed",
                      "shipped",
                      "delivered",
                      "active",
                      "completed",
                      "cancelled",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;
