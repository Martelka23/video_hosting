import { Router } from "express";

import channelController from "../controllers/channel.controller";
import isAuth from "../middlewares/auth.middleware";

const channelsRouter = Router();

channelsRouter.get('/', channelController.find);
channelsRouter.post('/create', isAuth, channelController.create);

export default channelsRouter;