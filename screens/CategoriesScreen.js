import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryButton from '../components/CategoryButton';
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { add, fetchExercises, fetchSavedExercises } from '../features/exercises/exercisesSlice';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);
  const { exercises, savedExercises } = useSelector((state) => state.exercises);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate('Welcome');
  };

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(fetchExercises());
    }
    dispatch(fetchSavedExercises(user._id));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F02D3A]">
      <TouchableOpacity onPress={() => onLogout()} className="absolute top-14 right-5">
        <Text className="text-white text-xl">Logout</Text>
      </TouchableOpacity>
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        Welcome {user.name}, Pick a category to find a workout
      </Text>
      <View className="flex-1 flex-col justify-evenly items-center mt-5">
        <CategoryButton text="Body Part" page="BodyParts" />
        <CategoryButton text="Target Muscles" page="Target Muscles" />
        <CategoryButton text="Equipment" page="Equipment" />
        <CategoryButton text="Random" />
        <CategoryButton text="My Saved Workouts" page="Saved Exercises" />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
