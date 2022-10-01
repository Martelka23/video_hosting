import { Router } from "express";
import videoController from "../controllers/video.controller";


const videosRouter = Router();

videosRouter.get('/', videoController.find);
videosRouter.get('/watch/:id', videoController.watch);
videosRouter.post('/create', videoController.create);

export default videosRouter;