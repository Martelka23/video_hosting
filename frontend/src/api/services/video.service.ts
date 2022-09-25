import { AxiosResponse } from "axios";
import $api from "..";
import { CreateVideoDb, FindVideoDb, Video } from "../../@types/models/video";
import { objectToQueryString } from "../tools";


class VideoService {
  async find(conditions?: FindVideoDb): Promise<AxiosResponse<Video[]>> {
    return await $api.get(`/videos/video${objectToQueryString(conditions)}`);
  }

  async create(createVideoDb: CreateVideoDb): Promise<AxiosResponse<Video>> {
    return await $api.post('/videos/create', createVideoDb);
  }
}

const videoService = new VideoService();

export default videoService;