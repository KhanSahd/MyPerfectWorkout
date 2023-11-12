import { createSlice } from '@reduxjs/toolkit';

export const selectedWorkoutSlice = createSlice({
  name: 'selectedWorkout',
  initialState: {
    selectedWorkout: [],
  },
  reducers: {
    setSelectedWorkout(state, action) {
      state.selectedWorkout = action.payload;
    },
  },
});

export const { setSelectedWorkout } = selectedWorkoutSlice.actions;
export default selectedWorkoutSlice.reducer;
