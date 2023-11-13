import { View, Text, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import { ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { BookmarkIcon, TrashIcon } from 'react-native-heroicons/outline';
import { toggleMenu } from '../features/SaveMenu/saveMenuSlice';
import { useNavigation } from '@react-navigation/native';
import { setSelectedSingleExercise } from '../features/exercises/singleExerciseSlice';
import axios from 'axios';

const ExerciseCarousel = ({ shouldRandomize, meta }) => {
  const width = Dimensions.get('window').width;

  // Use useSelector outside of useMemo to get the selectedWorkout
  const selectedWorkout = useSelector((state) => state.selectedWorkout.selectedWorkout);

  // Memoize the random data so it doesn't change unless selectedWorkout changes
  const random = useMemo(() => {
    return [...selectedWorkout].sort(() => 0.5 - Math.random()).slice(0, 12);
  }, [selectedWorkout]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = (item) => {
    dispatch(setSelectedSingleExercise(item));
    navigation.navigate('SaveExerciseMenu');
  };

  // const { _id } = meta;

  // const deleteExercise = async (item) => {
  //   data = {
  //     workoutId: _id,
  //     exerciseId: item.id,
  //   };
  //   try {
  //     const res = await axios.delete('http://localhost:8000/api/exercises', { data });
  //     if (res.status(200)) {
  //       Alert.alert('exercise deleted');
  //     } else {
  //       Alert.alert('Error deleting exercise. Status code: ' + res.status);
  //     }
  //   } catch (e) {
  //     Alert.alert('Error When trying to delete', e);
  //   }
  // };

  // console.log(selectedWorkout);

  return (
    <View className="mt-10">
      <ArrowLeftIcon size={20} color={'black'} style={{ position: 'absolute', top: '45%' }} />
      {meta ? (
        <Text className="text-center w-full text-black text-2xl font-thin mt-3">{meta?.name}</Text>
      ) : null}
      <Carousel
        width={width}
        data={shouldRandomize ? random : selectedWorkout}
        scrollAnimationDuration={1000}
        loop={false}
        renderItem={({ item }) => (
          <View className="items-center h-full justify-center relative">
            {/* Delete Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                zIndex: '1000',
                top: '2%',
                right: '25%',
              }}>
              <TrashIcon />
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                position: 'absolute',
                zIndex: '10000',
                top: '35%',
                right: '25%',
              }}>
              <BookmarkIcon size={40} fill="white" />
            </TouchableOpacity>
            {/* End Save Button */}
            <View className=" flex-1 items-center flex-col justify-between w-full">
              <Image
                className="rounded-full"
                source={{ uri: item?.gifUrl }}
                style={{
                  width: width / 2 + 100,
                  height: width / 2 + 100,
                  resizeMode: 'stretch',
                }}
              />
              <View className={`${meta ? 'mb-44' : 'mb-36'} w-full`}>
                <Text className="text-black text-left text-xl font-bold ml-10">
                  Name: {item?.name}
                </Text>
                <Text className="text-black text-left text-xl font-bold ml-10">
                  Target: {item?.target}
                </Text>
                <Text className="text-black text-left text-xl font-bold ml-10">
                  Equipment: {item?.equipment}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <ArrowRightIcon
        size={20}
        color={'black'}
        style={{ position: 'absolute', top: '45%', right: 0 }}
      />
    </View>
  );
};

export default ExerciseCarousel;
