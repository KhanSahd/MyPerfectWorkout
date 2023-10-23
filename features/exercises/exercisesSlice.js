import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from "@env";

const config = {
  headers: {
    "X-RapidAPI-Key": XRAPIDAPIKEY,
    "X-RapidAPI-Host": XRAPIDAPIHOST,
  },
};

const initialState = {
  // All Exercises:
  exercises: [],

  // Selected Workout
  selectedWorkout: [],

  error: "",
  loading: false,
  menuShown: false,
};

// Async Thunk
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
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
  }
);

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    add(state, action) {
      state.exercises = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
      state.error = "";
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.exercises = [];
      state.error = action.error.message;
    });
  },
});

export const { add } = exercisesSlice.actions;
export default exercisesSlice.reducer;
