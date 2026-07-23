
import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) =>
            item.product ? (
              <div
                key={item.product._id}
                className="bg-white shadow rounded-lg p-4 relative hover:shadow-md transition"
              >
                {/* Heart toggle */}
                <button
                  onClick={() => toggleWishlist(item.product._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Remove from wishlist"
                >
                  <FaHeart />
                </button>

                {/* Image */}
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name || "Product"}
                  className="w-full h-32 object-contain mb-3"
                />

                {/* Info */}
                <h3 className="text-gray-800 font-semibold text-sm mb-1">
                  {item.product.name || "Unnamed Product"}
                </h3>
                <p className="text-black font-bold text-sm">
                  ₹{item.product.pricePerMonth ?? "--"}
                  <span className="text-gray-600 font-normal">/month</span>
                </p>
                <p className="text-gray-600 text-xs">
                  +Deposit ₹{item.product.deposit ?? "--"}
                </p>
              </div>
            ) : null,
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No items in wishlist</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
