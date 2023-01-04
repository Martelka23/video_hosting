import Channel from "../../@types/models/channel.model";
import ChannelElem from "./ChannelElem";

interface ChannelListProps {
  channels: Channel[]
}

export default function ChannelList({ channels }: ChannelListProps) {
  return (
    <div className="channel-list">
      {channels.map(channel => <ChannelElem channel={channel} />)}
    </div>
  );
}