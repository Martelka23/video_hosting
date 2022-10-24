import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import videoReducer from "./videoSlice";
import channelsReducer from "./channelsSlice";
import commentsReducer from "./commentsSlice";


const mainReducer = combineReducers({
  authReducer,
  usersReducer,
  videoReducer,
  channelsReducer,
  commentsReducer
});

const store = configureStore({
  reducer: mainReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;