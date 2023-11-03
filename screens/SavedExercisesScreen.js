import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Backbutton from '../components/Backbutton';
import { useSelector } from 'react-redux';
import CategoryButton from '../components/CategoryButton';

const SavedExercisesScreen = () => {
  const savedExercises = useSelector((state) => state.exercises.savedExercises);

  return (
    <SafeAreaView className="flex-1 bg-[#F02D3A]">
      <Backbutton />
      <Text className="text-center text-2xl mt-10 text-white font-bold">Saved Workouts</Text>
      <View className="flex-1 flex-col items-center justify-evenly w-screen">
        {savedExercises.map((exercise) => {
          return (
            <CategoryButton key={exercise.name} text={exercise.name} category="Saved Exercises" />
          );
        })}
      </View>

      {/* Will implement later */}

      {/* <Text className="absolute bottom-10 text-white text-center w-full">
        Hold on workout to delete workout or edit name
      </Text> */}
    </SafeAreaView>
  );
};

export default SavedExercisesScreen;
