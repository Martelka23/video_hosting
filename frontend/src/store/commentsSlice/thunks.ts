import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestError from "../../@types/axios/error";
import { CreateCommentDto, FindCommentDto } from "../../@types/dto/comment.dto";
import Comment, { CommentWithAuthor } from "../../@types/models/comment.model";
import commentService from "../../api/services/comment.service";
import { thunkErrorChecker } from "../store-tools/thunkErrorChecker";

export const CommentsFindAsyncThunk = createAsyncThunk<CommentWithAuthor[], FindCommentDto, { rejectValue: RequestError }>(
  'comments/find',
  async function (conditions, { rejectWithValue }): Promise<CommentWithAuthor[]> {
    const response = await commentService.find(conditions);

    return thunkErrorChecker(response, rejectWithValue, 'Find comments error');
  }
);

export const CommentsCreateAsyncThunk = createAsyncThunk<Comment, CreateCommentDto, { rejectValue: RequestError }>(
  'comments/create',
  async function (createCommentDto, { rejectWithValue }): Promise<Comment> {
    const response = await commentService.create(createCommentDto);

    return thunkErrorChecker(response, rejectWithValue, 'Create comments error');
  }
);