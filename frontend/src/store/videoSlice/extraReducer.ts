import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { isError, isFulfilled, isPending } from "../store-tools/matchers";
import { VideosCreateThunk, VideosGetCurrentThunk, VideosGetThunk, VideosSelectedCheckThunk } from "./thunks";
import { VideoState } from "./types";
import RequestError from "../../@types/axios/error";
import Video from "../../@types/models/video.model";

export const videoExtraReducer = (builder: ActionReducerMapBuilder<VideoState>): void => {
  builder
    .addCase(VideosGetThunk.fulfilled, (state, action: PayloadAction<Video[]>) => {
      console.log('videos fulfilled');
      state.videos = action.payload;
    })

    .addCase(VideosGetCurrentThunk.fulfilled, (state, action: PayloadAction<Video>) => {
      console.log('videos fulfilled');
      state.currentVideo = action.payload;
    })

    .addCase(VideosCreateThunk.fulfilled, (state, action: PayloadAction<Video>) => {
      console.log('video create fulfilled');
    })

    .addCase(VideosSelectedCheckThunk.fulfilled, (state, action: PayloadAction<"like" | "dislike" | null>) => {
      state.selectedRate = action.payload;
      console.log(action.payload)
    })

    .addMatcher(isPending('videos'), (state) => {
      state.isLoading = true;
      state.error = null;
      console.log('Login pending from matcher');
    })

    .addMatcher(isFulfilled('videos'), (state) => {
      state.isLoading = false;
    })

    .addMatcher(isError('videos'), (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload;
      console.log('error!', action.payload)
      state.isLoading = false;
    })
}