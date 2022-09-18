import { ActionReducerMapBuilder, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { authLoginThunk, authLogoutThunk, authSignupThunk } from "./thunks";
import { AuthState } from "./types";

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const authExtraReducers = (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder
    .addCase(authSignupThunk.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      console.log('signup pending')
    })
    .addCase(authSignupThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
      state.isLoading = false;
      console.log('result ', action.payload.tokens.accessToken)
      console.log(localStorage.getItem('accessToken'));
    })

    .addCase(authLoginThunk.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(authLoginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      console.log(action.payload.user);
      console.log('result ', action.payload.tokens.accessToken)
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
      state.isLoading = false;
    })

    .addCase(authLogoutThunk.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(authLogoutThunk.fulfilled, (state, action) => {
      state.user = null;
      localStorage.removeItem('accessToken');
    })

    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      console.log('error!', action.payload)
      state.isLoading = false;
    })
}