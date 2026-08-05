import { useState, useEffect } from "react";
import { api } from "../../api/axios";
import { FaTrash, FaCreditCard } from "react-icons/fa";

export default function PaymentForm({ userId, onMessage }) {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({
    type: "card",
    holderName: "",
    number: "",
    expiry: "",
    upiId: "",
  });
  const [loading, setLoading] = useState(false);

  const loadMethods = async () => {
    try {
      const res = await api.get(`/settings/${userId}`);
      setMethods(res.data.paymentMethods || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/settings/payment", form);
      setForm({
        type: "card",
        holderName: "",
        number: "",
        expiry: "",
        upiId: "",
      });
      onMessage("success", "Payment method added!");
      loadMethods();
    } catch (err) {
      onMessage(
        "error",
        err.response?.data?.message || "Could not add payment method",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/settings/payment/${id}`);
    onMessage("success", "Payment method removed");
    loadMethods();
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Add Payment Method
        </h3>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
        </select>
        <input
          name="holderName"
          placeholder="Card Holder Name"
          value={form.holderName}
          onChange={handleChange}
          className={inputCls}
        />
        {form.type === "card" ? (
          <>
            <input
              name="number"
              placeholder="Card Number"
              value={form.number}
              onChange={handleChange}
              className={inputCls}
            />
            <input
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={form.expiry}
              onChange={handleChange}
              className={inputCls}
            />
          </>
        ) : (
          <input
            name="upiId"
            placeholder="UPI ID (e.g. name@upi)"
            value={form.upiId}
            onChange={handleChange}
            className={inputCls}
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Method"}
        </button>
      </form>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
          Saved Methods ({methods.length})
        </h3>
        {methods.length === 0 ? (
          <p className="text-gray-500 text-sm">No payment methods saved yet.</p>
        ) : (
          <div className="space-y-3">
            {methods.map((m) => (
              <div
                key={m._id}
                className="border rounded-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {m.type === "card"
                        ? `${m.holderName} •••• ${m.number?.slice(-4)}`
                        : m.upiId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {m.type === "card" ? `Expires ${m.expiry}` : "UPI"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
