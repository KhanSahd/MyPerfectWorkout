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
    let shouldRandomize = true;
    let meta;

    switch (category) {
      case 'body part':
        filteredExercises = exercises.filter((exercise) => exercise.bodyPart === text);
        shouldRandomize = true;
        break;
      case 'equipment':
        filteredExercises = exercises.filter((exercise) => exercise.equipment === text);
        shouldRandomize = true;
        break;
      case 'target':
        filteredExercises = exercises.filter((exercise) => exercise.target === text);
        shouldRandomize = true;
        break;
      case 'random':
        filteredExercises = exercises;
        shouldRandomize = true;
        break;
      case 'Saved Exercises':
        const savedWorkout = savedExercises.filter((exercise) => exercise.name === text);
        const { _id, name, userId } = savedWorkout[0];

        // Create an array to store the original order of workoutIds
        const workoutOrder = savedWorkout[0].exercises.map((exercise) => exercise.data.id);

        const workoutIds = new Set(workoutOrder); // Use a Set for faster lookup
        filteredExercises = exercises.filter((exercise) => workoutIds.has(exercise.id));

        // Maintain the order of the original savedWorkout array
        filteredExercises = workoutOrder.map((id) =>
          filteredExercises.find((exercise) => exercise.id === id)
        );
        meta = {
          _id: _id,
          name: name,
          userId: userId,
        };
        shouldRandomize = false;
        navigation.navigate('Exercise Screen', { shouldRandomize: shouldRandomize, meta: meta });
        break;
    }
    dispatch(setSelectedWorkout(filteredExercises));
    navigation.navigate('Exercise Screen', { shouldRandomize: shouldRandomize, meta: meta });
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
      <Text className={`text-2xl text-white font-extrabold shadow-sm shadow-black capitalize `}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
