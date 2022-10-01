import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestError from "../../@types/axios/error";
import { FindChannelDto } from "../../@types/dto/channel.dto";
import Channel from "../../@types/models/channel.model";
import channelService from "../../api/services/channel.service";
import { thunkErrorChecker } from "../store-tools/thunkErrorChecker";

export const ChannelsGetAllThunk = createAsyncThunk<Channel[], FindChannelDto, { rejectValue: RequestError }>(
  'channels/getAll',
  async function (conditions, { rejectWithValue }) {
    const response = await channelService.find(conditions);
    
    return thunkErrorChecker(response, rejectWithValue, 'Channels get all error');
  }
);

export const ChannelsGetOneThunk = createAsyncThunk<Channel, FindChannelDto, { rejectValue: RequestError }>(
  'channels/getById',
  async function (conditions, { rejectWithValue }): Promise<Channel> {
    const response = await channelService.find(conditions);

    return thunkErrorChecker(response, rejectWithValue, 'Channels get one error');
  }
);