import { createAsyncThunk } from "@reduxjs/toolkit";

import videoService from "../../api/services/video.service";
import RequestError from "../../@types/axios/error";
import Video from "../../@types/models/video.model";
import { CheckAntiDuplicateDto, CreateVideoDto, FindVideoDto, VideoStatDto } from "../../@types/dto/video.dto";
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
    
    return thunkErrorChecker(response, rejectWithValue, 'Find video error')[0];
  }
);

export const VideosSelectedCheckThunk = createAsyncThunk<'like' | 'dislike' | null, CheckAntiDuplicateDto, { rejectValue: RequestError }>(
  'videos/selectedCheck',
  async function (conditions, { rejectWithValue }): Promise<'like' | 'dislike' | null> {
    const response = await videoService.selectedCheck(conditions);
    
    return thunkErrorChecker(response, rejectWithValue, 'Selected check error');
  }
);

export const VideosUpdateStatThunk = createAsyncThunk<void, VideoStatDto, { rejectValue: RequestError }>(
  'videos/updateStat',
  async function (videoStatDto): Promise<void> {
    await videoService.updateStat(videoStatDto);
  }
);

export const VideosCreateThunk = createAsyncThunk<Video, CreateVideoDto, { rejectValue: RequestError }>(
  'videos/create',
  async function (createVideoDb, { rejectWithValue }): Promise<Video> {
    const response = await videoService.create(createVideoDb);
    
    return thunkErrorChecker(response, rejectWithValue, 'Create video error')[0];
  }
);