import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorkout } from '../features/exercises/selectedExerciseSlice';

const CategoryButton = ({ text, page, category, target }) => {
  // Navigation Object
  const navigation = useNavigation();

  const exercises = useSelector((state) => state.exercises.exercises);
  const savedExercises = useSelector((state) => state.exercises.savedExercises);
  const dispatch = useDispatch();

  const selectWorkout = () => {
    let filteredExercises = [];

    switch (category) {
      case 'body part':
        filteredExercises = exercises.filter((exercise) => exercise.bodyPart === text);
        break;
      case 'equipment':
        filteredExercises = exercises.filter((exercise) => exercise.equipment === text);
        break;
      case 'target':
        filteredExercises = exercises.filter((exercise) => exercise.target === text);
        break;
      case 'Saved Exercises':
        const savedWorkout = savedExercises.filter((exercise) => exercise.name === text);
        const workoutIds = savedWorkout[0].exercises.map((exercise) => exercise.data.id);
        filteredExercises = exercises.filter((exercise) => workoutIds.includes(exercise.id));
        break;
    }
    dispatch(setSelectedWorkout(filteredExercises));
    navigation.navigate('Exercise Screen');
  };

  return target ? (
    <TouchableOpacity
      onPress={() => (page ? navigation.navigate(page) : category ? selectWorkout() : '')}
      className={`bg-white p-3 ${target ? 'w-36' : 'w-2/4'} items-center mb-5 mr-5 rounded-full `}>
      <Text className="font-bold text-md text-center">{text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => (page ? navigation.navigate(page) : category ? selectWorkout() : '')}
      className="bg-white p-3 w-2/4 items-center rounded-full">
      <Text className="font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
