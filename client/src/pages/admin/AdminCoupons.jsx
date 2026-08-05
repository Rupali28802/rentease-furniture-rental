import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/coupons")
      .then((res) => setCoupons(res.data.coupons))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Coupons
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table headers={["Code", "Type", "Value", "Used", "Expiry"]}>
          {coupons.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No coupons
              </td>
            </tr>
          ) : (
            coupons.map((c) => (
              <tr
                key={c._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {c.code}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {c.discountType}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {c.discountType === "percentage"
                    ? `${c.discountValue}%`
                    : `₹${c.discountValue}`}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {c.usedCount} / {c.usageLimit}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(c.expiry).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </Table>
      )}
    </div>
  );
};

export default AdminCoupons;
