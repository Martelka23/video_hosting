import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { ChannelsGetAllThunk, ChannelsGetOneThunk } from "./thunks";
import { isError, isFulfilled, isPending } from "../store-tools/matchers";
import { ChannelsState } from "./types";
import RequestError from "../../@types/axios/error";
import Channel from "../../@types/models/channel.model";

export const channelsExtraReducer = (builder: ActionReducerMapBuilder<ChannelsState>): void => {
  builder
    .addCase(ChannelsGetAllThunk.fulfilled, (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
      console.log(action.type)
    })

    .addCase(ChannelsGetOneThunk.fulfilled, (state, action: PayloadAction<Channel>) => {
      state.channel = action.payload;
      console.log(action.payload);
    })

    .addMatcher(isPending('channels'), (state) => {
      state.isLoading = true;
      state.error = null;
      console.log('Login pending from matcher');
    })

    .addMatcher(isFulfilled('channels'), (state) => {
      state.isLoading = false;
    })

    .addMatcher(isError('channels'), (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload;
      console.log('error!', action.payload)
      state.isLoading = false;
    })
}