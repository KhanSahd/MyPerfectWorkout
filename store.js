import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import exercisesReducer from "./features/exercises/exercisesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    exercises: exercisesReducer,
  },
});
