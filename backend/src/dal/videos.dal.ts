import pool from "../db";
import sqlGenerator from "./sqlGenerator";
import { DbObject } from "../@types/database";
import Video from "../@types/models/videos.model";
import { CreateVideoDto, FindVideoDto, VideoStatDto } from "../@types/dto/video.dto";
import VideoAntiDuplicate, { StatAntiDuplicate } from "../@types/models/video-antiduplicate.model";

class VideosDal {
  async find(conditions: FindVideoDto = {}): Promise<Video[]> {
    const conditionsString = sqlGenerator.getConditionString(conditions);
    const result = await pool.query(`
      SELECT
        *
      FROM
        videos
      ${conditionsString}
    `);
    const videos: Video[] = sqlGenerator.camelcaseKeys(result.rows) as Video[];

    return videos;
  }

  async create(createVideoDb: CreateVideoDto): Promise<Video> {
    const insertString = sqlGenerator.getInsertString(createVideoDb as unknown as DbObject);
    const result = await pool.query(`
      INSERT INTO
        videos
      ${insertString}
      RETURNING *
    `);
    const video: Video = sqlGenerator.camelcaseKeys(result.rows[0]) as Video;

    return video;
  }

  async updateStat(videoStat: VideoStatDto): Promise<void> {
    await pool.query(`
      UPDATE
        videos
      SET
        ${videoStat.actionType} = ${videoStat.actionType} + ${videoStat.value}
      WHERE
        id = ${videoStat.videoId}
    `);
  }

  async addAntiDuplicate(antiDuplicate: StatAntiDuplicate): Promise<void> {
    const insertString = sqlGenerator.getInsertString({ videoId: antiDuplicate.videoId, userId: antiDuplicate.userId });
    await pool.query(`
      INSERT INTO
        video_${antiDuplicate.actionType}
      ${insertString}
    `);
  }

  async removeAntiDuplicate(antiDuplicate: StatAntiDuplicate): Promise<VideoAntiDuplicate | undefined> {
    const conditionsString = sqlGenerator.getConditionString({ videoId: antiDuplicate.videoId, userId: antiDuplicate.userId });
    const result = await pool.query(`
      DELETE FROM
        video_${antiDuplicate.actionType}
      ${conditionsString}
      RETURNING *
    `);
    const videoAntiDuplicate: VideoAntiDuplicate = sqlGenerator.camelcaseKeys(result.rows[0]);
    console.log(videoAntiDuplicate)

    return videoAntiDuplicate;
  }

  async findAntiDuplicate(antiDuplicate: StatAntiDuplicate): Promise<VideoAntiDuplicate | undefined> {
    const conditionsString = sqlGenerator.getConditionString({ videoId: antiDuplicate.videoId, userId: antiDuplicate.userId });
    const result = await pool.query(`
      SELECT
        *
      FROM
        video_${antiDuplicate.actionType}
      ${conditionsString}
    `);
    const videoAntiDuplicate: VideoAntiDuplicate = sqlGenerator.camelcaseKeys(result.rows[0]);

    return videoAntiDuplicate;
  }
}

const videoDal = new VideosDal();

export default videoDal;