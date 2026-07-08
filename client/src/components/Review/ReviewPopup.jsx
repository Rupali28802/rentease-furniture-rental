import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../../api/axios";

export default function ReviewPopup({ productId, onClose, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (!rating || !comment) return alert("Please add rating and comment");
    try {
      const res = await api.post(`/reviews/${productId}`, { rating, comment });
      onReviewAdded(res.data.review);
      onClose(); // close popup after submit
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96 relative">
        {/* Cross button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">Rate & Review Product</h3>

        {/* Rating */}
        <div className="flex gap-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded p-2 text-sm"
        />

        {/* Submit */}
        <button
          onClick={submitReview}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
