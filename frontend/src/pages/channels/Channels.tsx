import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Channel from '../../@types/models/channel.model';
import ChannelList from '../../components/channels/ChannelList';
import MyButton from '../../components/UI/buttons/MyButton';
import Hr from '../../components/UI/Hr';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChannelsGetAllThunk } from '../../store/channelsSlice/thunks';


function Channels() {
  const dispatch = useAppDispatch();

  const channels: Channel[] | null = useAppSelector(state => state.channelsReducer.channels);

  useEffect(() => {
    dispatch(ChannelsGetAllThunk({}))
  }, [dispatch]);

  return (
    <div className="channels-page">
      <Link to={'/channels/create'}>
        <MyButton onClick={event => { }}>Create channel</MyButton>
      </Link>
      <Hr />
      {channels ? <ChannelList channels={channels} /> : null}
    </div>
  );
}

export default Channels;