import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackProps {
  liked: boolean;
  disliked: boolean;
  handleLike: () => void;
  handleDislike: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({
  liked,
  disliked,
  handleLike,
  handleDislike,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Feedback:</h2>
      <div className="flex">
        <button
          onClick={handleLike}
          className={`flex items-center py-2 px-4 rounded-lg mr-2 hover:bg-gray-200 transition-colors ${
            liked ? "text-gray-500" : ""
          }`}
        >
          <ThumbsUp className="w-6 h-6 mr-2" /> Like
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors ${
            disliked ? "text-gray-500" : ""
          }`}
        >
          <ThumbsDown className="w-6 h-6 mr-2" /> Dislike
        </button>
      </div>
    </div>
  );
};

export default Feedback;
