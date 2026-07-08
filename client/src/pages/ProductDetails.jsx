
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext"; 
import ReviewForm from "../components/Review/ReviewForm";
import ReviewCard from "../components/Review/ReviewCard";


export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedTenure, setSelectedTenure] = useState(null);

  const { wishlist, toggleWishlist } = useWishlist(); 

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      const prod = res.data.product || res.data;
      setProduct(prod);
      setMainImage(prod.image);

       api.get(`/reviews/${id}`).then((res) => {
         setProduct((prev) => ({ ...prev, reviews: res.data }));
       });
      //  Related products based on category
      api
        .get(`/products?category=${prod.category}&limit=4`)
        .then((res) => setRelatedProducts(res.data.products || []));
    });
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  //  check liked status from context
  const isLiked = wishlist.some(
    (item) => item.product && item.product._id === product._id,
  );

  return (
    <div className="px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Gallery */}
        <div className="relative">
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
              {product.discount}% OFF
            </span>
          )}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded shadow"
          />
          <div className="flex gap-3 mt-4">
            {[product.image, ...(product.gallery || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="gallery"
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-contain cursor-pointer border ${
                  mainImage === img ? "border-green-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={() => toggleWishlist(product._id)}
              className={`p-2 rounded-full ${
                isLiked ? "text-red-500" : "text-gray-400"
              }`}
            >
              <FaHeart size={22} />
            </button>
          </div>

          <p className="text-gray-600 mt-2 text-lg font-semibold">
            ₹{product.pricePerMonth}/month
          </p>
          <p className="text-sm text-yellow-500 mt-1">
            ★ {product.averageRating}
          </p>
          <p className="text-sm mt-2">+ Deposit ₹{product.deposit}</p>
          <p className="text-sm mt-2">{product.description}</p>

          {/* Tenure Options */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Select Tenure</h4>
            <div className="flex gap-3 flex-wrap">
              {product.tenureOptions?.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTenure(t)}
                  className={`px-4 py-2 border rounded ${
                    selectedTenure === t
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {t} months
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Add to Cart
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Rent Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-700 space-y-1">
            <p>Condition: {product.condition}</p>
            <p>
              Stock: {product.stock} (Currently rented:{" "}
              {product.currentlyRented})
            </p>
            <p>Delivery Charge: ₹{product.deliveryCharge}</p>
            <p>Return Policy: {product.returnPolicy}</p>
            <p>Warranty: {product.warranty}</p>
            <p>Max Tenure: {product.maxTenure} months</p>
            <p>Renewable: {product.renewable ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      {/* Reviews + Rating */}
      {/* Reviews + Rating */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">
          Customer Reviews (Average ★ {product.averageRating})
        </h3>

        <ReviewForm
          productId={product._id}
          onReviewAdded={(rev) =>
            setProduct({
              ...product,
              reviews: [...(product.reviews || []), rev],
            })
          }
        />

        {product.reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          product.reviews.map((rev) => (
            <ReviewCard key={rev._id} review={rev} />
          ))
        )}
      </div>

      {/* Related Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((rp) =>
          rp?._id ? (
            <div
              key={rp._id}
              className="p-4 rounded shadow hover:shadow-lg bg-white"
            >
              <img
                src={rp.image}
                alt={rp.name}
                className="w-full h-32 object-contain mb-2 cursor-pointer"
                onClick={() => navigate(`/product/${rp._id}`)}
              />
              <h4 className="text-sm font-medium">{rp.name}</h4>
              <p className="text-xs text-gray-600">₹{rp.pricePerMonth}/month</p>
              <p className="text-xs text-gray-600">Deposit: ₹{rp.deposit}</p>
              <p className="text-xs text-yellow-500">★ {rp.averageRating}</p>

              {/* Tenure Options */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {rp.tenureOptions?.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 border rounded text-xs bg-gray-100"
                  >
                    {t}m
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-green-600 text-white text-xs py-1 rounded hover:bg-green-700">
                  Add to Cart
                </button>
                <button className="flex-1 bg-blue-600 text-white text-xs py-1 rounded hover:bg-blue-700">
                  Rent Now
                </button>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
