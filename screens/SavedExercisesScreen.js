import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Backbutton from '../components/Backbutton';
import { useDispatch, useSelector } from 'react-redux';
import CategoryButton from '../components/CategoryButton';
import { addToSaved } from '../features/exercises/exercisesSlice';
import { TrashIcon, PencilSquareIcon } from 'react-native-heroicons/mini';
import { TouchableOpacity } from 'react-native';
import EditExerciseMenu from '../components/EditExerciseMenu';
import { setSelectedSingleExercise } from '../features/exercises/singleExerciseSlice';
import { useNavigation } from '@react-navigation/native';

const SavedExercisesScreen = () => {
  const savedExercises = useSelector((state) => state.exercises.savedExercises);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showEditButton, setShowEditButton] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const selectedSingleExercise = useSelector(
    (state) => state.selectedSingleExercise.selectedSingleExercise
  );

  const handleEdit = (exercise) => {
    dispatch(setSelectedSingleExercise(exercise));
    navigation.navigate('EditExerciseMenu');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F02D3A]">
      <Backbutton />
      {/* Edit Button */}

      <View className="flex-row relative items-center justify-center">
        <Text className="text-center text-2xl mt-10 text-white font-bold">Saved Workouts</Text>
        <TouchableOpacity
          className="absolute right-6 bottom-2"
          onPress={() => setShowEditButton(!showEditButton)}>
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center mt-12 flex-wrap content-center  ">
        {savedExercises.length > 0 ? (
          savedExercises.map((exercise, index) => {
            return (
              <View key={index} className={`relative ${showEditButton ? `mr-4` : ''}`}>
                {/* <TouchableOpacity>
                  <TrashIcon
                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}
                    size={20}
                    color="white"
                    stroke="black"
                  />
                </TouchableOpacity> */}
                <CategoryButton target={true} text={exercise.name} category="Saved Exercises" />
                {showEditButton ? (
                  <TouchableOpacity
                    className="absolute right-0"
                    onPress={() => {
                      handleEdit(exercise);
                    }}>
                    <PencilSquareIcon size={20} color="white" />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })
        ) : (
          <Text className="text-white">Save some workouts in order to see them here</Text>
        )}
      </View>

      {/* Will implement later */}

      {/* <Text className="absolute bottom-10 text-white text-center w-full">
        Hold on workout to delete workout or edit name
      </Text> */}
    </SafeAreaView>
  );
};

export default SavedExercisesScreen;
