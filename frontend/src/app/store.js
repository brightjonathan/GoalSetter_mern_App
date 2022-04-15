import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalSlice from '../features/goal/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalSlice,
  },
});





