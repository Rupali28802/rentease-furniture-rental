import React, { useState } from "react";
import { useAddress } from "../context/AddressContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { selectedAddress } = useAddress();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect Rent Now mode (comes from ProductDetails "Rent Now" button)
  const isRentNow = location.state?.rentNow;

  // Build the list of items to checkout.
  // Rent Now  -> ONLY the selected product
  // Cart      -> all cart items
  const checkoutItems = isRentNow
    ? [
        {
          product: location.state.product,
          tenure: location.state.tenure,
          quantity: location.state.quantity || 1,
          deposit: location.state.deposit,
        },
      ]
    : cartItems;

  // Calculate totals using checkoutItems
  const monthlyRent = checkoutItems.reduce(
    (acc, item) =>
      acc + item.product.pricePerMonth * item.tenure * (item.quantity || 1),
    0,
  );
  const deposit = checkoutItems.reduce((acc, item) => acc + item.deposit, 0);
  const totalPayable = monthlyRent + deposit; // Full amount payable

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address!");
      return;
    }

    setLoading(true);
    try {
      // Build order payload
      const orderPayload = {
        addressId: selectedAddress._id,
        rentNow: isRentNow,
      };

      if (isRentNow) {
        // Rent Now -> send only the selected product details
        const selectedProduct = location.state.product;
        orderPayload.productId = selectedProduct._id;
        orderPayload.tenure = location.state.tenure;
        orderPayload.quantity = location.state.quantity || 1;
      }

      // 1️⃣ Create order on backend
      const orderRes = await api.post("/orders", orderPayload);

      const { razorpayOrderId, amount, currency, orderId, razorpayKeyId } =
        orderRes.data;

      // 2️⃣ Razorpay checkout
      const options = {
        // Use key from backend response (preferred), fallback to env var
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "RentEase",
        description: "Rental Checkout",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              ...response,
              orderId,
              userId: user?._id,
              rentNow: isRentNow,
            });

            // Clear cart ONLY for cart checkout.
            // Rent Now checkout should NOT clear the cart.
            if (!isRentNow) {
              await clearCart();
            }

            alert("Payment successful!");
            navigate("/order-success");
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            alert("Payment verification failed. Redirecting to cart!");
            // Payment verification failed -> redirect to cart (cart is preserved)
            if (!isRentNow) {
              navigate("/cart");
            }
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.mobile || "",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);

      // If the user closes the Razorpay modal without paying,
      // redirect back to the cart page (cart is preserved).
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Redirecting to cart!");
        if (!isRentNow) {
          navigate("/cart");
        }
      });

      // If the user closes/dismisses the Razorpay modal without paying,
      // redirect back to the cart page (cart is preserved).
      rzp.on("modal.close", function () {
        console.warn("Razorpay modal closed without payment");
        alert("Payment cancelled. Redirecting to cart!");
        if (!isRentNow) {
          navigate("/cart");
        }
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Checkout failed! Your cart items are preserved.");

      // If checkout fails, redirect back to the cart page so the user
      // can retry without losing their cart items.
      if (!isRentNow) {
        navigate("/cart");
      }
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
            <p className="font-semibold">
              {selectedAddress.firstName} {selectedAddress.lastName}
            </p>
            <p>{selectedAddress.street}</p>
            <p>
              {selectedAddress.city}, {selectedAddress.state} -{" "}
              {selectedAddress.pincode}
            </p>
            <p>{selectedAddress.mobile}</p>
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
        {checkoutItems.map((item) => (
          <div
            key={item._id || item.product?._id}
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
