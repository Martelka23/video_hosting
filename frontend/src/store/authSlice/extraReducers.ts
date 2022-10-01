import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import RequestError from "../../@types/axios/error";
import { CreatedUserDb } from "../../@types/models/user.model";
import { isError, isFulfilled, isPending } from "../store-tools/matchers";
import { authLoginThunk, authLogoutThunk, authSignupThunk } from "./thunks";
import { AuthState } from "./types";

export const authExtraReducers = (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder
    .addCase(authSignupThunk.fulfilled, (state, action: PayloadAction<CreatedUserDb>) => {
      state.user = action.payload.user;
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
      console.log('result ', action.payload.tokens.accessToken);
      console.log(localStorage.getItem('accessToken'));
    })

    .addCase(authLoginThunk.fulfilled, (state, action: PayloadAction<CreatedUserDb>) => {
      state.user = action.payload.user;
      console.log(action.payload.user);
      console.log('result ', action.payload.tokens.accessToken);
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
    })

    .addCase(authLogoutThunk.fulfilled, (state) => {
      console.log('Lougout fulfilled add case');
      localStorage.removeItem('accessToken');
      state.user = null;
    })

    .addMatcher(isPending('auth'), (state) => {
      state.isLoading = true;
      state.error = null;
      console.log('Login pending from matcher');
    })

    .addMatcher(isFulfilled('auth'), (state) => {
      console.log('Matcher fulfilled');
      state.isLoading = false;
    })

    .addMatcher(isError('auth'), (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload;
      console.log('error!', action.payload);
      state.isLoading = false;
    })
}