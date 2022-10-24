import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { CommentWithAuthor } from "../../@types/models/comment.model"
import { CommentsFindAsyncThunk } from "./thunks"
import CommentsState from "./types"

export const commentsExtraReducer = (builder: ActionReducerMapBuilder<CommentsState>): void => {
  builder
    .addCase(CommentsFindAsyncThunk.fulfilled, (state, action: PayloadAction<CommentWithAuthor[]>) => {
      state.comments = action.payload;
    })
}