import { CommentWithAuthor } from "../../@types/models/comment.model";

export default interface CommentsState {
  comments: CommentWithAuthor[] | null
}