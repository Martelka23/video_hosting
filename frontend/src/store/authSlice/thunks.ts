import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestError from "../../@types/axios/error";
import { CreatedUserDb, CreateUserDto, LoginUserDto } from "../../@types/models/user";
import authService from "../../api/services/auth.service";

export const authSignupThunk = createAsyncThunk<CreatedUserDb, CreateUserDto, { rejectValue: RequestError }>(
  'auth/signup',
  async function (createUserDto, { rejectWithValue }): Promise<CreatedUserDb> {
    const response = await authService.signup(createUserDto);
    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Auth error' });
    }

    return response.data;
  }
);

export const authLoginThunk = createAsyncThunk<CreatedUserDb, LoginUserDto, { rejectValue: RequestError }>(
  'auth/login',
  async function (loginUserDto, { rejectWithValue }): Promise<CreatedUserDb> {
    const response = await authService.login(loginUserDto);
    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Login error' });
    }

    return response.data;
  }
);

export const authLogoutThunk = createAsyncThunk<string, undefined, { rejectValue: RequestError }>(
  'auth/logout',
  async function (_, { rejectWithValue }): Promise<string> {
    const response = await authService.logout();
    if (response.status >= 300) {
      rejectWithValue({ status: response.status, message: 'Logout error' });
    }

    return response.data;
  }
)