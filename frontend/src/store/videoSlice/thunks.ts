import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestError from "../../@types/axios/error";
import { CreateVideoDb, FindVideoDb, Video } from "../../@types/models/video";
import videoService from "../../api/services/video.service";

export const VideosGetThunk = createAsyncThunk<Video[], FindVideoDb | undefined, { rejectValue: RequestError }>(
  'videos/get',
  async function (conditions, { rejectWithValue }): Promise<Video[]> {
    const response = await videoService.find(conditions);
    if (response.status !== 200) {
      rejectWithValue({ status: response.status, message: 'Find video error' });
    }

    return response.data;
  }
);

export const VideosGetCurrentThunk = createAsyncThunk<Video, FindVideoDb | undefined, { rejectValue: RequestError }>(
  'videos/getCurrent',
  async function (conditions, { rejectWithValue }): Promise<Video> {
    const response = await videoService.find(conditions);
    if (response.status !== 200) {
      rejectWithValue({ status: response.status, message: 'Find video error' });
    }

    return response.data[0];
  }
);

export const VideosCreateThunk = createAsyncThunk<Video, CreateVideoDb, { rejectValue: RequestError }>(
  'videos/create',
  async function (createVideoDb, { rejectWithValue }): Promise<Video> {
    const response = await videoService.create(createVideoDb);
    if (response.status !== 201) {
      rejectWithValue({ status: response.status, message: 'Create video error' });
    }

    return response.data;
  }
);