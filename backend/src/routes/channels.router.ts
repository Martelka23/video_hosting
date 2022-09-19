import { Router } from "express";
import channelController from "../controllers/channel.controller";
import isAuth from "../middlewares/auth.middleware";

const channelsRouter = Router();

channelsRouter.get('/all', channelController.getAll);
channelsRouter.get('/userChannel/:userId', channelController.getByUserId);
channelsRouter.get('/channel/:id', channelController.getById);
channelsRouter.post('/create', isAuth, channelController.create);

export default channelsRouter;