import { CommentWithAuthor } from "../../@types/models/comment.model";

interface CommentElemProps {
  comment: CommentWithAuthor
}

function CommentElem({ comment }: CommentElemProps) {
  return (
    <div className="comment" key={comment.id}>
      <p>{comment.userId}</p>
      <p>{comment.text}</p>
    </div>
  );
}

export default CommentElem;