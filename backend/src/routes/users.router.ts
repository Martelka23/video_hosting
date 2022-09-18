import { Router } from "express";
import userController from "../controllers/user.controller";
import isAuth from "../middlewares/auth.middleware";
import isBanned from "../middlewares/ban.middleware";

const usersRouter = Router();

usersRouter.get('/all', isAuth, userController.getAll);
usersRouter.get('/current', isAuth, userController.getCurrentUser);
usersRouter.get('/profile/:id', isAuth, userController.getById);

export default usersRouter;