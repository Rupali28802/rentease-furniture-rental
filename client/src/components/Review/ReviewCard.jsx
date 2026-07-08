import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm bg-white">
      <div className="flex items-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="text-sm text-gray-600">{review.rating}/5</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">
          {review.user?.name || "Anonymous"}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-gray-700">{review.comment}</p>
      {review.verified && (
        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Verified Purchase
        </span>
      )}
    </div>
  );
}
