import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UsersGetAllThunk } from "./thunks";

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
};