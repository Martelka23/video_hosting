import { useParams } from 'react-router-dom';

import './video-page.css';

function VideoPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Video page {id}</h1>
      {/* <img src={`http://localhost:3005/api/images/`} /> */}
      <video width="1000" controls>
        <source src={`http://localhost:3005/api/videos/watch/1`} type="video/mp4"></source>
      </video>
    </div>
  );
}

export default VideoPage;