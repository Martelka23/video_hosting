import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { VideosCreateThunk, VideosGetCurrentThunk, VideosGetThunk } from "./thunks";
import { VideoState } from "./types";

export const videoExtraReducer = (builder: ActionReducerMapBuilder<VideoState>): void => {
  builder
    .addCase(VideosGetThunk.fulfilled, (state, action) => {
      console.log('videos fulfilled');
      state.videos = action.payload;
    })
    .addCase(VideosGetCurrentThunk.fulfilled, (state, action) => {
      console.log('videos fulfilled');
      state.currentVideo = action.payload;
    })
    .addCase(VideosCreateThunk.fulfilled, (state, action) => {
      console.log('video create fulfilled');
    })
}