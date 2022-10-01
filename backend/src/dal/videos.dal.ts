import pool from "../db";
import sqlGenerator from "./sqlGenerator";
import { DbObject } from "../@types/database";
import Video from "../@types/models/videos.model";
import { CreateVideoDto, FindVideoDto } from "../@types/dto/video.dto";

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
}

const videoDal = new VideosDal();

export default videoDal;