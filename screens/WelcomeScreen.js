import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00] items-center relative">
      <Text className="text-4xl font-bold text-white mt-24 w-screen text-center px-20">
        The Perfect Gym Routine
      </Text>

      <View className="justify-center items-center space-y-10 bg-white h-96 w-96 absolute -bottom-20 -right-20 rounded-full">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-[#FF5C00] px-14 py-3 text-lg rounded-full mr-10"
        >
          <Text className="text-center text-white text-lg font-bold">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-11 py-3 text-lg rounded-full border-2 border-[#FF5C00] mr-10 mb-10"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-center text-[#FF5C00] text-lg font-bold">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
