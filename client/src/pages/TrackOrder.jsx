import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import {
  FaChevronLeft,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruck,
  FaRupeeSign,
} from "react-icons/fa";

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

// Order progression steps for the tracking timeline
const ORDER_STEPS = ["pending", "confirmed", "shipped", "delivered"];

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatMoney = (val) => Number(val || 0).toLocaleString("en-IN");

  // Determine current step index for the timeline
  const currentStep = order ? ORDER_STEPS.indexOf(order.status) : -1;
  const isCancelled = order?.status === "cancelled";

  if (loading)
    return <p className="text-center text-gray-500 py-16">Loading order...</p>;

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <FaBoxOpen className="mx-auto text-green-600 text-5xl mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Order not found</p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full border bg-white hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Track Order
          </h1>
          <p className="text-sm text-gray-500">
            Order #<span className="font-semibold">{order._id}</span>
          </p>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusStyles[order.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status?.toUpperCase()}
        </span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            paymentStyles[order.paymentStatus] || "bg-gray-100 text-gray-800"
          }`}
        >
          Payment: {order.paymentStatus?.toUpperCase()}
        </span>
        {order.trackingId && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            Tracking: {order.trackingId}
          </span>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Progress
        </h2>

        {isCancelled ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4">
            This order was cancelled.
          </div>
        ) : (
          <div className="flex items-center w-full">
            {ORDER_STEPS.map((step, idx) => {
              const isActive = idx <= currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isActive ? "✓" : idx + 1}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium capitalize ${
                        isCurrent
                          ? "text-green-700"
                          : isActive
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {idx < ORDER_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        idx < currentStep ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Activity log timeline */}
        {order.activityLog?.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Activity History
            </h3>
            <div className="space-y-3">
              {[...order.activityLog].reverse().map((log, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm text-gray-800 capitalize">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(log.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
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
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <p className="text-sm text-gray-500">
            {order.items?.length || 0} item(s)
          </p>
          <p className="flex items-center font-bold text-gray-800">
            <FaRupeeSign className="mr-1 text-green-600" />
            {formatMoney(order.totalAmount)}
          </p>
        </div>
      </div>

      {/* Delivery details */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Delivery Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-green-600 mt-1" />
            <div>
              <p className="text-gray-500">Delivery Date</p>
              <p className="font-medium text-gray-800">
                {formatDate(order.items?.[0]?.deliveryDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-green-600 mt-1" />
            <div>
              <p className="text-gray-500">Return Date</p>
              <p className="font-medium text-gray-800">
                {formatDate(order.items?.[0]?.returnDate)}
              </p>
            </div>
          </div>
          {order.deliverySlot && (
            <div className="flex items-start gap-3">
              <FaTruck className="text-green-600 mt-1" />
              <div>
                <p className="text-gray-500">Delivery Slot</p>
                <p className="font-medium text-gray-800">
                  {order.deliverySlot}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-green-600 mt-1" />
            <div>
              <p className="text-gray-500">Delivery Address</p>
              <p className="font-medium text-gray-800">
                {order.addresses?.[0]?.firstName}{" "}
                {order.addresses?.[0]?.lastName}
                <br />
                {order.addresses?.[0]?.street}, {order.addresses?.[0]?.city},{" "}
                {order.addresses?.[0]?.state} - {order.addresses?.[0]?.pincode}
                <br />
                {order.addresses?.[0]?.mobile}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
