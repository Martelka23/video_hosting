import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import User from '../../../@types/models/user.model';
import Video from '../../../@types/models/video.model';
import VideoComments from '../../../components/comment/VideoComments';
import Hr from '../../../components/UI/Hr';

import VideoPlayer from '../../../components/video/Video';
import VideoStat from '../../../components/video/VideoStat';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { VideosGetCurrentThunk, VideosUpdateStatThunk } from '../../../store/videoSlice/thunks';


function VideoPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const video: Video | null = useAppSelector(state => state.videoReducer.currentVideo);
  const currentUser: User | undefined = useAppSelector(state => state.usersReducer.currentUser);

  useEffect(() => {
    dispatch(VideosGetCurrentThunk({ id: Number(id) }));
    setTimeout(() => {
      dispatch(VideosUpdateStatThunk({ actionType: 'views', videoId: Number(id), value: 1 }));
    }, 10000);
  }, [id]);

  const videoJsOptions: videojs.PlayerOptions = {
    sources: [{
      src: `http://localhost:3005/api/videos/watch/${id}`,
      type: "video/mp4"
    }],
    playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 2]
  };

  return (
    <div className='video-page'>
      {
        video ?
          <React.Fragment>
            <VideoPlayer options={videoJsOptions} />
            <div className='video-under'>
              <h1 className='video__title'>{video.name}</h1>
              <VideoStat video={video} />
              <Hr />
              <p className='video__description'>{video.description}</p>
              <Hr />
              <VideoComments videoId={Number(id)} addCreateComment={currentUser !== undefined} />
            </div>
          </React.Fragment>
          : <div>Loading</div>
      }
    </div>
  );
}

export default VideoPage;