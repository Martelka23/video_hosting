import { CreateVideoDb, FindVideoDb, Video } from "../@types/models/videos";
import videoDal from "../dal/videos.dal";

class VideoService {
  async find(conditions: FindVideoDb = {}): Promise<Video[]> {
    return await videoDal.find(conditions);
  }

  async create(createVideoDb: CreateVideoDb): Promise<Video> {
    return await videoDal.create(createVideoDb);
  }
}

const videoService = new VideoService();

export default videoService;