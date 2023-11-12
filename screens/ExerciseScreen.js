import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import ExerciseCarousel from '../components/ExerciseCarousel';
import { useDispatch, useSelector } from 'react-redux';
import Backbutton from '../components/Backbutton';
import SaveExerciseMenu from '../components/SaveExerciseMenu';

const ExerciseScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F02D3A]">
      {/* Back Button */}
      <Backbutton />
      {/* End Back Button */}
      {/* Carousel */}
      <ExerciseCarousel />
      {/* End Carousel */}
    </SafeAreaView>
  );
};

export default ExerciseScreen;
