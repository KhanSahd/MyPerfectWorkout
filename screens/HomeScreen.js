import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [isActive, setIsActive] = useState("beginner");
  const [activeMuscle, setActiveMuscle] = useState("select a workout");
  const [exercises, setExercises] = useState([]);
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
          ...chestData.slice(0, 4),
          ...shouldersData.slice(0, 4),
          ...tricepsData.slice(0, 4),
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
          ...latsData.slice(0, 4),
          ...bicepsData.slice(0, 4),
          ...upperBackData.slice(0, 4),
          ...spineData.slice(0, 4),
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
            ...adductorData.slice(0, 2),
            ...abductorData.slice(0, 2),
            ...calvesData.slice(0, 2),
            ...quadsData.slice(0, 2),
            ...hamstringsData.slice(0, 2),
            ...glutesData.slice(0, 2),
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
    <SafeAreaView className="flex-1 bg-red-200">
      <ScrollView>
        {/* Header, Carousel, Description, Difficulty */}
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
                uri:
                  exercises && exercises[index] ? exercises[index].gifUrl : "",
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
              Target:{" "}
              {exercises && exercises[index] ? exercises[index].target : ""}
            </Text>
          </View>
          {/* End Workout description */}

          {/* Difficulty Buttons */}
          <View className="flex-row justify-center space-x-10">
            <TouchableOpacity
              className={`${
                isActive === "beginner" ? "bg-[#FF5C00]" : "bg-gray-400"
              } px-2 py-1 rounded-full`}
              onPress={() => setIsActive("beginner")}
            >
              <Text className="text-white">beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                isActive === "intermediate" ? "bg-[#FF5C00]" : "bg-gray-400"
              } px-2 py-1 rounded-full`}
              onPress={() => setIsActive("intermediate")}
            >
              <Text className="text-white">intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                isActive === "advanced" ? "bg-[#FF5C00]" : "bg-gray-400"
              } px-2 py-1 rounded-full`}
              onPress={() => setIsActive("advanced")}
            >
              <Text className="text-white">advanced</Text>
            </TouchableOpacity>
          </View>
          {/* End Difficulty Buttons */}
        </View>
        {/* End Header, Carousel, Description, Difficulty */}

        {/* Buttons */}
        <View className="flex-row justify-evenly items-center mt-10 flex-wrap">
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("push")}
          >
            <Text className="text-lg font-bold text-white">Push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("pull")}
          >
            <Text className="text-lg font-bold text-white">Pull</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("legs")}
          >
            <Text className="text-lg font-bold text-white">Legs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("arms")}
          >
            <Text className="text-lg font-bold text-white">Arms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("back")}
          >
            <Text className="text-lg font-bold text-white">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("chest")}
          >
            <Text className="text-lg font-bold text-white">Chest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("abs")}
          >
            <Text className="text-lg font-bold text-white">Abs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("shoulders")}
          >
            <Text className="text-lg font-bold text-white">Shoulders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF5C00] w-24 h-24 m-2 rounded-full justify-center items-center"
            onPress={() => setActiveMuscle("cardio")}
          >
            <Text className="text-lg font-bold text-white">Cardio</Text>
          </TouchableOpacity>
        </View>
        {/* End Buttons */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
