import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have any
  },
});
