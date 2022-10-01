import { CreateChannelDto, FindChannelDto } from "../@types/dto/channel.dto";
import Channel from "../@types/models/channel.model";
import channelDal from "../dal/channel.dal";

class ChannelService {
  async find(findChannelDb?: FindChannelDto): Promise<Channel[]> {
    const channels: Channel[] = await channelDal.find(findChannelDb);

    return channels;
  }

  async create(createChannelDb: CreateChannelDto): Promise<Channel> {
    const channel: Channel = await channelDal.createChannel(createChannelDb);

    return channel;
  }
}

const channelService = new ChannelService();

export default channelService;