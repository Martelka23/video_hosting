import pool from "../db";
import sqlGenerator from './sqlGenerator';
import User, { CreateUserDb } from "../@types/models/user.model";
import { FindUsersDto, UpdateUserDto } from "../@types/dto/user.dto";
import { DbObject } from "../@types/database";

class UserDal {
  async find(conditions: FindUsersDto = {}): Promise<User[]> {
    const conditionsString: string = sqlGenerator.getConditionString(conditions);    
    const result = await pool.query(`
      SELECT
        *
      FROM
        users
      ${conditionsString}
    `);
    const users: User[] = sqlGenerator.camelcaseKeys(result.rows) as User[];

    return users;
  }

  async create(createUserDb: CreateUserDb): Promise<User> {
    const insertString: string = sqlGenerator.getInsertString(createUserDb as unknown as DbObject)
    const result = await pool.query(`
      INSERT INTO
        users
      ${insertString}
      RETURNING *
    `);
    const user: User = sqlGenerator.camelcaseKeys(result.rows[0]) as User;

    return user;
  }

  async update(userId: number, updateUserDb: UpdateUserDto): Promise<User> {
    const setString = sqlGenerator.getSetString(updateUserDb);
    const result = await pool.query(`
      UPDATE
        users
      SET
        ${setString}
      WHERE
        id = ${userId}
      RETURNING
        *
    `);
    const user: User = sqlGenerator.camelcaseKeys(result.rows[0]) as User;

    return user;
  }

  async getSubscriptions(userId: number): Promise<number[]> {
    const result = await pool.query(`
      SELECT
        channel_id
      FROM
        user_subscribtions
      WHERE
        user_id = ${userId}
      `);
      const channelIds: number[] = result.rows.map(value => value.channel_id);

    return channelIds;
  }
}

const userDal = new UserDal();

export default userDal;