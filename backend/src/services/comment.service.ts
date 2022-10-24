import { FindCommentDto } from "../@types/dto/comment.dto";
import Comment, { CommentWithAuthor, CreateCommentDb } from "../@types/models/comment.model";
import commentDal from "../dal/comment.dal";

class CommentService {
  async create(createCommentDto: CreateCommentDb): Promise<Comment> {
    const result = await commentDal.create(createCommentDto);

    return result;
  }

  async find(conditions: FindCommentDto): Promise<CommentWithAuthor[]> {
    // console.log(conditions)
    const result = await commentDal.find(conditions);

    return result;
  }
}

const commentService = new CommentService();

export default commentService;