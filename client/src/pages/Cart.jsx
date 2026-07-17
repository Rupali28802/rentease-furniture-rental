import React from 'react'
import { useCart } from '../context/CartContext';



const Cart = () => {
    const {cartItems,removeFromCart,updateCart,clearCart} = useCart();

   const grandTotal = cartItems.reduce(
    (acc,item)=>acc+item.totalRent+item.deposit,0
   )

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">₹{item.product.price}</p>
                <p className="text-xs text-gray-500">
                  Deposit: ₹{item.deposit}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  onChange={(e) =>
                    handleQtyChange(item._id, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total:₹{total}</h2>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart
