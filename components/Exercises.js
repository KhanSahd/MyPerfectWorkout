import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";

const Exercises = ({ activeMuscle }) => {
  const [exercises, setExercises] = useState([]);
  const [isActive, setIsActive] = useState("beginner");
  const url = "https://exercisedb.p.rapidapi.com/exercises/target/";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activeMuscle == "push") {
      getPushDay();
    }
    if (activeMuscle == "pull") {
      getPullDay();
    }
    if (activeMuscle == "legs") {
      getLegDay();
    }
  }, [activeMuscle]);

  const fetchData = async (target) => {
    const res = await fetch(url + target, {
      headers: {
        "X-RapidAPI-Key": "db99d8ec11msh20c3f501e2ca248p1d8e52jsn51ccc0ee9154",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });
    return await res.json();
  };

  const getPushDay = () => {
    Promise.all([
      fetchData("pectorals"),
      fetchData("delts"),
      fetchData("triceps"),
    ])
      .then(([chestData, shouldersData, tricepsData]) => {
        const combinedData = [
          ...chestData.sort(() => Math.random() - 0.5).slice(0, 4),
          ...shouldersData.sort(() => Math.random() - 0.5).slice(0, 4),
          ...tricepsData.sort(() => Math.random() - 0.5).slice(0, 4),
        ];
        setIndex(0);
        setExercises(combinedData.sort(() => Math.random() - 0.5));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getPullDay = () => {
    Promise.all([
      fetchData("lats"),
      fetchData("biceps"),
      fetchData("upper back"),
      fetchData("spine"),
    ])
      .then(([latsData, bicepsData, upperBackData, spineData]) => {
        const combinedData = [
          ...latsData.sort(() => Math.random() - 0.5).slice(0, 4),
          ...bicepsData.sort(() => Math.random() - 0.5).slice(0, 4),
          ...upperBackData.sort(() => Math.random() - 0.5).slice(0, 4),
          ...spineData.sort(() => Math.random() - 0.5).slice(0, 4),
        ];
        setIndex(0);
        setExercises(combinedData.sort(() => Math.random() - 0.5));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getLegDay = () => {
    Promise.all([
      fetchData("adductors"),
      fetchData("abductors"),
      fetchData("calves"),
      fetchData("quads"),
      fetchData("hamstrings"),
      fetchData("glutes"),
    ])
      .then(
        ([
          adductorData,
          abductorData,
          calvesData,
          quadsData,
          hamstringsData,
          glutesData,
        ]) => {
          const combinedData = [
            ...adductorData.sort(() => Math.random() - 0.5).slice(0, 2),
            ...abductorData.sort(() => Math.random() - 0.5).slice(0, 2),
            ...calvesData.sort(() => Math.random() - 0.5).slice(0, 2),
            ...quadsData.sort(() => Math.random() - 0.5).slice(0, 2),
            ...hamstringsData.sort(() => Math.random() - 0.5).slice(0, 2),
            ...glutesData.sort(() => Math.random() - 0.5).slice(0, 2),
          ];
          setIndex(0);
          setExercises(combinedData.sort(() => Math.random() - 0.5));
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <View className="mt-12">
      {/* Header */}
      <Text className="text-xl font-bold text-black text-center">
        {activeMuscle}
      </Text>
      {/* End Header */}

      {/* Exercise */}
      <Text className="text-lg text-black text-center mt-5">
        {exercises && exercises[index] ? exercises[index].name : ""}
      </Text>
      {/* End Exercise */}

      {/* Carousel */}
      <View className="flex-row justify-evenly items-center mt-10">
        {/* Left arrow */}
        <TouchableOpacity
          className="bg-[#FF5C00] h-7 rounded-full p-1"
          onPress={() => (index == 0 ? "" : setIndex(index - 1))}
        >
          <ChevronLeftIcon size={20} color="white" />
        </TouchableOpacity>
        {/* End Left arrow */}

        {/* Image of exercise */}
        <Image
          source={{
            uri: exercises && exercises[index] ? exercises[index].gifUrl : "",
          }}
          className="w-56 h-56 rounded-full"
        />
        {/* End Image of exercise */}

        {/* Right arrow */}
        <TouchableOpacity
          className="bg-[#FF5C00] h-7 rounded-full p-1"
          onPress={() =>
            index == exercises.length - 1 ? "" : setIndex(index + 1)
          }
        >
          <ChevronRightIcon size={20} color="white" />
        </TouchableOpacity>
        {/* End Right arrow */}
      </View>
      {/* End Carousel */}

      {/* Workout description */}
      <View className="px-4 py-5">
        <Text className="text-center text-xs font-bold">
          Body Part:{" "}
          {exercises && exercises[index] ? exercises[index].bodyPart : ""}
        </Text>
        <Text className="text-center text-xs font-bold">
          Equipment:{" "}
          {exercises && exercises[index] ? exercises[index].equipment : ""}
        </Text>
        <Text className="text-center text-xs font-bold">
          Target: {exercises && exercises[index] ? exercises[index].target : ""}
        </Text>
      </View>
      {/* End Workout description */}
    </View>
  );
};

export default Exercises;
