import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestError from "../../@types/axios/error";
import User from "../../@types/models/user";
import userService from "../../api/services/user.service";

export const UsersGetAllThunk = createAsyncThunk<User[], undefined, { rejectValue: RequestError }>(
  'users/all',
  async function (_, { rejectWithValue }): Promise<User[]> {
    const response = await userService.getAll();
    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Get users error' });
    }

    return response.data;
  }
);