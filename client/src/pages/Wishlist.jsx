import React from 'react';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage = () => {
    const {wishlist} = useWishlist()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   {wishlist.length > 0 ?(
    wishlist.map((item)=>(
        <div key={item.product._id} className='bg-white shadow rounded-lg p-4'>
            <img src={item.product.image} alt={item.product.name} className='w-full h-32 object-contain mb-3'/>
            <h3 className='text-gray-800 font-semibold text-sm mb-1'>{item.product.name}</h3>
            <p className='text-black font-bold text-sm'>
                ₹{item.product.pricePerMonth}<span className='text-gray-600 font-normal'>/month</span>
            </p>
            <p className='text-gray-600 text-xs'>+Deposit ₹{item.product.deposit}</p>
        </div>
    ))
   )
:(
    <p className='text-gray-500'>No items in wishlist</p>
)
   }
      </div>
    </div>
  );
}

export default WishlistPage
