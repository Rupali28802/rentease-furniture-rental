import React from 'react'
import { useCart } from '../context/CartContext';



const Cart = () => {
    const {cartItems,removeFromCart,updateCart,clearCart} = useCart();

    const monthlyRent = cartItems.reduce((acc,item)=>acc+item.totoalRent,0);
    const deposit = cartItems.reduce((acc,item)=>acc+item.deposite,0)
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
                  className="flex item-center justify-between bg-white p-4 rounded shadow"
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
                      Delivery:{new Date(item.deiveryDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">Deposite:₹{item.deposite}</p>
                  </div>
                  <div className="">
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart
