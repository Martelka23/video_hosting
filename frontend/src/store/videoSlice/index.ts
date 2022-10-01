import { createSlice } from "@reduxjs/toolkit";
import { videoExtraReducer } from "./extraReducer";
import { VideoState } from "./types";

const initialState: VideoState = {
  currentVideo: null,
  videos: null,
  isLoading: false,
  error: null
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: videoExtraReducer
});

const videoReducer = videosSlice.reducer;

export default videoReducer;