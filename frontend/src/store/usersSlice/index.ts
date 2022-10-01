import { createSlice } from "@reduxjs/toolkit";
import { usersExtraReducer } from "./extraReducer";
import { UsersState } from "./types";

const initialState: UsersState = {
  users: [],
  userProfile: undefined,
  currentUser: undefined,
  isLoading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: usersExtraReducer,
});

const usersReducer = usersSlice.reducer;
export default usersReducer;