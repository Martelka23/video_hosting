import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { isError, isFulfilled, isPending } from "../store-tools/matchers";
import { UsersGetAllThunk, UsersGetUserProfileThunk, usersGetCurrentUserThunk, UsersPutCurrentUserThunk, UsersGetSubscriptionsThunk } from "./thunks";
import { UsersState } from "./types";
import User from "../../@types/models/user.model";
import RequestError from "../../@types/axios/error";

export const usersExtraReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(UsersGetAllThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
      console.log('users fulfilled');
      state.users = action.payload;
    })
    
    .addCase(UsersGetUserProfileThunk.fulfilled, (state, action: PayloadAction<User>) => {
      console.log('user fulfiled');
      state.userProfile = action.payload;
    })

    .addCase(usersGetCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      console.log('fullfiled current user');
    })

    .addCase(UsersPutCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    })

    .addCase(UsersGetSubscriptionsThunk.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.subscribedChannels = action.payload;
    })

    .addMatcher(isPending('users'), (state) => {
      state.isLoading = true;
      state.error = null;
      console.log('Login pending from matcher');
    })

    .addMatcher(isFulfilled('users'), (state) => {
      state.isLoading = false;
    })

    .addMatcher(isError('users'), (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload;
      console.log('error!', action.payload);
      state.isLoading = false;
    })
};