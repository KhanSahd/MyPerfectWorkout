import { createSlice } from "@reduxjs/toolkit";

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
  },
  reducers: {
    add(state, action) {
      state.exercises = action.payload;
    },
  },
});

export const { add } = exercisesSlice.actions;
export default exercisesSlice.reducer;
