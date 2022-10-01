import { Router } from "express";
import userController from "../controllers/user.controller";
import isAuth from "../middlewares/auth.middleware";
import isBanned from "../middlewares/ban.middleware";

const usersRouter = Router();

usersRouter.get('/', isAuth, userController.find);
usersRouter.get('/current', isAuth, userController.getCurrentUser);

export default usersRouter;