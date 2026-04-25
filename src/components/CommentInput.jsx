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
      <textarea
        autoFocus
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={buttonLabel === "UPDATE" ? "" : "Add a comment..."}
        className="input"
      />

      <div className="actions">
        <img
          src={currentUser.image.png}
          alt={currentUser.username}
          className="current-user"
        />

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="submit-btn"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default CommentInput;
