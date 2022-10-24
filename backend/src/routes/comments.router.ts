import { Router } from "express";
import commentController from "../controllers/comment.controller";
import isAuth from "../middlewares/auth.middleware";

const commentsRouter = Router();

commentsRouter.get('/', commentController.find);
commentsRouter.post('/', isAuth, commentController.create);

export default commentsRouter;