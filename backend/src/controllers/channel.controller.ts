import { NextFunction, Request, Response } from "express";
import { CreateChannelDto } from "../@types/dto/channel.dto";

import Channel from "../@types/models/channel.model";
import channelService from "../services/channel.service";
import { ControllerErrorHandler } from "./tools/controller-tools";

class ChannelController {
  @ControllerErrorHandler()
  async create(req: Request, res: Response, _: NextFunction) {
    const createChannelDb: CreateChannelDto = req.body;
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
}

const channelController = new ChannelController();

export default channelController;