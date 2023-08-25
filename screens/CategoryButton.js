import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryButton = ({ text, page }) => {
  // Navigation Object
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (page ? navigation.navigate(page) : null)}
      className="bg-white p-3 w-2/4 items-center rounded-full"
    >
      <Text className="font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
