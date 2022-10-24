import { createSlice } from "@reduxjs/toolkit";
import { commentsExtraReducer } from "./extraReducers";
import CommentsState from "./types";

const initialState: CommentsState = {
  comments: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: commentsExtraReducer
});

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;