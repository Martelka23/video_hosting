import pool from "../db";
import sqlGenerator from './sqlGenerator';
import User, { CreateUserDb, FindUsersDb, UpdateUserDb } from "../@types/models/user";
import { DbObject } from "../@types/database";

class UserDal {
  async find(conditions: FindUsersDb = {}): Promise<User[]> {
    const conditionsString: string = sqlGenerator.getConditionString(conditions);
    console.log(conditionsString);
    
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

  async update(userId: number, updateUserDb: UpdateUserDb): Promise<User> {
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
}

const userDal = new UserDal();

export default userDal;