import Comment from "./Comment";

function ReplyList({
  replies,
  currentUser,
  addReply,
  updateScore,
  updateComment,
  deleteComment,
}) {
  return (
    <div className="replies">
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
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

export default ReplyList;
