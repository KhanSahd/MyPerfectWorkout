import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Backbutton from '../components/Backbutton';
import { useSelector } from 'react-redux';
import CategoryButton from '../components/CategoryButton';

const TargetMuscleScreen = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [targetMuscles, setTargetMuscles] = useState([
    ...new Set(exercises.map((exercise) => exercise.target)),
  ]);
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <Backbutton color="black" />
      {/* <Text className="text-center text-2xl mt-10 text-white font-bold">Target Muscles</Text> */}
      <View className="mt-12">
        <ScrollView>
          {targetMuscles.map((muscle) => (
            <CategoryButton
              key={muscle}
              text={muscle}
              category={'target'}
              target={true}
              color="#DF2935"
              space
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TargetMuscleScreen;

// flex-1 flex-col justify-evenly items-center mt-5 flex-wrap
