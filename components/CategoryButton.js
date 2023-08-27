import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWorkout } from "../features/exercises/exercisesSlice";

const CategoryButton = ({ text, page, category }) => {
  // Navigation Object
  const navigation = useNavigation();

  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();

  const selectWorkout = () => {
    let filteredExercises = [];

    switch (category) {
      case "body part":
        filteredExercises = exercises.filter(
          (exercise) => exercise.bodyPart === text
        );
        break;
      case "equipment":
        filteredExercises = exercises.filter(
          (exercise) => exercise.equipment === text
        );
        break;
      case "target":
        filteredExercises = exercises.filter(
          (exercise) => exercise.target === text
        );
        break;
    }
    dispatch(setSelectedWorkout(filteredExercises));
    navigation.navigate("Exercise Screen");
  };

  return (
    <TouchableOpacity
      onPress={() =>
        page ? navigation.navigate(page) : category ? selectWorkout() : ""
      }
      className="bg-white p-3 w-2/4 items-center rounded-full"
    >
      <Text className="font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
