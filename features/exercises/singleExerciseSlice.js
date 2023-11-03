import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from '@env';

const config = {
  headers: {
    'X-RapidAPI-Key': XRAPIDAPIKEY,
    'X-RapidAPI-Host': XRAPIDAPIHOST,
  },
};

// export const saveExercise = createAsyncThunk('exercises/saveExercise', async (name) => {
//   const response = await axios.post(
//     'http://localhost:8000/api/exercises',
//     {
//       headers: {
//         'X-RapidAPI-Key': XRAPIDAPIKEY,
//         'X-RapidAPI-Host': XRAPIDAPIHOST,
//       },
//     },
//     {
//       data: selectedSingleExercise,
//       name: name,
//       userId: user._id,
//     }
//   );
//   const data = await response.json();
//   return data;
// });

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(saveExercise.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(saveExercise.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       state.selectedSingleExercise = {};
  //     })
  //     .addCase(saveExercise.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //       state.selectedSingleExercise = {};
  //     });
  // },
});

export const { setSelectedSingleExercise } = selectedSingleExercise.actions;
export default selectedSingleExercise.reducer;
