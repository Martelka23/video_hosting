import { AxiosResponse } from "axios";

import $api from "..";
import { objectToQueryString } from "../tools";
import Video from "../../@types/models/video.model";
import { CreateVideoDto, FindVideoDto } from "../../@types/dto/video.dto";


class VideoService {
  async find(conditions?: FindVideoDto): Promise<AxiosResponse<Video[]>> {
    return await $api.get(`/videos/${objectToQueryString(conditions)}`);
  }

  async create(createVideoDb: CreateVideoDto): Promise<AxiosResponse<Video>> {
    return await $api.post('/videos/create', createVideoDb);
  }
}

const videoService = new VideoService();

export default videoService;