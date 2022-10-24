import { CommentWithAuthor } from "../../@types/models/comment.model";
import CommentElem from "./CommentElem";

interface CommentsListProps {
  comments: CommentWithAuthor[] | null
}

function CommentsList({ comments }: CommentsListProps) {
  const commentsElem = comments && comments.length ? comments.map(comment => (
    <CommentElem comment={comment} />
  )) : null;

  return (
    <div className="comments-list">
      { comments ? commentsElem : <h2>Comments not found</h2> }
    </div>
  );
}

export default CommentsList;