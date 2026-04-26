import { useComments } from "../context/CommentsContext";
import Comment from "./Comment";

function CommentList() {
  const { comments } = useComments();
  const sortedComments = [...comments].sort((a, b) => b.score - a.score);

  return (
    <div className="comment-list">
      {sortedComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}

export default CommentList;
