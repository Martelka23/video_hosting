
import videoDal from "../dal/videos.dal";
import Video from "../@types/models/videos.model";
import { CreateVideoDto, FindVideoDto } from "../@types/dto/video.dto";

class VideoService {
  async find(conditions: FindVideoDto = {}): Promise<Video[]> {
    return await videoDal.find(conditions);
  }

  async create(createVideoDb: CreateVideoDto): Promise<Video> {
    return await videoDal.create(createVideoDb);
  }
}

const videoService = new VideoService();

export default videoService;