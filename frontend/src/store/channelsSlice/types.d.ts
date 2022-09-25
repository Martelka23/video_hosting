import Channel from "../../@types/models/channel";

export interface ChannelsState {
  channels: Channel[] | null,
  channel: Channel | null
}