import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from "express";

import videoService from "../services/video.service";
import { ControllerErrorHandler } from './tools/controller-tools';
import Video from '../@types/models/videos.model';
import { CreateVideoDto, FindVideoDto } from '../@types/dto/video.dto';



class VideoController {
  @ControllerErrorHandler()
  async find(req: Request, res: Response, _: NextFunction) {
    const conditions: FindVideoDto = req.query;
    const videos: Video[] = await videoService.find(conditions);
    const status = videos.length ? 200 : 204;
    res.status(status).json(videos);
  }

  @ControllerErrorHandler()
  async create(req: Request, res: Response, _: NextFunction) {
    const createVideoDb: CreateVideoDto = req.body;
    const video = await videoService.create(createVideoDb);
    res.status(201).json(video);
  }

  @ControllerErrorHandler()
  async watch(req: Request, res: Response, _: NextFunction) {
    const { id } = req.params;
    const videos: Video[] = await videoService.find({ id: Number(id) });
    const video: Video = videos[0];

    const filepath = path.join(__dirname, '../../content/videos', video.filepath);
    const videoSize = fs.statSync(filepath).size;

    const range = req.headers.range as string;
    const start = Number(range.replace(/\D/g, ''));
    const chunkSize = 10 ** 6;
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4'
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(filepath, { start, end });
    videoStream.pipe(res);
  }
}

const videoController = new VideoController();

export default videoController;