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

export const UsersGetByIdThunk = createAsyncThunk<User, number, { rejectValue: RequestError }>(
  'users/getById',
  async function (id, { rejectWithValue }): Promise<User> {
    const response = await userService.getById(id);
    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Get user error' });
    }

    return response.data;
  }
);

export const usersGetCurrentUserThunk = createAsyncThunk<User, undefined, { rejectValue: RequestError }> (
  'users/current_user',
  async function (_, { rejectWithValue }): Promise<User> {
    const response = await userService.getCurrentUser();

    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Get current user error' });
    }

    return response.data;
  }
);