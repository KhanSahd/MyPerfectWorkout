import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.toUpperCase() === "ADMIN" && password.toUpperCase() === "ADMIN") {
      navigation.navigate("Category Page");
    }
  };

  return (
    <SafeAreaView className="bg-[#FF5C00] flex-1 relative items-center justify-center ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-5 "
      >
        <ChevronLeftIcon size={40} color="white" />
      </TouchableOpacity>

      <View className="space-y-20">
        <Text className="text-4xl font-bold text-white text-center">Login</Text>

        <View>
          <TextInput
            onChangeText={(e) => setEmail(e)}
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            placeholder="Email"
          />
          <TextInput
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            secureTextEntry={true}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleLogin()}
        className="absolute bottom-14 right-5 bg-white rounded-full p-2"
      >
        <ChevronRightIcon size={40} color="#FF5C00" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
