import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";


const mainReducer = combineReducers({
  usersReducer,
  authReducer
})

const store = configureStore({
  reducer: mainReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;