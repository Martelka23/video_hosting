import { AxiosResponse } from "axios";

import $api from "..";
import { objectToQueryString } from "../tools";
import Channel from "../../@types/models/channel.model";
import { CreateChannelDto, FindChannelDto } from "../../@types/dto/channel.dto";

class ChannelService {
  async find(conditions: FindChannelDto = {}): Promise<AxiosResponse<Channel[]>> {
    return await $api.get(`/channels/${objectToQueryString(conditions)}`);
  }

  async create(createChannelDb: CreateChannelDto): Promise<AxiosResponse<Channel>> {
    return await $api.post(`/channels/create`, createChannelDb);
  }
}

const channelService = new ChannelService();

export default channelService;