import React from 'react'
import { useCart } from '../context/CartContext';



const Cart = () => {
    const {cartItems,removeFromCart,updateCart,clearCart} = useCart();

    const monthlyRent = cartItems.reduce((acc,item)=>acc+item.totalRent,0);
    const deposit = cartItems.reduce((acc,item)=>acc+item.deposit,0)
    const grandTotal = monthlyRent + deposit


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white p-4 rounded shadow"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-600">
                      ₹{item.product.pricePerMonth}/month
                    </p>
                    <p className="text-xs text-gray-500">
                      Tenure:{item.tenure}months
                    </p>
                    <p className="text-xs text-gray-500">
                      Delivery:{new Date(item.deliveryDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Deposit:₹{item.deposit}
                    </p>
                  </div>
                  {/* Quantity + Remove */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded">
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
                          updateCart(item._id, parseInt(e.target.value))
                        }
                        className="w-16 text-center border-l border-r"
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
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Cart Summer */}
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
              <div className="space-y-2 text-gray-700">
                <p>Monthly Rent: ₹{monthlyRent}</p>
                <p>Refundable Deposit: ₹{deposit}</p>
                <p>Delivery Charge: Free</p>
                <p className="font-bold text-lg">
                  Total Payable Today: ₹{grandTotal}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart
