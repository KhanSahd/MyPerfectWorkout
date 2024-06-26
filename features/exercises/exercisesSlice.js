import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';

const config = {
  headers: {
    'X-RapidAPI-Key': XRAPIDAPIKEY,
    'X-RapidAPI-Host': XRAPIDAPIHOST,
  },
};

const initialState = {
  // All Exercises:
  exercises: [],
  savedExercises: [],
  error: '',
  loading: false,
  menuShown: false,
};

// Async Thunk
export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
  const response = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=2000', {
    headers: {
      'X-RapidAPI-Key': XRAPIDAPIKEY,
      'X-RapidAPI-Host': XRAPIDAPIHOST,
    },
  });
  const data = await response.json();
  return data;
});

export const fetchSavedExercises = createAsyncThunk(
  'exercises/fetchedSavedExercises',
  async (id) => {
    const response = await fetch(
      `https://myperfectworkoutapi.onrender.com/api/exercises?id=${id}`,
      {
        headers: {
          'X-RapidAPI-Key': XRAPIDAPIKEY,
          'X-RapidAPI-Host': XRAPIDAPIHOST,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteExercise = createAsyncThunk(
  'exercises/deleteExercise',
  async (exerciseId, workoutId) => {
    const response = await fetch(`https://myperfectworkoutapi.onrender.com/api/exercises`, {
      method: 'DELETE',
      body: JSON.stringify({ exerciseId, workoutId }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    add(state, action) {
      state.exercises = action.payload;
    },
    addToSaved(state, action) {
      state.savedExercises = [...state.savedExercises, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
      state.error = '';
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.exercises = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchSavedExercises.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.savedExercises = action.payload;
      state.error = '';
    });
  },
});

export const { add, addToSaved } = exercisesSlice.actions;
export default exercisesSlice.reducer;
