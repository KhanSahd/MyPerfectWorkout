import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ExerciseCarousel from "../components/ExerciseCarousel";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../components/Backbutton";

const ExerciseScreen = () => {
  const random = [...useSelector((state) => state.exercises.selectedWorkout)]
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);
  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      {/* Back Button */}
      <Backbutton />
      {/* End Back Button */}

      <ExerciseCarousel />
    </SafeAreaView>
  );
};

export default ExerciseScreen;
