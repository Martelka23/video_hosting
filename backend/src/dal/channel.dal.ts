import { DbObject } from "../@types/database";
import { CreateChannelDto, FindChannelDto } from "../@types/dto/channel.dto";
import Channel from "../@types/models/channel.model";
import pool from "../db";
import sqlGenerator from "./sqlGenerator";

class ChannelDal {
  async createChannel(createChannelDb: CreateChannelDto): Promise<Channel> {
    const insertString: string = sqlGenerator.getInsertString(createChannelDb as unknown as DbObject);
    const result = await pool.query(`
      INSERT INTO
        channels
      ${insertString}
      RETURNING *
    `);
    const channel: Channel = sqlGenerator.camelcaseKeys(result.rows[0]) as Channel;

    return channel;
  }

  async find(conditions?: FindChannelDto): Promise<Channel[]> {
    const conditionsString: string = sqlGenerator.getConditionString(conditions);
    const result = await pool.query(`
      SELECT
        *
      FROM
        channels
      ${conditionsString}
    `);
    const channels: Channel[] = sqlGenerator.camelcaseKeys(result.rows) as Channel[];

    return channels;
  }
}

const channelDal = new ChannelDal();

export default channelDal;