import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from './features/exercises/exercisesSlice';
import authReducer from './features/auth/authSlice';
import saveMenuReducer from './features/SaveMenu/saveMenuSlice';
import selectWorkoutReducer from './features/exercises/selectedExerciseSlice';
import selectedSingleExerciseReducer from './features/exercises/singleExerciseSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    auth: authReducer,
    saveMenu: saveMenuReducer,
    selectedWorkout: selectWorkoutReducer,
    selectedSingleExercise: selectedSingleExerciseReducer,
  },
});
