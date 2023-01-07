import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from "express";

import videoService from "../services/video.service";
import { ControllerErrorHandler } from './tools/controller-tools';
import Video from '../@types/models/videos.model';
import { CheckAntiDuplicateDto, CreateVideoDto, FindVideoDto, VideoStatDto } from '../@types/dto/video.dto';
import { TokenPayload } from '../@types/models/token.model';
import ApiError from '../exceptions/api-error';



class VideoController {
  @ControllerErrorHandler()
  async find(req: Request, res: Response, _: NextFunction) {
    const conditions: FindVideoDto = req.query;
    console.log(conditions)
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
  async updateStat(req: Request, res: Response, _: NextFunction) {
    const videoStat: VideoStatDto = req.body;
    const tokenPayload: TokenPayload = res.locals.tokenPayload;
    await videoService.updateStat(videoStat, tokenPayload.id);
    res.json();
  }

  @ControllerErrorHandler()
  async checkAntiDuplicate(req: Request, res: Response, _: NextFunction) {
    if (!Object.keys(req.query).includes('userId') || !Object.keys(req.query).includes('videoId')) {
      throw ApiError.BadRequest('videoId or userId not found in query params');
    }
    const { userId, videoId } = req.query;
    const result = await videoService.checkAntiDuplicate({ userId: Number(userId), videoId: Number(videoId) });
    res.json(result);
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