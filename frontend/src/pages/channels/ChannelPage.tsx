import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faHeartCrack, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Video } from '../../@types/models/video';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChannelsGetByIdThunk } from '../../store/channelsSlice/thunks';
import { VideosGetThunk } from '../../store/videoSlice/thunks';


function ChannelPage() {
  const { id } = useParams();
  let Videos: JSX.Element[] | null = null;
  const channel = useAppSelector(state => state.channelsReducer.channel);
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);
  const videos: Video[] | null = useAppSelector(state => state.videoReducer.videos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChannelsGetByIdThunk(Number(id)));
  }, [id]);

  useEffect(() => {
    if (channel) {
      dispatch(VideosGetThunk({ channel_id: channel.id }));
    }
  }, [channel]);

  if (videos) {
    Videos = videos.map(video => (
      <Link className='channel-video' to={`/videos/watch/${video.id}`}>
        <img className='video-img' src={`http://localhost:3005/api/images/${video.preview}`} />
        <span className='video-title'>{video.name}</span>
        <p className='video-info'>
          <span className='video-likes'><FontAwesomeIcon className='icon' icon={faHeart} />{video.likes}</span>
          <span className='video-dislikes'><FontAwesomeIcon className='icon' icon={faHeartCrack} />{video.dislikes}</span>
          <span className='video-views'><FontAwesomeIcon className='icon' icon={faEye} />{video.views}</span>
        </p>
      </Link>
    ));
  }

  if (!channel) {
    return (
      <div className='channel-page'>
        Loading...
      </div>
    );
  } else {
    return (
      <div className='channel-page'>
        <div className='channel-page-head'>
          <div className='user-profile-img'>
            <img
              src={`http://localhost:3005/api/images/${channel.img}`}
              alt="channel-photo"
            />
          </div>
          <div className='channel-page-info'>
            <span id='channel-page-name'>
              {channel.name}
            </span>
            <span className='channel-page-description'>
              {channel.description}
            </span>
            <span className='channel-page-owner'>
              {channel.userId === currentUser?.id ? 'It is your channel' : ''}
            </span>
          </div>
        </div>
        <hr className='video-line' />
        <div className='channel-page-content'>
          {Videos ? Videos : null}
        </div>
      </div>
    );
  }
}

export default ChannelPage;