import { useEffect } from "react";
import VideoList from "../../components/video/VIdeoList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { VideosGetThunk } from "../../store/videoSlice/thunks";

export default function AllVideosPage() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.videoReducer.videos);

  useEffect(() => {
    dispatch(VideosGetThunk())
  }, [])

  return (
    <div className="all-videos-page">
      <VideoList videos={videos} />
    </div>
  );
}