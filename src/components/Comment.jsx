import { useState } from "react";
import ReplyList from "./ReplyList";
import CommentInput from "./CommentInput";
import DeleteModal from "./DeleteModal";
import { timeAgo } from "../utils/timeAgo";
import { useComments } from "../context/CommentsContext";

function Comment({ comment }) {
  const { content, createdAt, score, user, replies = [] } = comment;
  const { currentUser, addReply, updateScore, updateComment, deleteComment } =
    useComments();

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCurrentUser = user.username === currentUser.username;

  return (
    <>
      <div className="comment">
        <div className="header">
          <img
            src={user.image.png}
            alt={user.username}
          />
          <span className="username">{user.username}</span>

          {isCurrentUser && <span className="you-badge">YOU</span>}

          <span className="created-at">{timeAgo(createdAt)}</span>
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
          <p className="content">
            {comment.replyingTo && (
              <span className="replying-to">@{comment.replyingTo} </span>
            )}
            {content}
          </p>
        )}

        <div className="actions">
          <div className="vote">
            <button onClick={() => updateScore(comment.id, 1)}>
              <svg
                width="11"
                height="11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <span>{score}</span>
            <button onClick={() => updateScore(comment.id, -1)}>
              <svg
                width="11"
                height="3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div className="action-btns">
            {isCurrentUser ? (
              <>
                <div className="action-btn">
                  <img
                    src="/images/icon-delete.svg"
                    alt="delete"
                  />
                  <button onClick={() => setIsDeleting(true)}>
                    <span className="delete-btn">Delete</span>
                  </button>
                </div>

                <div className="action-btn">
                  <img
                    src="/images/icon-edit.svg"
                    alt="edit"
                  />
                  <button onClick={() => setIsEditing(true)}>
                    <span>Edit</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="action-btn">
                <img
                  src="/images/icon-reply.svg"
                  alt="reply"
                />
                <button onClick={() => setIsReplying((prev) => !prev)}>
                  <span>Reply</span>
                </button>
              </div>
            )}
          </div>
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
      </div>
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
