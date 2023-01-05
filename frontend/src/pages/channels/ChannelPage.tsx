import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Video from '../../@types/models/video.model';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { VideosGetThunk } from '../../store/videoSlice/thunks';
import { ChannelsGetOneThunk } from '../../store/channelsSlice/thunks';
import VideoList from '../../components/video/VIdeoList';
import { UsersGetUserProfileThunk } from '../../store/usersSlice/thunks';
import UserElem from '../../components/users/UserElem';
import Hr from '../../components/UI/Hr';
import ChannelSubscribe from '../../components/channels/ChannelSubscribe';


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
    const owner = channel.userId === currentUser?.id ? 'It is your channel' : (
      <React.Fragment>
        <span>Channel owner</span>
        {ownerUser ? <UserElem user={ownerUser} /> : null}
      </React.Fragment>
    );
    return (
      <div className='channel-page'>
        <div className='channel-page__head'>
          <div className='user-profile__img'>
            <img
              src={`http://localhost:3005/api/images/${channel.img}`}
              alt="channel-photo"
            />
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
        {currentUser ? <ChannelSubscribe subscribeCheckDto={{ channelId: channel.id, userId: currentUser?.id }} /> : null}
        <Hr />
        <div className='channel-page__content'>
          <VideoList videos={videos} />
        </div>
      </div>
    );
  }
}

export default ChannelPage;