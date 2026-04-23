import { useState } from "react";
import ReplyList from "./ReplyList";
import CommentInput from "./CommentInput";
import DeleteModal from "./DeleteModal";

function Comment({
  comment,
  currentUser,
  addReply,
  updateScore,
  updateComment,
  deleteComment,
}) {
  const { content, createdAt, score, user, replies = [] } = comment;

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCurrentUser = user.username === currentUser.username;

  return (
    <>
      <div className="comment">
        <div className="vote">
          <button onClick={() => updateScore(comment.id, 1)}>+</button>
          <span>{score}</span>
          <button onClick={() => updateScore(comment.id, -1)}>-</button>
        </div>

        <div className="content">
          <div className="header">
            <img
              src={user.image.png}
              alt={user.username}
            />
            <span>{user.username}</span>

            {isCurrentUser && <span className="you-badge">you</span>}

            <span>{createdAt}</span>

            {isCurrentUser ? (
              <>
                <button onClick={() => setIsDeleting(true)}>Delete</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </>
            ) : (
              <button onClick={() => setIsReplying((prev) => !prev)}>
                Reply
              </button>
            )}
          </div>

          {isEditing ? (
            <CommentInput
              key={comment.id}
              currentUser={currentUser}
              initialValue={content}
              buttonLabel="UPDATE"
              onSubmit={(text) => {
                updateComment(comment.id, text);
                setIsEditing(false);
              }}
            />
          ) : (
            <p>
              {comment.replyingTo && (
                <span className="replying-to">@{comment.replyingTo} </span>
              )}
              {content}
            </p>
          )}
        </div>

        {isReplying && (
          <CommentInput
            currentUser={currentUser}
            onSubmit={(text) => {
              addReply(comment.id, text, user.username);
              setIsReplying(false);
            }}
          />
        )}

        {replies.length > 0 && (
          <ReplyList
            replies={replies}
            currentUser={currentUser}
            addReply={addReply}
            updateScore={updateScore}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        )}
      </div>

      {/* MODAL */}
      {isDeleting && (
        <DeleteModal
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => {
            deleteComment(comment.id);
            setIsDeleting(false);
          }}
        />
      )}
    </>
  );
}

export default Comment;
