import { createSlice } from "@reduxjs/toolkit";
import { channelsExtraReducer } from "./extraReducers";
import { ChannelsState } from "./types";

const initialState: ChannelsState = {
  channels: null,
  channel: null,
  isLoading: false,
  error: null
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: channelsExtraReducer 
});

const channelReducer = channelsSlice.reducer;

export default channelReducer;