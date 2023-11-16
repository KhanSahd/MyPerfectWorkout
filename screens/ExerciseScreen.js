import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import ExerciseCarousel from '../components/ExerciseCarousel';
import { useDispatch, useSelector } from 'react-redux';
import Backbutton from '../components/Backbutton';
import SaveExerciseMenu from '../components/SaveExerciseMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExerciseScreen = ({ route }) => {
  let { shouldRandomize, meta } = route.params;
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Back Button */}
      <Backbutton color="black" />
      {/* End Back Button */}
      {/* Carousel */}
      <ExerciseCarousel shouldRandomize={shouldRandomize} meta={meta} />
      {/* End Carousel */}
    </SafeAreaView>
  );
};

export default ExerciseScreen;
