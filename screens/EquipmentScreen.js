import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CategoryButton from '../components/CategoryButton';
import { useSelector } from 'react-redux';
import Backbutton from '../components/Backbutton';

const EquipmentScreen = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [equipment, setEquipment] = useState([
    ...new Set(exercises.map((exercise) => exercise.equipment)),
  ]);
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <Backbutton color="black" />
      {/* <Text className="text-center text-2xl mt-10 text-black font-bold">Equipment</Text> */}
      <View className="mt-12">
        {equipment.length == 0 ? (
          <View className="flex-1 flex-col justify-center items-center">
            <ActivityIndicator size="large" color="#F02D3A" />
            <Text className="text-2xl mt-4">Loading...</Text>
          </View>
        ) : (
          <ScrollView>
            {equipment.map((equip) => (
              <CategoryButton
                key={equip}
                text={equip}
                category={'equipment'}
                color="#FD5200"
                space
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EquipmentScreen;
