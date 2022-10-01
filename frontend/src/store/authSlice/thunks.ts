import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../api/services/auth.service";
import RequestError from "../../@types/axios/error";
import { CreatedUserDb } from "../../@types/models/user.model";
import { CreateUserDto, LoginUserDto } from "../../@types/dto/user.dto";
import { thunkErrorChecker } from "../store-tools/thunkErrorChecker";

export const authSignupThunk = createAsyncThunk<CreatedUserDb, CreateUserDto, { rejectValue: RequestError }>(
  'auth/signup',
  async function (createUserDto, { rejectWithValue }): Promise<CreatedUserDb> {
    const response = await authService.signup(createUserDto);

    return thunkErrorChecker(response, rejectWithValue, 'Auth error');
  }
);

export const authLoginThunk = createAsyncThunk<CreatedUserDb, LoginUserDto, { rejectValue: RequestError }>(
  'auth/login',
  async function (loginUserDto, { rejectWithValue }): Promise<CreatedUserDb> {
    const response = await authService.login(loginUserDto);
    
    return thunkErrorChecker(response, rejectWithValue, 'Login error');
  }
);

export const authLogoutThunk = createAsyncThunk<string, undefined, { rejectValue: RequestError }>(
  'auth/logout',
  async function (_, { rejectWithValue }): Promise<string> {
    const response = await authService.logout();
    
    return thunkErrorChecker(response, rejectWithValue, 'Logout error');
  }
);