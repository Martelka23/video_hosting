import { createAsyncThunk } from "@reduxjs/toolkit";

import videoService from "../../api/services/video.service";
import RequestError from "../../@types/axios/error";
import Video from "../../@types/models/video.model";
import { CreateVideoDto, FindVideoDto } from "../../@types/dto/video.dto";
import { thunkErrorChecker } from "../store-tools/thunkErrorChecker";

export const VideosGetThunk = createAsyncThunk<Video[], FindVideoDto | undefined, { rejectValue: RequestError }>(
  'videos/get',
  async function (conditions, { rejectWithValue }): Promise<Video[]> {
    const response = await videoService.find(conditions);
    
    return thunkErrorChecker(response, rejectWithValue, 'Find video error');
  }
);

export const VideosGetCurrentThunk = createAsyncThunk<Video, FindVideoDto | undefined, { rejectValue: RequestError }>(
  'videos/getCurrent',
  async function (conditions, { rejectWithValue }): Promise<Video> {
    const response = await videoService.find(conditions);
    
    return thunkErrorChecker(response, rejectWithValue, 'Find video error');
  }
);

export const VideosCreateThunk = createAsyncThunk<Video, CreateVideoDto, { rejectValue: RequestError }>(
  'videos/create',
  async function (createVideoDb, { rejectWithValue }): Promise<Video> {
    const response = await videoService.create(createVideoDb);
    
    return thunkErrorChecker(response, rejectWithValue, 'Create video error');
  }
);