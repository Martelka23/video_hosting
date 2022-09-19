import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ChannelsGetAllThunk, ChannelsGetByIdThunk, ChannelsGetByUserIdThunk } from "./thunks";
import { ChannelsState } from "./types";

export const channelsExtraReducer = (builder: ActionReducerMapBuilder<ChannelsState>): void => {
  builder
    .addCase(ChannelsGetAllThunk.fulfilled, (state, action) => {
      state.channels = action.payload;
      console.log('channels get all fulfilled');
    })
    .addCase(ChannelsGetByIdThunk.fulfilled, (state, action) => {
      state.channels = action.payload;
      console.log('channels get by id fulfilled');
    })
    .addCase(ChannelsGetByUserIdThunk.fulfilled, (state, action) => {
      state.channels = action.payload;
      console.log('channels get by user id fulfilled');
    })
}