import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import Video from '../../../@types/models/video.model';

import VideoPlayer from '../../../components/video/Video';
import VideoStat from '../../../components/videos/VideoStat';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { VideosGetCurrentThunk, VideosUpdateStatThunk } from '../../../store/videoSlice/thunks';


function VideoPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const video: Video | null = useAppSelector(state => state.videoReducer.currentVideo);

  useEffect(() => {
    dispatch(VideosGetCurrentThunk({ id: Number(id) }));
    dispatch(VideosUpdateStatThunk({ actionType: 'views', videoId: Number(id), value: 1 }));
  }, [id]);

  const videoJsOptions: videojs.PlayerOptions = {
    sources: [{
      src: `http://localhost:3005/api/videos/watch/${id}`,
      type: "video/mp4"
    }],
    playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 2]
  };

  return (
    <div className='video'>
      {
        video ?
          <React.Fragment>
            <VideoPlayer options={videoJsOptions} />
            <h1 className='video__title'>{video.name}</h1>
            <VideoStat video={video} />
            <hr />
            <p className='video__description'>{video.description}</p>
          </React.Fragment>
          : <div>Loading</div>
      }
    </div>
  );
}

export default VideoPage;