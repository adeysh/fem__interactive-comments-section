import { useComments } from "../context/CommentsContext";
import Comment from "./Comment";

function CommentList() {
  const { comments } = useComments();

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}

export default CommentList;
