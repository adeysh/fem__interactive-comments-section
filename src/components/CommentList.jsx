import Comment from "./Comment";

function CommentList({
  comments,
  currentUser,
  addReply,
  updateScore,
  updateComment,
  deleteComment,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          addReply={addReply}
          updateScore={updateScore}
          updateComment={updateComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}

export default CommentList;
