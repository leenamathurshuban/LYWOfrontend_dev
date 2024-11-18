import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./menu/menuSlice";

export const store = configureStore({
  reducer: {
    Login: LoginReducer,
  },
  devTools: false,
});
