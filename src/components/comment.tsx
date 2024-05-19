import React from "react";

interface CommentProps {
  user: string;
  text: string;
  userPhotoUrl: string;
}

const Comment: React.FC<CommentProps> = ({ user, text }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <strong>{user}:</strong> {text}
    </div>
  );
};

export default Comment;
