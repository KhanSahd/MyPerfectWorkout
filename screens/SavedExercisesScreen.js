import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
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
import axios from 'axios';

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

  const deleteExercise = async (id) => {
    const res = await axios.delete(
      `https://myperfectworkoutapi.onrender.com/api/exercises?workoutId=${id}`
    );
    if (res.status === 200) {
      Alert.alert('Exercise deleted');
    } else {
      Alert.alert('Error deleting exercise. Status code: ' + res.status);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <Backbutton color="black" />
      {/* Edit Button */}

      <View className="flex-row relative items-center justify-center w-full">
        <Text className="text-center text-2xl mt-10 text-black font-light">Saved Workouts</Text>
        <TouchableOpacity
          className="absolute right-6 bottom-2"
          onPress={() => setShowEditButton(!showEditButton)}>
          <Text className="text-black">Edit</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-12">
        <ScrollView>
          {savedExercises.length > 0 ? (
            savedExercises.map((exercise, index) => {
              return (
                <View key={index} className="relative">
                  <CategoryButton
                    target={true}
                    text={exercise.name}
                    category="Saved Exercises"
                    color="#00FFE7"
                    space
                  />
                  {showEditButton ? (
                    <>
                      <TouchableOpacity
                        className="absolute right-2 top-2"
                        onPress={() => {
                          handleEdit(exercise);
                        }}>
                        <PencilSquareIcon size={20} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="absolute right-2 bottom-8"
                        onPress={() => {
                          deleteExercise(exercise._id);
                        }}>
                        <TrashIcon size={20} color="black" />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>
              );
            })
          ) : (
            <Text className="text-[#00FFE7] text-center mt-28 text-2xl font-bold">
              Save some workouts in order to see them here
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Will implement later */}

      {/* <Text className="absolute bottom-10 text-white text-center w-full">
        Hold on workout to delete workout or edit name
      </Text> */}
    </SafeAreaView>
  );
};

export default SavedExercisesScreen;
