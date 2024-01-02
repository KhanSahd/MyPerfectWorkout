import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CategoryButton from '../components/CategoryButton';
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { add, fetchExercises, fetchSavedExercises } from '../features/exercises/exercisesSlice';
import { checkForStoredUser, logout, reset, updateUser } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import socketIOClient from 'socket.io-client';
import { Bars3Icon } from 'react-native-heroicons/solid';
import { setSelectedWorkout } from '../features/exercises/selectedExerciseSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);
  const { exercises } = useSelector((state) => state.exercises);
  const id = user ? user._id : null;
  const selectedWorkout = useSelector((state) => state.selectedWorkout.selectedWorkout);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate('Welcome');
  };

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(fetchExercises());
    }
    dispatch(fetchSavedExercises(id));
  }, []);

  // Socket Connection
  const socket = socketIOClient('https://myperfectworkoutapi.onrender.com/');

  const socketDispatch = useDispatch();

  useEffect(() => {
    socket.on('exerciseAdded', (exercise) => {
      if (exercise.userId === user._id) {
        socketDispatch(fetchSavedExercises(id));
      }
    });
    socket.on('exerciseUpdated', (exercise) => {
      if (exercise.user === user._id) {
        socketDispatch(fetchSavedExercises(id));
      }
    });
    socket.on('exerciseDeleted', (exercise) => {
      socketDispatch(fetchSavedExercises(id));
    });
    socket.on('userUpdated', (updatedUser) => {
      socketDispatch(updateUser(updatedUser.user));
      console.log('user after socket dispatched', user);
      // socketDispatch(checkForStoredUser());
    });
    return () => {
      socket.disconnect();
    };
  }, [socketDispatch]);

  // bg-color: bg-[#F02D3A]
  // logout styles: className="absolute top-24 right-5"

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-6 flex-row-reverse items-center justify-between">
        <TouchableOpacity onPress={() => navigation.navigate('HamburgerMenu')} className="mr-4">
          {/* <Text className="text-black text-xl mr-4">Logout</Text> */}
          <Bars3Icon size={30} color={'black'} />
        </TouchableOpacity>
        <Text className="text-3xl text-black font-light flex-1 ml-4">
          {/* Welcome {user.name}, Pick a category to find a workout */}
          Categories
        </Text>
      </View>
      <View className="flex-1 flex-col justify-evenly w-full items-center">
        <CategoryButton text="Body Part" page="BodyParts" color="#623CEA" />
        <CategoryButton text="Target Muscles" page="Target Muscles" color="#DF2935" />
        <CategoryButton text="Equipment" page="Equipment" color="#FD5200" />
        <CategoryButton text="My Saved Workouts" page="Saved Exercises" color="#00FFE7" />
        <CategoryButton text="Random" category="random" color="#F00699" />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
