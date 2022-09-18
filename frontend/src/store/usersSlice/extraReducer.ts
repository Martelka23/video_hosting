import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UsersGetAllThunk, UsersGetByIdThunk, usersGetCurrentUserThunk } from "./thunks";

import { UsersState } from "./types";

export const usersExtraReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder
    .addCase(UsersGetAllThunk.pending, (state, action) => {
      console.log('users pending');
    })
    .addCase(UsersGetAllThunk.fulfilled, (state, action) => {
      console.log('users fulfilled');
      state.users = action.payload;
    })
    
    .addCase(UsersGetByIdThunk.pending, (state, action) => {
      console.log('pending user');
    })
    .addCase(UsersGetByIdThunk.fulfilled, (state, action) => {
      console.log('user fulfiled');
      state.userProfile = action.payload;
    })

    .addCase(usersGetCurrentUserThunk.pending, (state, action) => {
      console.log('pending current user');
    })
    .addCase(usersGetCurrentUserThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      console.log('fullfiled current user');
    })
};