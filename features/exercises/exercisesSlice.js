import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    try {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises",
        {
          headers: {
            "X-RapidAPI-Key": XRAPIDAPIKEY,
            "X-RapidAPI-Host": XRAPIDAPIHOST,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
  },
});

export const { add, setSelectedWorkout } = exercisesSlice.actions;
export default exercisesSlice.reducer;
