

import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products?limit=6")
      .then((res) => setProducts(res.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <section className="w-full px-6 mx-auto">
      {/* Heading + View All */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-black">Top Picks for You</h2>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-green-600 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((p) => {
          const isLiked = wishlist.some(
            (item) => item.product && item.product._id === p._id,
          );

          return (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="group p-4 rounded-xl shadow text-black transition flex flex-col relative cursor-pointer"
            >
              {/* Wishlist Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p._id);
                }}
                className={`absolute top-3 right-3 transition ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FaHeart />
              </button>

              {/* Image */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-[100%] h-30 object-contain mb-3 m-auto "
                />
              )}

              {/* Name */}
              <h3 className="text-sm font-semibold mb-1">{p.name}</h3>

              {/* Price + Deposit */}
              <p className="text-xs opacity-80">₹{p.pricePerMonth}/month</p>

              {/* Rating */}
              <p className="text-xs text-yellow-600 mt-1">
                ★ {p.averageRating?.toFixed(1)}
              </p>

              <p className="text-xs opacity-80">+ Deposit ₹{p.deposit}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductSection;
