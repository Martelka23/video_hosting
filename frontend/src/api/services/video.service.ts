import { AxiosResponse } from "axios";

import $api from "..";
import { objectToQueryString } from "../tools";
import Video from "../../@types/models/video.model";
import { CheckAntiDuplicateDto, CreateVideoDto, FindVideoDto, VideoStatDto } from "../../@types/dto/video.dto";


class VideoService {
  async find(conditions: FindVideoDto = {}): Promise<AxiosResponse<Video[]>> {
    return await $api.get(`/videos/${objectToQueryString(conditions)}`);
  }

  async create(createVideoDb: CreateVideoDto): Promise<AxiosResponse<Video>> {
    return await $api.post('/videos/create', createVideoDb);
  }

  async updateStat(videoStatDto: VideoStatDto): Promise<AxiosResponse<void>> {
    return await $api.put(`/videos/updateStat`, videoStatDto);
  }

  async selectedCheck(conditions: CheckAntiDuplicateDto): Promise<AxiosResponse<void>> {
    return await $api.get(`/videos/selectedCheck/${objectToQueryString(conditions)}`);
  }
}

const videoService = new VideoService();

export default videoService;