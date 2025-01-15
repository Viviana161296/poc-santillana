import { configureStore } from '@reduxjs/toolkit';
import curriculumReducer from './slices/curriculumSlice';

export const store = configureStore({
  reducer: {
    curriculum: curriculumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;