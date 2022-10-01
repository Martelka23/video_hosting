import RequestError from "../../@types/axios/error";
import Channel from "../../@types/models/channel.model";

export interface ChannelsState {
  channels: Channel[] | null,
  channel: Channel | null,
  isLoading: boolean,
  error: RequestError | null
}