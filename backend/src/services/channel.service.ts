import fs from 'fs';

import { FindChannelDto, UpdateChannelDto } from "../@types/dto/channel.dto";
import Channel, { CreateChannelDb } from "../@types/models/channel.model";
import channelDal from "../dal/channel.dal";
import ApiError from "../exceptions/api-error";

class ChannelService {
  async find(findChannelDb?: FindChannelDto): Promise<Channel[]> {
    const channels: Channel[] = await channelDal.find(findChannelDb);

    return channels;
  }

  async create(createChannelDb: CreateChannelDb): Promise<Channel> {
    const channel: Channel = await channelDal.createChannel(createChannelDb);

    return channel;
  }

  async update(channelId: number, userId: number, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    const channels: Channel[] = await channelDal.find({ id: channelId });
    if (channels[0].userId !== userId) {
      throw ApiError.Forbidden('This is not your channel');
    }
    if (updateChannelDto.img && !channels[0].img.endsWith('default_image.jpg')) {
      fs.rmSync('/Users/martelka/Documents/Study/fullstack/projects/videos/backend/content/' + channels[0].img);
    }
    const channel: Channel = await channelDal.update(channelId, updateChannelDto);

    return channel;
  }

  async updateStat(channelId: number, userId: number): Promise<void> {
    const deletedAntiDuplicate = await channelDal.removeAntiDuplicate(userId, channelId);
    if (deletedAntiDuplicate) {
      await channelDal.updateSubscribers(channelId, -1);
    } else {
      await channelDal.updateSubscribers(channelId, 1);
      await channelDal.addAntiDuplicate(userId, channelId);
    }
  }

  async checkAntiduplicate(channelId: number, userId: number): Promise<boolean> {
    const found = await channelDal.findAntiDuplicate(userId, channelId);

    return found !== undefined
  }
}

const channelService = new ChannelService();

export default channelService;