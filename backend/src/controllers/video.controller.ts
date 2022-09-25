import fs from 'fs';
import { NextFunction, Request, Response } from "express";
import { CreateVideoDb, FindVideoDb, Video } from "../@types/models/videos";
import videoService from "../services/video.service";
import path from 'path';

class VideoController {
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      // const { id } = req.params;
      const conditions: FindVideoDb = req.query;
      const result: Video | Video[] = await videoService.find(conditions);
      // let result: Video | Video[];
      // if (id) {
      //   result = await videoService.find({ id: Number(id) });
      // } else {
      //   result = await videoService.find();
      // }
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createVideoDb: CreateVideoDb = req.body;
      const video = await videoService.create(createVideoDb);
      res.status(201).json(video);
    } catch (err) {
      next(err);
    }
  }

  async watch(req: Request, res: Response, next: NextFunction) {
    try {
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

      console.log('res');
      console.log(req.headers);
      console.log(headers);

      res.writeHead(206, headers);

      const videoStream = fs.createReadStream(filepath, { start, end });
      videoStream.pipe(res);
    } catch (err) {
      next(err);
    }
  }
}

const videoController = new VideoController();

export default videoController;