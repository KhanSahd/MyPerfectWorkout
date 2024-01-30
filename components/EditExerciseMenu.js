import { View, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EditExerciseMenu = () => {
  const selectedSingleExercise = useSelector(
    (state) => state.selectedSingleExercise.selectedSingleExercise
  );

  const [name, setName] = useState(selectedSingleExercise.name);
  const navigation = useNavigation();

  const handleSave = async () => {
    const data = {
      name: name,
      workoutId: selectedSingleExercise._id,
    };
    try {
      const res = await axios.put('https://myperfectworkoutapi.onrender.com/api/exercises', data);
      if (res.status === 201) {
        Alert.alert('Workout Updated!');
        navigation.goBack();
        return;
      }
    } catch (err) {
      Alert.alert('Error updating workout', err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center relative">
      <Text className="font-extrabold text-4xl absolute top-8">Edit Menu</Text>
      <View className="w-full flex-col items-center justify-center">
        <Text className="uppercase text-2xl">Workout Name</Text>
        <TextInput
          placeholder={selectedSingleExercise.name}
          className="font-bold text-lg w-full h-10 rounded-md mt-2 px-2 text-center"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSave()}
        className="bg-[#AFFC41] px-5 py-2 mt-5 rounded-lg shadow">
        <Text className="text-black">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditExerciseMenu;
