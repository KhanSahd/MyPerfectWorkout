import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { BookmarkIcon } from "react-native-heroicons/outline";
import { toggleMenu } from "../features/SaveMenu/saveMenuSlice";
import { useNavigation } from "@react-navigation/native";

const ExerciseCarousel = () => {
  const width = Dimensions.get("window").width;
  // const random = [
  //   ...useSelector((state) => state.selectedWorkout.selectedWorkout),
  // ]
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 12);

  // Use useSelector outside of useMemo to get the selectedWorkout
  const selectedWorkout = useSelector(
    (state) => state.selectedWorkout.selectedWorkout
  );

  // Memoize the random data so it doesn't change unless selectedWorkout changes
  const random = useMemo(() => {
    return [...selectedWorkout].sort(() => 0.5 - Math.random()).slice(0, 12);
  }, [selectedWorkout]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View className="mt-10">
      <ArrowLeftIcon
        size={20}
        color={"lightgray"}
        style={{ position: "absolute", top: "45%" }}
      />
      <Carousel
        width={width}
        data={random}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className="items-center h-full justify-center relative">
            {/* Save Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SaveExerciseMenu")}
              style={{
                position: "absolute",
                zIndex: "10000",
                top: "60%",
                right: "30%",
              }}
            >
              <BookmarkIcon size={40} />
            </TouchableOpacity>
            {/* End Save Button */}

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
