import { Link } from "react-router-dom";
import Channel from "../../@types/models/channel.model";
import MyButton from "../UI/buttons/MyButton";

interface ChannelElemProps {
  channel: Channel
}

export default function ChannelElem({ channel }: ChannelElemProps) {
  return (
    <div className="channel" key={channel.id}>
      <div className="channel__info">
        <img src={`http://localhost:3005/api/images/${channel.img}`} />
        <span>{channel.id} {channel.name}</span>
      </div>
      <div className="channel__buttons">
        <Link to={`/channels/channel/${channel.id}`}>
          <MyButton onClick={event => { }}>View channel</MyButton>
        </Link>
      </div>
    </div>
  );
}