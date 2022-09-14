import { createSlice } from "@reduxjs/toolkit";
import { authExtraReducers } from "./extraReducers";
import { AuthState } from "./types";


const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: authExtraReducers
});

const authReducer = authSlice.reducer;
export default authReducer;