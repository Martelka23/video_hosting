import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";

import Video from "../../@types/models/video.model";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { VideosGetCurrentThunk, VideosSelectedCheckThunk, VideosUpdateStatThunk } from "../../store/videoSlice/thunks";
import { useEffect } from "react";

interface VideoStatProps {
  video: Video
}

function VideoStat({ video }: VideoStatProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedRate = useAppSelector(state => state.videoReducer.selectedRate);
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);

  useEffect(() => {
    if (currentUser) {
      dispatch(VideosSelectedCheckThunk({ userId: currentUser.id, videoId: Number(id) }));
    }
  }, [currentUser]);

  const updateInfo = async () => {
    if (currentUser) {
      await dispatch(VideosSelectedCheckThunk({ userId: currentUser.id, videoId: Number(id) }));
    }
    await dispatch(VideosGetCurrentThunk({ id: Number(id) }));
  };

  const addLike = async () => {
    await dispatch(VideosUpdateStatThunk({ actionType: 'likes', videoId: Number(id), value: 1 }));
    await updateInfo();
  }

  const addDislike = async () => {
    await dispatch(VideosUpdateStatThunk({ actionType: 'dislikes', videoId: Number(id), value: 1 }));
    await updateInfo();
  }

  return (
    <div className='video-stat'>
      <span className={`video-likes ${selectedRate === 'like' ? 'selected' : ''}`} onClick={addLike}>
        <FontAwesomeIcon className='icon' icon={faHeart} />
        {video.likes}
      </span>
      <span className={`video-dislikes ${selectedRate === 'dislike' ? 'selected' : ''}`} onClick={addDislike}>
        <FontAwesomeIcon className='icon' icon={faHeartCrack} />
        {video.dislikes}
      </span>
      <span className='video-views'>
        <FontAwesomeIcon className='icon' icon={faEye} />
        {video.views}
      </span>
    </div>
  );
}

export default VideoStat;