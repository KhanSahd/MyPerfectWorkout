import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Backbutton from "./Backbutton";
import SaveExerciseForm from "./SaveExerciseForm";

const SaveExerciseMenu = () => {
  const isMenuOpen = useSelector((state) => state.saveMenu.menuShown);
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);

  return (
    <ScrollView className="w-full h-full bg-[#D0CCD0]">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="absolute right-0 top-5">X</Text>
      </TouchableOpacity>
      {/* Create a new workout */}
      <View className="m-7 ml-3 items-center w-28 ">
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-white border border-black rounded-full w-12 h-12 justify-center items-center"
        >
          <PlusIcon />
        </TouchableOpacity>
        <Text className="text-center mt-2">Create new workout</Text>
      </View>
      {/* End Create a new workout */}

      {/* Create A New Exercise */}
      {showForm ? <SaveExerciseForm /> : null}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     width: "100",
//     display: flex,
//     justifyContent: "center",
//     backgroundColor: "#D0CCD0",
//     borderTopLeftRadius: "1rem" /* 16px */,
//     borderTopRightRadius: "1rem" /* 16px */,
//   },
// });

export default SaveExerciseMenu;
