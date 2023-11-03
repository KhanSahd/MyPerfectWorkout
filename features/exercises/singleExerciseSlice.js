import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const selectedSingleExercise = createSlice({
  name: 'selectedSingleExercise',
  initialState: {
    selectedSingleExercise: {},
  },
  reducers: {
    setSelectedSingleExercise(state, action) {
      state.selectedSingleExercise = action.payload;
    },
  },
});

export const { setSelectedSingleExercise } = selectedSingleExercise.actions;
export default selectedSingleExercise.reducer;
