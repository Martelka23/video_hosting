import pool from "../db";
import { DbObject } from "../@types/database";
import Token, { CreateTokenDb, FindTokenDb, UpdateTokenDb } from "../@types/models/token";
import sqlGenerator from './sqlGenerator';

class TokenDal {
  async find(conditions: FindTokenDb): Promise<Token> {
    const conditionsString: string = sqlGenerator.getConditionString(conditions);
    console.log(`
      SELECT
        *
      FROM
        tokens
      ${conditionsString}
    `); 
    const result = await pool.query(`
      SELECT
        *
      FROM
        tokens
      ${conditionsString}
    `);
    const token: Token = sqlGenerator.camelcaseKeys(result.rows[0]) as Token;

    return token;
  }

  async create(createTokenDb: CreateTokenDb): Promise<Token> {
    const insertString: string = sqlGenerator.getInsertString(createTokenDb as unknown as DbObject);
    const result = await pool.query(`
      INSERT INTO
        tokens
      ${insertString}
      RETURNING *
    `);
    const token: Token = sqlGenerator.camelcaseKeys(result.rows[0]) as Token;

    return token;
  }

  async update(updateTokenDb: UpdateTokenDb): Promise<Token> {
    const result = await pool.query(`
      UPDATE
        tokens
      SET
        refresh_token = '${updateTokenDb.refreshToken}'
      WHERE
        user_id = ${updateTokenDb.userId}
      RETURNING
        *
    `);
    const token: Token = sqlGenerator.camelcaseKeys(result.rows[0]) as Token;

    return token;
  }

  async removeToken(refreshToken: string) {
    await pool.query(`
      DELETE FROM
        tokens
      WHERE
        refresh_token = '${refreshToken}'
    `);
  }
}

const tokenDal: TokenDal = new TokenDal();

export default tokenDal;