import { Router } from "express";
import userController from "../controllers/user.controller";
import isAuth from "../middlewares/auth.middleware";
import isBanned from "../middlewares/ban.middleware";
import createMulter from "../middlewares/createMulter";

const usersRouter = Router();
const upload = createMulter('user_images', 'test');

usersRouter.get('/', isAuth, userController.find);
usersRouter.get('/current', isAuth, userController.getCurrentUser);
usersRouter.get('/subscriptions', userController.getSubscriptions);
usersRouter.put('/', isAuth, upload.single('image'), userController.update);

export default usersRouter;