import { useState } from "react";

function CommentInput({ currentUser, addComment, onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    if (onSubmit) {
      onSubmit(text); // reply
    } else {
      addComment(text); // new comment
    }

    setText("");
  };

  return (
    <div className="comment-input">
      <img
        src={currentUser.image.png}
        alt={currentUser.username}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        SEND
      </button>
    </div>
  );
}

export default CommentInput;
