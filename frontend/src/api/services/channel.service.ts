import { AxiosResponse } from "axios";

import $api from "..";
import { objectToQueryString } from "../tools";
import Channel from "../../@types/models/channel.model";
import { ChannelSubscribeDto, CreateChannelDto, FindChannelDto, SubscribeCheckDto, UpdateChannelDto } from "../../@types/dto/channel.dto";

class ChannelService {
  async find(conditions: FindChannelDto = {}): Promise<AxiosResponse<Channel[]>> {
    return await $api.get(`/channels/${objectToQueryString(conditions)}`);
  }

  async create(createChannelDto: CreateChannelDto): Promise<AxiosResponse<Channel>> {
    const data = new FormData();
    if (createChannelDto.image) {
      data.append('image', createChannelDto.image);
    }
    data.append('name', createChannelDto.name);
    data.append('description', createChannelDto.description);
    return await $api.post(`/channels/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async update(channelId: number, updateChannelDto: UpdateChannelDto, newImage?: File): Promise<AxiosResponse<Channel>> {
    const data = new FormData();
    if (newImage) {
      data.append('image', newImage);
      console.log('image added');
    }
    data.append('updateChannelDto', JSON.stringify(updateChannelDto));
    data.append('channelId', channelId.toString());

    return await $api.put('/channels/update', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async subscribe(channelSubscribeDto: ChannelSubscribeDto): Promise<AxiosResponse<void>> {
    return await $api.put('/channels/updateStat', channelSubscribeDto);
  }

  async subscribeCheck(subscribeCheckDto: SubscribeCheckDto): Promise<AxiosResponse<boolean>> {
    return await $api.get(`/channels/subscribeCheck/${objectToQueryString(subscribeCheckDto)}`)
  }
}

const channelService = new ChannelService();

export default channelService;