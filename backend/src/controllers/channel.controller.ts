import { NextFunction, Request, Response } from "express";

import { ChannelSubscribeDto, CreateChannelDto } from "../@types/dto/channel.dto";
import Channel, { CreateChannelDb } from "../@types/models/channel.model";
import { TokenPayload } from "../@types/models/token.model";
import ApiError from "../exceptions/api-error";
import channelService from "../services/channel.service";
import { ControllerErrorHandler } from "./tools/controller-tools";

class ChannelController {
  @ControllerErrorHandler()
  async create(req: Request, res: Response, _: NextFunction) {
    const createChannelDto: CreateChannelDto = req.body;
    const tokenPayload: TokenPayload = res.locals.tokenPayload;
    const img = (req.file) ? req.file.filename : 'channel_images/default_img.jpg';
    
    const createChannelDb: CreateChannelDb = { ...createChannelDto, userId: tokenPayload.id, img };
    const channel: Channel = await channelService.create(createChannelDb);
    res.json(channel);
  }

  @ControllerErrorHandler()
  async find(req: Request, res: Response, _: NextFunction) {
    const channels: Channel[] = await channelService.find(req.query);
    if (channels.length > 0) {
      res.json(channels);
    } else {
      res.status(404).json({ message: "Channel not found!" });
    }
  }

  @ControllerErrorHandler()
  async updateStat(req: Request, res: Response, _: NextFunction) {
    const channelStatDto: ChannelSubscribeDto = req.body;
    const tokenPayload: TokenPayload = res.locals.tokenPayload;
    await channelService.updateStat(channelStatDto.channelId, tokenPayload.id);

    res.json();
  }

  @ControllerErrorHandler()
  async checkAntiDuplicate(req: Request, res: Response, _: NextFunction) {
    if (!Object.keys(req.query).includes('channelId') || !Object.keys(req.query).includes('userId')) {
      throw ApiError.BadRequest('channelId or userId not found in query params');
    }
    const { userId, channelId } = req.query;
    const found = await channelService.checkAntiduplicate(Number(channelId), Number(userId));

    res.json(found);
  }
}

const channelController = new ChannelController();

export default channelController;