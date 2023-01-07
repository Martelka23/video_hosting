import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdateChannelDto } from "../../@types/dto/channel.dto";
import Channel from "../../@types/models/channel.model";
import EditChannelForm from "../../components/forms/channels/EditChannelForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChannelsGetOneThunk } from "../../store/channelsSlice/thunks";

export default function ChannelEditPage() {
  const { id } = useParams();
  const channel: Channel | null = useAppSelector(state => state.channelsReducer.channel);
  const fields: Array<keyof UpdateChannelDto> = ['name', 'description'];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChannelsGetOneThunk({ id: Number(id) }))
  }, []);

  return (
    <div className="channel-edit-page">
      {channel ? <EditChannelForm channel={channel} fields={fields} /> : null}
    </div>
  );
}