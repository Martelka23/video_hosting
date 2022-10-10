import { Router } from "express";
import videoController from "../controllers/video.controller";
import isAuth from "../middlewares/auth.middleware";


const videosRouter = Router();

videosRouter.get('/', videoController.find);
videosRouter.get('/watch/:id', videoController.watch);
videosRouter.get('/selectedCheck', videoController.checkAntiDuplicate);
videosRouter.put('/updateStat', isAuth, videoController.updateStat);
videosRouter.post('/create', videoController.create);

export default videosRouter;