import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestError from "../../@types/axios/error";
import Channel from "../../@types/models/channel";
import channelService from "../../api/services/channel.service";

export const ChannelsGetAllThunk = createAsyncThunk<Channel[], undefined, { rejectValue: RequestError }>(
  'channels/getAll',
  async function (_, { rejectWithValue }): Promise<Channel[]> {
    const response = await channelService.getAll();
    if (response.status !== 200) {
      rejectWithValue({ status: response.status, message: 'Channels get all error' });
    }

    return response.data;
  }
);

export const ChannelsGetByIdThunk = createAsyncThunk<Channel[], number, { rejectValue: RequestError }>(
  'channels/getById',
  async function (channelId, { rejectWithValue }): Promise<Channel[]> {
    const response = await channelService.getById(channelId);
    if (response.status !== 200) {
      rejectWithValue({ status: response.status, message: 'Channels get by id error' });
    }

    return response.data;
  }
);

export const ChannelsGetByUserIdThunk = createAsyncThunk<Channel[], number, { rejectValue: RequestError }>(
  'channels/getByUserId',
  async function (userId, { rejectWithValue }): Promise<Channel[]> {
    const response = await channelService.getByUserId(userId);
    if (response.status !== 200) {
      rejectWithValue({ status: response.status, message: 'Channels get by userId error' });
    }

    return response.data;
  }
);