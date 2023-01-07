import { Router } from "express";

import channelController from "../controllers/channel.controller";
import isAuth from "../middlewares/auth.middleware";
import createMulter from "../middlewares/createMulter";

const channelsRouter = Router();
const upload = createMulter('channel_images', 'test');

channelsRouter.get('/', channelController.find);
channelsRouter.get('/subscribeCheck', channelController.checkAntiDuplicate);
channelsRouter.put('/update', isAuth, upload.single('image'), channelController.update);
channelsRouter.put('/updateStat', isAuth, channelController.updateStat);
channelsRouter.post('/create', isAuth, upload.single('image'), channelController.create);

export default channelsRouter;