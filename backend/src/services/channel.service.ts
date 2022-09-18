import Channel, { CreateChannelDb, FindChannelDb } from "../@types/models/channel";
import channelDal from "../dal/channel.dal";

class ChannelService {
  async find(findChannelDb?: FindChannelDb): Promise<Channel[]> {
    const channels: Channel[] = await channelDal.find(findChannelDb);

    return channels;
  }

  async create(createChannelDb: CreateChannelDb): Promise<Channel> {
    const channel: Channel = await channelDal.createChannel(createChannelDb);

    return channel;
  }
}

const channelService = new ChannelService();

export default channelService;