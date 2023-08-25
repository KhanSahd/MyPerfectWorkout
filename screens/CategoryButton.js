import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryButton = ({ text, page }) => {
  // Navigation Object
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(page)}
      className="bg-white p-3 w-2/4 items-center rounded-full mb-10"
    >
      <Text className="font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
