import { DbObject } from "../@types/database";
import { ChannelSubscribeDto, FindChannelDto } from "../@types/dto/channel.dto";
import Channel, { CreateChannelDb } from "../@types/models/channel.model";
import SubscribersAntiDuplicate from "../@types/models/subscribers-antiduplicate.model";
import pool from "../db";
import sqlGenerator from "./sqlGenerator";

class ChannelDal {
  async createChannel(createChannelDb: CreateChannelDb): Promise<Channel> {
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

  async updateSubscribers(channelId: number, value: -1 | 1): Promise<Channel> {
    const result = await pool.query(`
      UPDATE
        channels
      SET
        subscribers = subscribers + ${value}
      WHERE
        id = ${channelId}
      RETURNING *
    `);
    const channel: Channel = sqlGenerator.camelcaseKeys(result.rows[0]) as Channel;

    return channel
  }

  async addAntiDuplicate(userId: number, channelId: number): Promise<void> {
    const insertString = sqlGenerator.getInsertString({ userId, channelId });
    await pool.query(`
      INSERT INTO
        user_subscribtions
      ${insertString}
    `);
  }

  async removeAntiDuplicate(userId: number, channelId: number): Promise<SubscribersAntiDuplicate | undefined> {
    const conditionsString = sqlGenerator.getConditionString({ userId, channelId });
    const result = await pool.query(`
      DELETE FROM
        user_subscribtions
      ${conditionsString}
      RETURNING *
    `);
    const subscribersAntiDuplicate: SubscribersAntiDuplicate = sqlGenerator.camelcaseKeys(result.rows[0]);

    return subscribersAntiDuplicate;
  }

  async findAntiDuplicate(userId: number, channelId: number): Promise<SubscribersAntiDuplicate | undefined> {
    const conditionsString = sqlGenerator.getConditionString({ userId, channelId });
    const result = await pool.query(`
      SELECT FROM
        user_subscribtions
      ${conditionsString}
    `);
    const subscribersAntiDuplicate: SubscribersAntiDuplicate = sqlGenerator.camelcaseKeys(result.rows[0]);

    return subscribersAntiDuplicate;
  }
}

const channelDal = new ChannelDal();

export default channelDal;