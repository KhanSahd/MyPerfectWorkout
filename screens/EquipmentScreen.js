import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import CategoryButton from "../components/CategoryButton";
import { useSelector } from "react-redux";
import Backbutton from "../components/Backbutton";

const EquipmentScreen = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [equipment, setEquipment] = useState([
    ...new Set(exercises.map((exercise) => exercise.equipment)),
  ]);
  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      <Backbutton />
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        Equipment
      </Text>
      <ScrollView horizontal>
        <View className="flex-1 items-center mt-12 flex-wrap content-center  ">
          {equipment.map((equip) => (
            <CategoryButton
              key={equip}
              text={equip}
              category={"equipment"}
              target={true}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EquipmentScreen;
