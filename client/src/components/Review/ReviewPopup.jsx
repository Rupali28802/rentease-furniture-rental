import ReviewForm from "./ReviewForm";

export default function ReviewPopup({ productId, onClose, onReviewAdded }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Rate & Review Product</h3>
        <ReviewForm productId={productId} onReviewAdded={onReviewAdded} />
      </div>
    </div>
  );
}
