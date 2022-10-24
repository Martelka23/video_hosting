import { AxiosResponse } from "axios";

import $api from "..";
import { CreateCommentDto, FindCommentDto } from "../../@types/dto/comment.dto";
import Comment, { CommentWithAuthor } from "../../@types/models/comment.model";
import { objectToQueryString } from "../tools";

class CommentService {
  async find(conditions: FindCommentDto = {}): Promise<AxiosResponse<CommentWithAuthor[]>> {
    return await $api.get(`/comments/${objectToQueryString(conditions)}`);
  }

  async create(createCommentDto: CreateCommentDto): Promise<AxiosResponse<Comment>> {
    return await $api.post('/comments/', createCommentDto);
  }
}

const commentService = new CommentService();

export default commentService;