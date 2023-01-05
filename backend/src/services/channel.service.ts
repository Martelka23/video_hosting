import { ChannelSubscribeDto, FindChannelDto } from "../@types/dto/channel.dto";
import Channel, { CreateChannelDb } from "../@types/models/channel.model";
import SubscribersAntiDuplicate from "../@types/models/subscribers-antiduplicate.model";
import channelDal from "../dal/channel.dal";

class ChannelService {
  async find(findChannelDb?: FindChannelDto): Promise<Channel[]> {
    const channels: Channel[] = await channelDal.find(findChannelDb);

    return channels;
  }

  async create(createChannelDb: CreateChannelDb): Promise<Channel> {
    const channel: Channel = await channelDal.createChannel(createChannelDb);

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