import React, { useState } from "react";
import { useAddress } from "../context/AddressContext";
import { useCart } from "../context/CartContext";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { selectedAddress } = useAddress();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const monthlyRent = cartItems.reduce(
    (acc, item) => acc + item.product.pricePerMonth * item.tenure,
    0,
  );
  const deposit = cartItems.reduce((acc, item) => acc + item.deposit, 0);
  const totalPayable = deposit; // Payable today = deposit only

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address!");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Create order on backend
      const orderRes = await api.post("/orders/create", {
        address: selectedAddress,
        items: cartItems,
      });

      const { razorpayOrderId, amount, currency, orderId } = orderRes.data;

      // 2️⃣ Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "RentEase",
        description: "Rental Checkout",
        order_id: razorpayOrderId,
        handler: async function (response) {
          await api.post("/payment/verify", { ...response, orderId });
          alert("Payment successful!");
          navigate("/order-success");
        },
        prefill: {
          name: "Rupali",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Delivery Address */}
      <div className="border rounded-md p-4 shadow col-span-1">
        <h2 className="text-lg font-bold mb-2">Delivery Address</h2>
        {selectedAddress ? (
          <div>
            <p className="font-semibold">{selectedAddress.name}</p>
            <p>{selectedAddress.street}</p>
            <p>
              {selectedAddress.city}, {selectedAddress.state} -{" "}
              {selectedAddress.pincode}
            </p>
            <p>{selectedAddress.phone}</p>
            <button
              onClick={() => navigate("/profile/addresses")}
              className="text-blue-600 mt-2 hover:underline"
            >
              Change
            </button>
          </div>
        ) : (
          <p className="text-red-500">No address selected</p>
        )}
      </div>

      {/* CENTER: Payment Summary */}
      <div className="border rounded-md p-4 shadow col-span-1">
        <h2 className="text-lg font-bold mb-2">Payment Summary</h2>
        <p>Monthly Rent: ₹{monthlyRent}</p>
        <p>Refundable Deposit: ₹{deposit}</p>
        <p>
          Delivery Charge: <span className="text-green-700">FREE</span>
        </p>
        <p className="font-semibold">Total Payable Today: ₹{totalPayable}</p>

        {/* Payment Options */}
        <div className="mt-4 space-y-2">
          <label className="block">
            <input type="radio" name="payment" defaultChecked /> UPI / Card /
            Net Banking
          </label>
          <label className="block">
            <input type="radio" name="payment" /> Credit / Debit Card
          </label>
          <label className="block">
            <input type="radio" name="payment" /> Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>

      {/* RIGHT: Order Details */}
      <div className="border rounded-md p-4 shadow col-span-1">
        <h2 className="text-lg font-bold mb-2">Order Details</h2>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-4 border-b pb-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.product.pricePerMonth}/month | Tenure: {item.tenure}{" "}
                  Months
                </p>
              </div>
            </div>
            <p className="font-medium">₹{item.deposit}</p>
          </div>
        ))}
        <p className="font-semibold text-right mt-2">Total: ₹{totalPayable}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;
