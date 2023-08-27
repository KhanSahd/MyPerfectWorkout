import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CategoryButton from "../components/CategoryButton";
import Backbutton from "../components/Backbutton";

const BodyParts = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [bodyParts, setBodyParts] = useState([
    ...new Set(exercises.map((exercise) => exercise.bodyPart)),
  ]);

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      {/* Back Button */}
      <Backbutton />
      {/* End Back Button */}
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        Body Parts
      </Text>
      <View className="flex-1 flex-col justify-evenly items-center mt-5">
        {bodyParts.map((bodyPart) => (
          <CategoryButton
            key={bodyPart}
            text={bodyPart}
            category={"body part"}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default BodyParts;
