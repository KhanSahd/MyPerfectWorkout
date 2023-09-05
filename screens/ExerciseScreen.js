import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import ExerciseCarousel from "../components/ExerciseCarousel";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../components/Backbutton";
import SaveExerciseMenu from "../components/SaveExerciseMenu";

const ExerciseScreen = () => {
  const isMenuOpen = useSelector((state) => state.saveMenu.menuShown);

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      {/* Back Button */}
      <Backbutton />
      {/* End Back Button */}
      {/* Carousel */}
      <ExerciseCarousel />
      {/* End Carousel */}
      {/* Save Exercise Menu */}
      {isMenuOpen ? <SaveExerciseMenu /> : ""}
      {/* End Save Exercise Menu */}
    </SafeAreaView>
  );
};

export default ExerciseScreen;
