import { Link } from "react-router-dom";
import { CommentWithAuthor } from "../../@types/models/comment.model";

interface CommentElemProps {
  comment: CommentWithAuthor
}

function CommentElem({ comment }: CommentElemProps) {
  return (
    <div className="comment" key={comment.id}>
      <div className="comment__img">
        <Link to={`/users/profile/${comment.id}`}>
          <img src={'http://localhost:3005/api/images/' + comment.img} />
        </Link>
      </div>
      <div className="comment__body">
        <p className="comment__username">
          <Link to={`/users/profile/${comment.id}`}>
            {comment.username}
          </Link>
        </p>
        <p className="comment__text">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

export default CommentElem;