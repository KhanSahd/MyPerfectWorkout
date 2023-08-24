import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CategoryButton = ({ text }) => {
  return (
    <TouchableOpacity className="bg-white p-3 w-2/4 items-center rounded-full mb-10">
      <Text className="font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
