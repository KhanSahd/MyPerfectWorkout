import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryButton from '../components/CategoryButton';
import Backbutton from '../components/Backbutton';

const BodyParts = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [bodyParts, setBodyParts] = useState([
    ...new Set(exercises.map((exercise) => exercise.bodyPart)),
  ]);

  return (
    <SafeAreaView className="bg-white items-center">
      {/* Back Button */}
      <Backbutton color="black" />
      {/* End Back Button */}
      {/* <Text className="text-center text-2xl mt-10 text-black font-bold">Body Parts</Text> */}
      <View className="mt-12">
        <ScrollView>
          {bodyParts.length == 0 ? (
            <View className="flex-1 flex-col justify-center items-center">
              <ActivityIndicator size="large" color="#F02D3A" />
              <Text className="text-2xl mt-4">Loading...</Text>
            </View>
          ) : (
            bodyParts.map((bodyPart) => (
              <CategoryButton
                key={bodyPart}
                text={bodyPart}
                category={'body part'}
                color="#623CEA"
                space
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BodyParts;
