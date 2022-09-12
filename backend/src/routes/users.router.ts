import { Router } from "express";
import userController from "../controllers/user.controller";
import isAuth from "../middlewares/auth.middleware";
import isBanned from "../middlewares/ban.middleware";

const usersRouter = Router();

usersRouter.get('/all', isAuth, userController.getAll);

export default usersRouter;