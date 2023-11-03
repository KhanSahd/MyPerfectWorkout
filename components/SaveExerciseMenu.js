import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { PlusIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Backbutton from './Backbutton';
import SaveExerciseForm from './SaveExerciseForm';
import { useMemo } from 'react';
import axios from 'axios';

const SaveExerciseMenu = () => {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const workouts = useSelector((state) => state.exercises.savedExercises);
  const selectedSingleExercise = useSelector((state) => state.selectedSingleExercise);
  const { user } = useSelector((state) => state.auth);

  const { bodyPart, equipment, target, gifUrl, id, name } = (state) => state.selectedSingleExercise;

  const generateColorsMap = useMemo(() => {
    const colorsMap = new Map();
    workouts.forEach((exercise) => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      colorsMap.set(exercise._id, `#${randomColor}`);
    });
    return colorsMap;
  }, [workouts]);

  const addToSavedWorkout = async (exercise) => {
    try {
      const res = await axios.put('http://localhost:8000/api/exercises', {
        workoutId: exercise._id,
        data: selectedSingleExercise.selectedSingleExercise,
      });
      Alert.alert('Exercise Saved!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error saving exercise', err);
    }
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      <TouchableOpacity
        className="absolute right-5 top-5 z-50 "
        onPress={() => navigation.goBack()}>
        <ChevronDownIcon color={'black'} size={30} />
      </TouchableOpacity>
      <View className="flex-row items-start flex-wrap">
        {/* Create a new workout button */}
        <View className="m-7 ml-3 items-center w-24">
          <TouchableOpacity
            onPress={() => setShowForm(!showForm)}
            className="bg-white border border-black rounded-full w-12 h-12 justify-center items-center">
            <PlusIcon />
          </TouchableOpacity>
          <Text className="text-center mt-2">Create new workout</Text>
        </View>
        {/* End Create a new workout */}

        {workouts.map((exercise) => {
          const secondCharacter = exercise.name.split(' ')[1] ? exercise.name.split(' ')[1][0] : '';
          return (
            <View className="m-7 ml-3 items-center w-24">
              <TouchableOpacity
                className="bg-white border border-black rounded-full w-12 h-12 justify-center items-center"
                key={exercise._id}
                onPress={() => addToSavedWorkout(exercise)}>
                <View
                  className="w-full h-full rounded-full items-center justify-center"
                  style={{ backgroundColor: generateColorsMap.get(exercise._id) }}>
                  <Text className="font-bold text-white text-center text-lg">
                    {exercise.name[0] + secondCharacter}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text className="text-center mt-2">{exercise.name}</Text>
            </View>
          );
        })}
      </View>

      {/* Create A New Exercise */}
      {showForm ? <SaveExerciseForm setShowForm={setShowForm} /> : null}
    </ScrollView>
  );
};

export default SaveExerciseMenu;
