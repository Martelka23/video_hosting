import videoDal from "../dal/videos.dal";
import Video from "../@types/models/videos.model";
import { CheckAntiDuplicateDto, CreateVideoDto, FindVideoDto, VideoStatDto } from "../@types/dto/video.dto";
import VideoAntiDuplicate from "../@types/models/video-antiduplicate.model";

class VideoService {
  async find(conditions: FindVideoDto = {}): Promise<Video[]> {
    return await videoDal.find(conditions);
  }

  async create(createVideoDb: CreateVideoDto): Promise<Video> {
    return await videoDal.create(createVideoDb);
  }

  async updateStat(videoStat: VideoStatDto, userId: number): Promise<void> {
    let VideoLikesAntiDuplicate: VideoAntiDuplicate | undefined = undefined;
    let VideoDislikesAntiDuplicate: VideoAntiDuplicate | undefined = undefined;

    if (['likes', 'dislikes'].includes(videoStat.actionType)) {
      VideoLikesAntiDuplicate = await videoDal.removeAntiDuplicate({ actionType: 'likes', videoId: videoStat.videoId, userId });
      VideoDislikesAntiDuplicate = await videoDal.removeAntiDuplicate({ actionType: 'dislikes', videoId: videoStat.videoId, userId });
    }

    if (VideoLikesAntiDuplicate) {
      await videoDal.updateStat({ actionType: 'likes', videoId: videoStat.videoId, value: -1 })
    }
    if (VideoDislikesAntiDuplicate) {
      await videoDal.updateStat({ actionType: 'dislikes', videoId: videoStat.videoId, value: -1 })
    }

    if (!(videoStat.actionType === 'likes' && VideoLikesAntiDuplicate || videoStat.actionType === 'dislikes' && VideoDislikesAntiDuplicate)) {
      await videoDal.updateStat(videoStat);
      if (videoStat.actionType !== 'views') {
        await videoDal.addAntiDuplicate({ actionType: videoStat.actionType, videoId: videoStat.videoId, userId });
      }
    }
  }

  async checkAntiDuplicate(conditions: CheckAntiDuplicateDto): Promise<"like" | "dislike" | null> {
    const VideoLikesAntiDuplicate = await videoDal.findAntiDuplicate({ actionType: 'likes', ...conditions });
    const VideoDislikesAntiDuplicate = await videoDal.findAntiDuplicate({ actionType: 'dislikes', ...conditions });

    let result: "like" | "dislike" | null = null;

    if (VideoLikesAntiDuplicate) {
      result = 'like';
    }
    if (VideoDislikesAntiDuplicate) {
      result = 'dislike';
    }

    return result;
  }
}

const videoService = new VideoService();

export default videoService;