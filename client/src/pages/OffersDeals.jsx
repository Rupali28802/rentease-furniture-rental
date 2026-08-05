import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { FaHeart, FaPercent } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const OffersDeals = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTenure, setSelectedTenure] = useState({});
  const { wishlist, toggleWishlist } = useWishlist();
  const [rentNowProduct, setRentNowProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch discounted products
        const productsRes = await api.get("/products", {
          params: { discounted: true, limit: 20 },
        });
        setProducts(productsRes.data.products || []);

        // Fetch promo banners
        const bannersRes = await api.get("/promo-banners");
        const bannerData =
          bannersRes.data?.data ||
          bannersRes.data?.banners ||
          (Array.isArray(bannersRes.data) ? bannersRes.data : []);
        setBanners(Array.isArray(bannerData) ? bannerData : []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getBannerLink = (banner) => {
    // Prefer explicit buttonLink if provided
    if (banner.buttonLink) return banner.buttonLink;
    // Otherwise navigate based on banner type
    return banner.type === "newArrival" ? "/new-arrivals" : "/offers";
  };

  const handleAddToCart = async (productId, tenure) => {
    try {
      if (!tenure) {
        alert("Please select a tenure first");
        return;
      }
      await addToCart(productId, tenure);
      navigate("/cart");
      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleRentNow = (product, tenure) => {
    if (!tenure) {
      alert("Please select a tenure first");
      return;
    }

    // Pass the selected product via navigate state so Checkout
    // displays ONLY this product (not cart items).
    navigate("/checkout", {
      state: {
        rentNow: true,
        product,
        tenure,
        quantity: 1,
        deposit: product.deposit,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <FaPercent className="text-3xl" />
          <div>
            <h1 className="text-3xl md:text-3xl font-bold">Offers & Deals</h1>
            <p className="text-white/90 mt-1">
              Grab exclusive discounts on your favorite furniture rentals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Promo Banners */}
        {banners.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="relative h-[180px] rounded-lg overflow-hidden bg-[#f5f5f5]"
              >
                {banner.image && (
                  <img
                    src={`http://localhost:5000${banner.image}`}
                    alt={banner.title}
                    className="absolute right-0 top-0 h-full w-[45%] object-cover"
                  />
                )}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-[55%]">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-gray-800 mt-2 text-sm">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.description && (
                    <p className="text-gray-500 text-sm mt-1">
                      {banner.description}
                    </p>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(getBannerLink(banner));
                    }}
                    className="mt-5 w-fit px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-16">Loading offers...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            No offers available right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((p) => {
              const isLiked = wishlist.some(
                (item) => item.product && item.product._id === p._id,
              );
              const discountedPrice = p.discount
                ? p.pricePerMonth - (p.pricePerMonth * p.discount) / 100
                : p.pricePerMonth;

              return (
                <div
                  key={p._id}
                  className="group p-4 rounded-xl bg-white shadow hover:shadow-lg transition flex flex-col relative cursor-pointer"
                >
                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p._id);
                    }}
                    className={`absolute top-3 right-3 transition cursor-pointer ${
                      isLiked ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <FaHeart />
                  </button>

                  {/* Discount badge */}
                  {p.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {p.discount}% OFF
                    </span>
                  )}

                  {/* Image */}
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => navigate(`/product/${p._id}`)}
                      className="w-full h-32 object-contain mb-3 m-auto cursor-pointer"
                    />
                  )}

                  {/* Name */}
                  <h3
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="text-sm font-semibold mb-1 cursor-pointer"
                  >
                    {p.name}
                  </h3>

                  {/* Price */}
                  {p.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-400 line-through">
                        ₹{p.pricePerMonth}
                      </p>
                      <p className="text-sm font-bold text-red-600">
                        ₹{discountedPrice.toFixed(0)}/month
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-600">
                      ₹{p.pricePerMonth}/month
                    </p>
                  )}

                  {/* Rating */}
                  <p className="text-xs text-yellow-600 mt-1">
                    ★ {p.averageRating?.toFixed(1) || "0.0"}
                  </p>

                  <p className="text-xs text-gray-500">
                    + Deposit ₹{p.deposit}
                  </p>

                  {/* Tenure Selection */}
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-500 mb-1">
                      Select Tenure:
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {p.tenureOptions?.map((t) => (
                        <button
                          key={t}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTenure((prev) => ({
                              ...prev,
                              [p._id]: t,
                            }));
                          }}
                          className={`px-2 py-1 text-xs border rounded ${
                            selectedTenure[p._id] === t
                              ? "bg-green-600 text-white"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          {t}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p._id, selectedTenure[p._id]);
                      }}
                      className="flex-1 bg-green-600 text-white text-xs py-2 rounded cursor-pointer border border-transparent hover:border-green-600 hover:text-black hover:bg-white transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRentNow(p, selectedTenure[p._id]);
                      }}
                      className="flex-1 border border-green-600 text-xs text-black py-2 rounded shadow-sm hover:bg-green-600 hover:text-white transition"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersDeals;
