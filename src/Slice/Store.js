import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './Login/LoginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice
  },
});



