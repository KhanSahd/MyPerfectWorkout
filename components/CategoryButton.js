import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorkout } from '../features/exercises/selectedExerciseSlice';

const CategoryButton = ({ text, page, category, target, color, space }) => {
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
      case 'random':
        filteredExercises = exercises;
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

  return (
    <TouchableOpacity
      onPress={() => (page ? navigation.navigate(page) : category ? selectWorkout() : '')}
      className={` w-96 p-10 border items-center justify-center rounded-lg ${
        space ? 'mb-5' : ''
      }  `}
      style={{
        backgroundColor: color ? color : '',
        // background: color ? color : 'linear-gradient(0deg, #f350d1 0%, #52aaf0 100%)',
      }}>
      <Text className={`text-2xl text-white font-extrabold shadow-sm shadow-black `}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
