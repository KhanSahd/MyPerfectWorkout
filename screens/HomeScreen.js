import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import Exercises from "../components/Exercises";

const HomeScreen = () => {
  const [activeMuscle, setActiveMuscle] = useState("select a workout");

  return (
    <SafeAreaView className="flex-1 bg-red-200">
      <ScrollView>
        {/* Top Half */}
        <Exercises activeMuscle={activeMuscle} />
        {/* End Top Half */}
        {/* Bottom Half/Buttons */}
        <View className="flex-row justify-evenly items-center mt-7 flex-wrap">
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("push")}
          >
            <Text className="text-lg font-bold text-white">Push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("pull")}
          >
            <Text className="text-lg font-bold text-white">Pull</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("legs")}
          >
            <Text className="text-lg font-bold text-white">Legs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("arms")}
          >
            <Text className="text-lg font-bold text-white">Arms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("back")}
          >
            <Text className="text-lg font-bold text-white">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("chest")}
          >
            <Text className="text-lg font-bold text-white">Chest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("abs")}
          >
            <Text className="text-lg font-bold text-white">Abs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("shoulders")}
          >
            <Text className="text-lg font-bold text-white">Shoulders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("cardio")}
          >
            <Text className="text-lg font-bold text-white">Cardio</Text>
          </TouchableOpacity>
        </View>
        {/* End Bottom Half/Buttons */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
