import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestError from "../../@types/axios/error";
import User from "../../@types/models/user.model";
import userService from "../../api/services/user.service";
import { thunkErrorChecker } from "../store-tools/thunkErrorChecker";

export const UsersGetAllThunk = createAsyncThunk<User[], undefined, { rejectValue: RequestError }>(
  'users/all',
  async function (_, { rejectWithValue }): Promise<User[]> {
    const response = await userService.find();

    return thunkErrorChecker(response, rejectWithValue, 'Get users error');
  }
);

export const UsersGetUserProfileThunk = createAsyncThunk<User, number, { rejectValue: RequestError }>(
  'users/getById',
  async function (id, { rejectWithValue }): Promise<User> {
    const response = await userService.find({ id });
    
    return thunkErrorChecker(response, rejectWithValue, 'Get users error')[0];
  }
);

export const usersGetCurrentUserThunk = createAsyncThunk<User, undefined, { rejectValue: RequestError }>(
  'users/current_user',
  async function (_, { rejectWithValue }): Promise<User> {
    const response = await userService.getCurrentUser();

    return thunkErrorChecker(response, rejectWithValue, 'Get current user error');
  }
);