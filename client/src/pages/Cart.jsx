import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateCart, clearCart, refreshCart } =
    useCart();
  const navigate = useNavigate();

  // Re-sync with backend whenever the cart page mounts
  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Agar backend totalRent nahi bhej raha to frontend me calculate karo
  const monthlyRent = cartItems.reduce((acc, item) => {
    const price = item.product?.pricePerMonth || 0;
    return acc + price * (item.tenure || 0);
  }, 0);

  const deposit = cartItems.reduce((acc, item) => acc + (item.deposit || 0), 0);
  const grandTotal = monthlyRent + deposit;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          My Cart ({cartItems.length})
        </h1>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-green-700 px-4 py-2 rounded hover:underline"
          >
            Remove All
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
          <div className="md:col-span-7 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center gap-4"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-[70%] h-32 sm:w-32 sm:h-32 md:w-24 md:h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.product?.name}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.product?.pricePerMonth}/month
                  </p>
                  <p className="text-xs text-gray-500">
                    Deposit: ₹{item.deposit}
                  </p>
                  <p className="text-xs text-gray-500">
                    Tenure: {item.tenure} months
                  </p>
                  <p className="text-xs text-gray-500">
                    Delivery:{" "}
                    {item.deliveryDate
                      ? new Date(item.deliveryDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="w-fit flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() =>
                      updateCart(item._id, Math.max(1, item.quantity - 1))
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateCart(item._id, Number(e.target.value))
                    }
                    className="w-12 text-center outline-none"
                  />
                  <button
                    onClick={() => updateCart(item._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-28 h-10 sm:w-[18%] sm:py-2 bg-green-600 text-white md:px-3 md:py-1 rounded hover:bg-green-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md md:sticky md:top-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
              <div className="space-y-2 text-gray-700">
                <p>Monthly Rent: ₹{monthlyRent}</p>
                <p>Refundable Deposit: ₹{deposit}</p>
                <p>
                  Delivery Charge: <span className="text-green-700">Free</span>
                </p>
                <p className="font-bold text-lg">
                  Total Payable Today: ₹{grandTotal}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-[60%] sm:w-[30%] md:w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
