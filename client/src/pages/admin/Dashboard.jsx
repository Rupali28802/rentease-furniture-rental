import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Card from "../../components/admin/Card";
import Table from "../../components/admin/Table";
import LineChart from "../../components/admin/LineChart";
import DonutChart from "../../components/admin/DonutChart";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaRupeeSign,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [sales, setSales] = useState({ labels: [], revenue: [] });
  const [ordersData, setOrdersData] = useState({
    orders: [],
    statusBreakdown: {},
  });
  const [activity, setActivity] = useState({ activities: [] });
  const [topProducts, setTopProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ov, sale, ord, act, top] = await Promise.all([
          api.get("/admin/overview"),
          api.get("/admin/sales"),
          api.get("/admin/orders"),
          api.get("/admin/activity"),
          api.get("/admin/top-products"),
        ]);
        setOverview(ov.data);
        setSales(sale.data);
        setOrdersData(ord.data);
        setActivity(act.data);
        setTopProducts(top.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const counts = overview?.counts || {};
  const changes = overview?.changes || {};
  const statusLabels = Object.keys(ordersData.statusBreakdown || {});
  const statusValues = Object.values(ordersData.statusBreakdown || {});

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card
          title="Total Users"
          value={counts.users ?? 0}
          change={changes.users}
          icon={<FaUsers />}
        />
        <Card
          title="Total Products"
          value={counts.products ?? 0}
          change={changes.products}
          icon={<FaBoxOpen />}
          color="text-blue-600"
          iconBg="bg-blue-100 dark:bg-blue-900/40"
        />
        <Card
          title="Total Orders"
          value={counts.orders ?? 0}
          change={changes.orders}
          icon={<FaClipboardList />}
          color="text-purple-600"
          iconBg="bg-purple-100 dark:bg-purple-900/40"
        />
        <Card
          title="Total Revenue"
          value={`₹${(counts.revenue ?? 0).toLocaleString()}`}
          change={changes.revenue}
          icon={<FaRupeeSign />}
          color="text-amber-500"
          iconBg="bg-amber-100 dark:bg-amber-900/40"
        />
        <Card
          title="Total Bookings"
          value={counts.bookings ?? 0}
          icon={<FaCalendarCheck />}
          color="text-teal-600"
          iconBg="bg-teal-100 dark:bg-teal-900/40"
        />
        <Card
          title="Total Reviews"
          value={counts.reviews ?? 0}
          icon={<FaStar />}
          color="text-pink-600"
          iconBg="bg-pink-100 dark:bg-pink-900/40"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            Sales Overview
          </h3>
          <LineChart labels={sales.labels} data={sales.revenue} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            Orders by Status
          </h3>
          {statusLabels.length > 0 ? (
            <DonutChart data={statusValues} labels={statusLabels} />
          ) : (
            <p className="text-gray-500 text-sm py-10 text-center">
              No order data yet
            </p>
          )}
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-3">
            {activity.activities?.length === 0 ? (
              <li className="text-sm text-gray-500">No activity yet</li>
            ) : (
              activity.activities.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0"
                >
                  <span
                    className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      a.type === "ORDER"
                        ? "bg-green-500"
                        : a.type === "PAYMENT"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                    }`}
                  />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">{a.text}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(a.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            Recent Orders
          </h3>
          <Table headers={["Order ID", "Customer", "Items", "Total", "Status"]}>
            {ordersData.orders?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              ordersData.orders.slice(0, 6).map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
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
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
          Top Products
        </h3>
        <Table headers={["Product", "Orders", "Revenue"]}>
          {topProducts.products?.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                No data yet
              </td>
            </tr>
          ) : (
            topProducts.products.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.ordersCount}
                </td>
                <td className="px-4 py-3 font-medium text-green-600">
                  ₹{p.revenue?.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
