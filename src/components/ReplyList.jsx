import Comment from "./Comment";

function ReplyList({ replies }) {
  return (
    <div className="replies-container">
      <div className="replies-line" />

      <div className="replies">
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
          />
        ))}
      </div>
    </div>
  );
}

export default ReplyList;
