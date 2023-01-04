import { CreateChannelDto } from '../../@types/dto/channel.dto';
import ChannelCreateForm from '../../components/forms/channels/ChannelCreateForm';
import { useAppDispatch } from '../../hooks/redux';
import { ChannelsCreateThunk } from '../../store/channelsSlice/thunks';

function ChannelCreatePage() {
  const dispatch = useAppDispatch();

  const onSubmit = async (createChannelDto: CreateChannelDto) => {
    await dispatch(ChannelsCreateThunk(createChannelDto))
  }

  return (
    <div className="channel-create">
      <h1>Create channel</h1>
      <ChannelCreateForm onSubmit={onSubmit} />
    </div>
  );
}

export default ChannelCreatePage;