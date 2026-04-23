import { useState } from "react";

function CommentInput({
  currentUser,
  onSubmit,
  initialValue = "",
  buttonLabel = "SEND",
}) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSubmit(text);
    setText("");
  };

  return (
    <div className="comment-input">
      <img
        src={currentUser.image.png}
        alt={currentUser.username}
      />

      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={buttonLabel === "UPDATE" ? "" : "Add a comment..."}
      />

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default CommentInput;
