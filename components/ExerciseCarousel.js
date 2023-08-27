import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "react-native-heroicons/solid";

const ExerciseCarousel = ({ exercises }) => {
  const width = Dimensions.get("window").width;
  return (
    <View className="mt-10">
      <ArrowLeftIcon
        size={20}
        color={"lightgray"}
        style={{ position: "absolute", top: "45%" }}
      />
      <Carousel
        width={width}
        data={useSelector((state) => state.exercises.selectedWorkout)}
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
      <ArrowRightIcon
        size={20}
        color={"lightgray"}
        style={{ position: "absolute", top: "45%", right: 0 }}
      />
    </View>
  );
};

export default ExerciseCarousel;