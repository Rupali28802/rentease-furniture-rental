import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  const isLiked = wishlist.some(
    (item) => item.product && item.product._id === product._id,
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Gallery */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-contain mb-4"
          />
          {product.gallery?.length > 0 && (
            <div className="flex gap-3">
              {product.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="gallery"
                  className="w-20 h-20 object-contain border rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg font-semibold mb-2">
            ₹{product.pricePerMonth}/month
          </p>
          <p className="text-sm text-gray-600 mb-2">
            + Deposit ₹{product.deposit}
          </p>
          <p className="text-yellow-500 mb-2">
            ★ {product.averageRating?.toFixed(1)}
          </p>

          <button
            onClick={() => toggleWishlist(product._id)}
            className={`px-4 py-2 rounded ${isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}
          >
            {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
