import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaChevronLeft, FaRupeeSign, FaTruck } from "react-icons/fa";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-indigo-100 text-indigo-800",
  active: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  returned: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-orange-100 text-orange-800",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatMoney = (val) => {
    return Number(val || 0).toLocaleString("en-IN");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full border bg-white hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Orders
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-16">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <FaBoxOpen className="mx-auto text-green-600 text-5xl mb-4" />
          <p className="text-gray-600 text-lg">No orders yet</p>
          <p className="text-gray-500 text-sm mt-1">
            When you place an order, it will show up here.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #
                    <span className="font-semibold text-gray-700">
                      {order._id}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {order.status === order.paymentStatus ? (
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        statusStyles[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status?.toUpperCase()}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          statusStyles[order.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status?.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          paymentStyles[order.paymentStatus] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.paymentStatus?.toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item._id || item.product?._id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.product?.name || "Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tenure: {item.tenure} months | Qty: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Rent: ₹{formatMoney(item.totalRent)} | Deposit: ₹
                        {formatMoney(item.deposit)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order total */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 mt-4">
                <p className="text-sm text-gray-500">
                  {order.items?.length || 0} item(s)
                </p>
                <div className="flex items-center gap-4">
                  <p className="flex items-center font-bold text-gray-800">
                    <FaRupeeSign className="mr-1 text-green-600" />
                    {formatMoney(order.totalAmount)}
                  </p>
                  <button
                    onClick={() => navigate(`/orders/track/${order._id}`)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
                  >
                    <FaTruck />
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
