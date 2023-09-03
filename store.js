import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import exercisesReducer from "./features/exercises/exercisesSlice";
import authReducer from "./features/auth/authSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    exercises: exercisesReducer,
    auth: authReducer,
  },
});
