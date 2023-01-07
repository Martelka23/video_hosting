import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Video from '../../@types/models/video.model';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { VideosGetThunk } from '../../store/videoSlice/thunks';
import { ChannelsGetOneThunk } from '../../store/channelsSlice/thunks';
import VideoList from '../../components/video/VIdeoList';
import { UsersGetUserProfileThunk } from '../../store/usersSlice/thunks';
import UserElem from '../../components/users/UserElem';
import Hr from '../../components/UI/Hr';
import ChannelSubscribe from '../../components/channels/ChannelSubscribe';
import RoundButton from '../../components/UI/buttons/RoundButton';


function ChannelPage() {
  const { id } = useParams();
  const ownerUser = useAppSelector(state => state.usersReducer.userProfile);
  const channel = useAppSelector(state => state.channelsReducer.channel);
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);
  const videos: Video[] | null = useAppSelector(state => state.videoReducer.videos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChannelsGetOneThunk({ id: Number(id) }));
    dispatch(VideosGetThunk({ channel_id: Number(id) }));
  }, [id]);

  useEffect(() => {
    if (channel) {
      dispatch(UsersGetUserProfileThunk(channel.userId))
    }
  }, [channel])

  if (!channel) {
    return (
      <div className='channel-page'>
        Loading...
      </div>
    );
  } else {
    const owner = channel.userId !== currentUser?.id ? (
      <React.Fragment>
        <span>Channel owner</span>
        {ownerUser ? <UserElem user={ownerUser} /> : null}
      </React.Fragment>
    ) : null;

    const channelButton = channel.userId !== currentUser?.id
      ? <ChannelSubscribe channelId={channel.id} userId={currentUser?.id} />
      : <Link to={`/channels/channel/edit/${channel.id}`}>
        <RoundButton onClick={() => { }}>Edit channel</RoundButton>
      </Link>

    return (
      <div className='channel-page'>
        <div className='channel-page__head'>
          <div className='channel-page__left'>
            <img
              src={`http://localhost:3005/api/images/${channel.img}`}
              alt="channel-photo"
            />
            {channelButton}
          </div>
          <div className='channel-page__info'>
            <div>
              <span id='channel-page__name'>
                {channel.name}
              </span>
              <p className='channel-page__description'>
                {channel.description}
              </p>
            </div>
            <div className='channel-page__owner'>
              {owner}
            </div>
          </div>
        </div>
        <Hr />
        <div className='channel-page__content'>
          <VideoList videos={videos} />
        </div>
      </div>
    );
  }
}

export default ChannelPage;