import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";

const Test = () => {
  const navigation = useNavigation();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-5 "
      >
        <ChevronLeftIcon size={40} color="white" />
      </TouchableOpacity>
      {/* End Back Button */}

      <Text className="text-center text-2xl mt-10 text-white font-bold">
        This is a test{" "}
        <View className="bg-white items-center justify-center rounded-full">
          <Text className="text-[#764abc] text-lg">Redux</Text>
        </View>
      </Text>
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        {count}
      </Text>

      <View className="flex flex-row justify-center mt-10">
        <TouchableOpacity
          onPress={() => dispatch(increment())}
          className="bg-white rounded-full px-5 py-2 mr-5"
        >
          <Text className="text-black font-bold">+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(decrement())}
          className="bg-white rounded-full px-5 py-2"
        >
          <Text className="text-black font-bold">-</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Test;
