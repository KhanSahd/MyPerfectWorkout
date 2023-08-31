import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ExerciseCarousel from "../components/ExerciseCarousel";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../components/Backbutton";

const ExerciseScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
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
