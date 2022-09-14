import { createSlice } from "@reduxjs/toolkit";
import { usersExtraReducer } from "./extraReducer";
import { UsersState } from "./types";

const initialState: UsersState = {
  users: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: usersExtraReducer,
});

const usersReducer = usersSlice.reducer;
export default usersReducer;