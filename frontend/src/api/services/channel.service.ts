import { AxiosResponse } from "axios";
import $api from "..";
import Channel from "../../@types/models/channel";

class ChannelService {
  async getAll(): Promise<AxiosResponse<Channel[]>> {
    return await $api.get('/channels/all');
  }

  async getById(id: number): Promise<AxiosResponse<Channel>> {
    return await $api.get(`/channels/channel/${id}`);
  }

  async getByUserId(userId: number): Promise<AxiosResponse<Channel>> {
    return await $api.get(`/channels/userChannel/${userId}`);
  }
}

const channelService = new ChannelService();

export default channelService;