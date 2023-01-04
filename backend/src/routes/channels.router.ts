import { Router } from "express";

import channelController from "../controllers/channel.controller";
import isAuth from "../middlewares/auth.middleware";
import createMulter from "../middlewares/createMulter";

const channelsRouter = Router();
const upload = createMulter('channel_images', 'test')

channelsRouter.get('/', channelController.find);
channelsRouter.post('/create', isAuth, upload.single('image'), channelController.create);

export default channelsRouter;