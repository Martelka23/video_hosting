import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Channel from '../../@types/models/channel.model';
import MyButton from '../../components/UI/buttons/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChannelsGetAllThunk } from '../../store/channelsSlice/thunks';


function Channels() {
  const dispatch = useAppDispatch();

  const channels: Channel[] | null = useAppSelector(state => state.channelsReducer.channels);

  useEffect(() => {
    dispatch(ChannelsGetAllThunk({}))
  }, [dispatch]);


  const Channels: JSX.Element[] | undefined = channels?.map(channel => (
    <div className="channels-page__channel" key={channel.id}>
      <div className="channels-page__channel__info">
        <img src={`http://localhost:3005/api/images/${channel.img}`} />
        <span>{channel.id} {channel.name}</span>
      </div>
      <div className="channels-page__channel__buttons">
        <Link to={`/channels/channel/${channel.id}`}>
          <MyButton onClick={event => { }}>View channel</MyButton>
        </Link>
      </div>
    </div>
  ));

  return (
    // <div className="channels-page">
      <div className="channels-page__container">
        <Link to={'/channels/create'}>
          <MyButton onClick={event => { }}>Create channel</MyButton>
        </Link>
        <hr />
        {Channels}
      </div>
    // </div>
  );
}

export default Channels;