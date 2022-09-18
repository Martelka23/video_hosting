import { NextFunction, Request, Response } from "express";
import Channel, { CreateChannelDb } from "../@types/models/channel";
import channelService from "../services/channel.service";

class ChannelController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const channels: Channel[] = await channelService.find();
      res.json(channels);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const channels: Channel[] = await channelService.find({ id: Number(id) });
      res.json(channels);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createChannelDb: CreateChannelDb = req.body;
      const channel: Channel = await channelService.create(createChannelDb);
      res.json(channel);
    } catch (err) {
      next(err);
    }
  }
}

const channelController = new ChannelController();

export default channelController;