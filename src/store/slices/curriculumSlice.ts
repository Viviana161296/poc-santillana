import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThematicAxis, Topic, Content } from '../../types/curriculum';

interface CurriculumState {
  axes: ThematicAxis[];
  selectedAxisId: number | null;
  selectedTopicId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurriculumState = {
  axes: [],
  selectedAxisId: null,
  selectedTopicId: null,
  loading: false,
  error: null,
};

const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    setAxes: (state, action: PayloadAction<ThematicAxis[]>) => {
      state.axes = action.payload;
    },
    setSelectedAxis: (state, action: PayloadAction<number | null>) => {
      state.selectedAxisId = action.payload;
    },
    setSelectedTopic: (state, action: PayloadAction<number | null>) => {
      state.selectedTopicId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAxes,
  setSelectedAxis,
  setSelectedTopic,
  setLoading,
  setError,
} = curriculumSlice.actions;

export default curriculumSlice.reducer;