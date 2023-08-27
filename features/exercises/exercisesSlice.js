import { createSlice } from "@reduxjs/toolkit";

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    // All Exercises:
    exercises: [],

    // Selected Workout
    selectedWorkout: [],
  },
  reducers: {
    add(state, action) {
      state.exercises = action.payload;
    },
    setSelectedWorkout(state, action) {
      state.selectedWorkout = action.payload;
    },

    // Body Parts:
    getByBody(state, action) {
      bodypart = action.payload;
      state.bodypart = state.exercises.filter(
        (item) => item.bodyPart === action.payload
      );
    },
  },
});

export const { add, setSelectedWorkout } = exercisesSlice.actions;
export default exercisesSlice.reducer;
