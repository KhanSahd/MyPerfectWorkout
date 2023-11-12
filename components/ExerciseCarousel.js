import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import { ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { toggleMenu } from '../features/SaveMenu/saveMenuSlice';
import { useNavigation } from '@react-navigation/native';
import { setSelectedSingleExercise } from '../features/exercises/singleExerciseSlice';

const ExerciseCarousel = () => {
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

  return (
    <View className="mt-10">
      <ArrowLeftIcon size={20} color={'white'} style={{ position: 'absolute', top: '45%' }} />
      {selectedWorkout[0].userId ? (
        <Text className="text-center w-full text-white text-2xl font-bold mt-5 absolute">
          {selectedWorkout[0].name}
        </Text>
      ) : null}
      <Carousel
        width={width}
        data={random}
        scrollAnimationDuration={1000}
        loop={false}
        renderItem={({ item }) => (
          <View className="items-center h-full justify-center relative">
            {/* Save Button */}
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                position: 'absolute',
                zIndex: '10000',
                top: item.data ? '59%' : '60%',
                right: '30%',
              }}>
              <BookmarkIcon size={40} fill="white" />
            </TouchableOpacity>
            {/* End Save Button */}
            <Image
              className="rounded-full"
              source={{ uri: item.data ? item.data.gifUrl : !item.data ? item.gifUrl : '' }}
              style={{
                width: width / 2 + 100,
                height: width / 2 + 100,
                resizeMode: 'stretch',
              }}
            />
            <View className="mt-6">
              <Text className="text-white text-center text-xl font-bold">
                Name: {item.data ? item.data.name : item.name}
              </Text>
              <Text className="text-white text-center text-xl font-bold">
                Target: {item.data ? item.data.target : item.target}
              </Text>
              <Text className="text-white text-center text-xl font-bold">
                Equipment: {item.data ? item.data.equipment : item.equipment}
              </Text>
            </View>
          </View>
        )}
      />
      <ArrowRightIcon
        size={20}
        color={'white'}
        style={{ position: 'absolute', top: '45%', right: 0 }}
      />
    </View>
  );
};

export default ExerciseCarousel;
