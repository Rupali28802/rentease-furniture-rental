// src/components/home/ProductSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products?limit=6")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));

    // fetch wishlist
    axios
      .get("http://localhost:5000/api/wishlist")
      .then((res) => setWishlist(res.data.items.map((i) => i.product)))
      .catch((err) => console.error(err));
  }, []);

  const toggleWishlist = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        // remove from wishlist
        await axios.delete("http://localhost:5000/api/wishlist/delete", {
          data: { productId },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        // add to wishlist
        await axios.post("http://localhost:5000/api/wishlist/add", {
          productId,
        });
        setWishlist([...wishlist, productId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full px-6 mx-auto">
      {/* Heading + View All */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-black">Top Picks for You</h2>
        <button className="text-green-600 font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="group p-4 rounded-xl shadow text-black transition flex flex-col relative"
          >
            {/* Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(p._id)}
              className={`absolute top-3 right-3 transition ${
                wishlist.includes(p._id)
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
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
            <p className="text-xs text-yellow-400 mt-1">
              ★ {p.averageRating?.toFixed(1)}
            </p>

            {/* Deposite */}

            <p className="text-xs opacity-80">+ Deposit ₹{p.deposit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
