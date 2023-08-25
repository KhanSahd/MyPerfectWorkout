import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryButton from "./CategoryButton";
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from "@env";

const Categories = () => {
  const [exercises, setExercises] = useState([]);

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
    setExercises(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      <Text className="text-center text-2xl mt-10 text-white font-bold">
        Pick a category to find a workout
      </Text>
      <View className="flex-1 flex-col justify-center items-center mt-5">
        <CategoryButton text="Body Part" />
        <CategoryButton text="Target Muscles" />
        <CategoryButton text="Equipment" />
        <CategoryButton text="Random" />
        <CategoryButton text="My Saved Workouts" />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
