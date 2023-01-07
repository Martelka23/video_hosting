import { useEffect } from "react";
import VideoList from "../../components/video/VIdeoList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UsersGetSubscriptionsThunk } from "../../store/usersSlice/thunks";
import { VideosGetThunk } from "../../store/videoSlice/thunks";

export default function SubscriptionVideosPage() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.videoReducer.videos);
  const userId = useAppSelector(state => state.usersReducer.currentUser?.id);
  const channelIds = useAppSelector(state => state.usersReducer.subscribedChannels);

  useEffect(() => {
    if (userId) {
      console.log('get channelids')
      dispatch(UsersGetSubscriptionsThunk(userId));
    }
  }, [userId]);

  useEffect(() => {
    console.log('get videos')
    if (channelIds) {
      dispatch(VideosGetThunk({ channel_id: channelIds }))
    }
  }, [channelIds]);

  return (
    <div className="subscription-videos-page">
      <VideoList videos={videos} />
    </div>
  );
}