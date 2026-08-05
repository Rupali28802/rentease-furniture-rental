import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/payments")
      .then((res) => setPayments(res.data.payments))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Payments
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table
          headers={["Payment ID", "Customer", "Amount", "Method", "Status"]}
        >
          {payments.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No payments yet
              </td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 truncate max-w-[130px]">
                  {p._id}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.user?.name || "N/A"}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                  ₹{p.amount?.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.method}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : p.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.status}
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

export default AdminPayments;
