import { faEye, faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Video from "../../@types/models/video.model";

interface VideoListProps {
  videos: Video[] | null
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="channel-video">
      {
        (videos) ?
          videos.map((video, i) => (
            <Link className='channel-video' to={`/videos/watch/${video.id}`} key={i}>
              <img className='video-img' src={`http://localhost:3005/api/images/${video.preview}`} />
              <span className='video-title'>{video.name}</span>
              <p className='video-info'>
                <span className='video-likes'><FontAwesomeIcon className='icon' icon={faHeart} />{video.likes}</span>
                <span className='video-dislikes'><FontAwesomeIcon className='icon' icon={faHeartCrack} />{video.dislikes}</span>
                <span className='video-views'><FontAwesomeIcon className='icon' icon={faEye} />{video.views}</span>
              </p>
            </Link>
          ))
          : 'Videos not found'
      }
    </div>
  );
}