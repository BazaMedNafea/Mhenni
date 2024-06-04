// ReviewAndCommentPage.tsx

import React, { useState } from "react";

interface ReviewAndCommentPageProps {
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean; // Add the isLoading prop with an optional type
}

const ReviewAndCommentPage: React.FC<ReviewAndCommentPageProps> = ({
  onSubmit, // Set a default value for isLoading
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(rating, comment);
    // Reset the form fields after submission
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Leave a Review
      </h2>
      <div className="mb-4">
        <label
          htmlFor="rating"
          className="block text-gray-700 font-semibold mb-2"
        >
          Rating
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`text-2xl cursor-pointer ${
                value <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(value)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-gray-700 font-semibold mb-2"
        >
          Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comment here..."
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
        disabled={!rating || !comment}
      >
        Submit
      </button>
    </div>
  );
};

export default ReviewAndCommentPage;
