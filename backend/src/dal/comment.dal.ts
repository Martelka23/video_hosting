import pool from "../db";
import sqlGenerator from "./sqlGenerator";
import { DbObject } from "../@types/database";
import Comment, { CommentWithAuthor, CreateCommentDb } from "../@types/models/comment.model";
import { FindCommentDto } from "../@types/dto/comment.dto";

class CommentDal {
  async find(conditions: FindCommentDto): Promise<CommentWithAuthor[]> {
    const conditionsString: string = sqlGenerator.getConditionString(conditions);
    const result = await pool.query(`
      SELECT
        *
      FROM
        comments
      JOIN
        users
          ON comments.user_id = users.id
      ${conditionsString}
    `);
    const comments: CommentWithAuthor[] = sqlGenerator.camelcaseKeys(result.rows) as CommentWithAuthor[];

    return comments;
  }

  async create(createCommentDb: CreateCommentDb): Promise<Comment> {
    const insertString: string = sqlGenerator.getInsertString(createCommentDb as unknown as DbObject);
    const result = await pool.query(`
      INSERT INTO
        comments
      ${insertString}
      RETURNING *
    `);
    const comment: Comment = sqlGenerator.camelcaseKeys(result.rows[0]) as Comment;

    return comment;
  }
}

const commentDal = new CommentDal();

export default commentDal;