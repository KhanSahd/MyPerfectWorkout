import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryButton from "../components/CategoryButton";
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../features/exercises/exercisesSlice";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  // const [exercises, setExercises] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate("Welcome");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises",
      {
        headers: {
          "X-RapidAPI-Key": XRAPIDAPIKEY,
          "X-RapidAPI-Host": XRAPIDAPIHOST,
        },
      }
    );
    const data = await response.json();
    dispatch(add(data));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      <TouchableOpacity
        onPress={() => onLogout()}
        className="absolute top-14 right-5"
      >
        <Text className="text-white text-xl">Logout</Text>
      </TouchableOpacity>
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        Pick a category to find a workout
      </Text>
      <View className="flex-1 flex-col justify-evenly items-center mt-5">
        <CategoryButton text="Body Part" page="BodyParts" />
        <CategoryButton text="Target Muscles" page="Target Muscles" />
        <CategoryButton text="Equipment" page="Equipment" />
        <CategoryButton text="Random" />
        <CategoryButton text="My Saved Workouts" />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
