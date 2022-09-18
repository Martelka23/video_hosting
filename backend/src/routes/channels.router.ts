import { Router } from "express";
import channelController from "../controllers/channel.controller";

const channelsRouter = Router();

channelsRouter.get('/all', channelController.getAll);
channelsRouter.get('/channel/:id', channelController.getById);
channelsRouter.post('/create', channelController.create);  // AddAuth

export default channelsRouter;