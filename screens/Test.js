import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import Backbutton from "../components/Backbutton";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";

const Test = () => {
  const width = Dimensions.get("window").width;
  const random = [...useSelector((state) => state.exercises.exercises)]
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  return (
    <SafeAreaView className="flex-1 bg-[#FF5C00]">
      {/* Back Button */}
      <Backbutton />
      {/* End Back Button */}

      <View className="mt-10">
        <Carousel
          width={width}
          data={random}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View className="items-center h-full justify-center">
              <Image
                className="rounded-full"
                source={{ uri: item ? item.gifUrl : "" }}
                style={{
                  width: width / 2 + 100,
                  height: width / 2 + 100,
                  resizeMode: "stretch",
                }}
              />
              <View className="mt-6">
                <Text className="text-white text-center text-xl font-bold">
                  Name: {item.name}
                </Text>
                <Text className="text-white text-center text-xl font-bold">
                  Target: {item.target}
                </Text>
                <Text className="text-white text-center text-xl font-bold">
                  Equipment: {item.equipment}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Test;
