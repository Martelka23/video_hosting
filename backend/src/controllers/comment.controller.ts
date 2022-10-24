import { NextFunction, Request, Response } from "express";
import { FindCommentDto } from "../@types/dto/comment.dto";
import Comment, { CreateCommentDb } from "../@types/models/comment.model";
import { TokenPayload } from "../@types/models/token.model";
import commentService from "../services/comment.service";
import { ControllerErrorHandler } from "./tools/controller-tools";

class CommentController {
  @ControllerErrorHandler()
  async find(req: Request, res: Response, _: NextFunction) {
    const conditions: FindCommentDto = req.query;
    const result = await commentService.find(conditions);
    res.json(result);
  }

  @ControllerErrorHandler()
  async create(req: Request, res: Response, _: NextFunction) {
    const tokenPayload: TokenPayload = res.locals.tokenPayload;
    const createCommentDb: CreateCommentDb = { ...req.body, userId: tokenPayload.id };
    const result: Comment = await commentService.create(createCommentDb);
    res.status(201).json(result);
  }
}

const commentController = new CommentController();

export default commentController;