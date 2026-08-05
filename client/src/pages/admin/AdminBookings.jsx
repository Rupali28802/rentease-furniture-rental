import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminBookings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/orders")
      .then((res) => {
        // Bookings = orders in confirmed/active/delivered states
        const active = res.data.orders.filter((o) =>
          ["confirmed", "active", "delivered"].includes(o.status),
        );
        setOrders(active);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Bookings
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Booking ID", "Customer", "Items", "Total", "Status"]}>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No active bookings
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
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {o.items?.length || 0}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                  ₹{o.totalAmount?.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    {o.status}
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

export default AdminBookings;
