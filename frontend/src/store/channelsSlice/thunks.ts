import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestError from "../../@types/axios/error";
import { ChannelSubscribeDto, CreateChannelDto, FindChannelDto, SubscribeCheckDto } from "../../@types/dto/channel.dto";
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

    return thunkErrorChecker(response, rejectWithValue, 'Channels get one error')[0];
  }
);

export const ChannelsCreateThunk = createAsyncThunk<Channel, CreateChannelDto, { rejectValue: RequestError }>(
  'channels/create',
  async function (createChannelDto, { rejectWithValue }): Promise<Channel> {
    const response = await channelService.create(createChannelDto);

    return thunkErrorChecker(response, rejectWithValue, 'Channels get one error')[0];
  }
);

export const ChannelsGetSubscribedCheckThunk = createAsyncThunk<boolean, SubscribeCheckDto, { rejectValue: RequestError }>(
  'channels/subscribeCheck',
  async function (conditions, { rejectWithValue }): Promise<boolean> {
    const response = await channelService.subscribeCheck(conditions);

    return thunkErrorChecker(response, rejectWithValue, 'Subscribe check error');
  }
)

export const ChannelsSubscribeThunk = createAsyncThunk<void, ChannelSubscribeDto, { rejectValue: RequestError }>(
  'channels/subscribe',
  async function (channelSubscribeDto, { rejectWithValue }): Promise<void> {
    const response = await channelService.subscribe(channelSubscribeDto);

    return thunkErrorChecker(response, rejectWithValue, 'Subscribe error');
  }
);