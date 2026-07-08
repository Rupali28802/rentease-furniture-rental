import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../../api/axios";

export default function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (!rating || !comment) return alert("Please add rating and comment");
    try {
      const res = await api.post(`/reviews/${productId}`, { rating, comment });
      onReviewAdded(res.data.review);
      setRating(0);
      setComment("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="border rounded p-4 mb-6 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Write a Review</h4>
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
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full border rounded p-2 text-sm"
      />
      <button
        onClick={submitReview}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
}
