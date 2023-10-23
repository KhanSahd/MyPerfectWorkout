import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const SaveExerciseForm = () => {
  const [exerciseName, setExerciseName] = useState('');

  return (
    <View className="m-auto bg-red-600 mx-16 rounded-full">
      <View className="flex flex-col justify-center items-center">
        <TextInput
          onChangeText={(e) => setExerciseName(e)}
          className=" text-white p-4 text-center text-2xl font-bold"
          placeholder="exercise name"
          autoCapitalize="none"
        />
        <TouchableOpacity className="bg-white mb-2 p-4 rounded-full w-1/2">
          <Text className="text-center font-bold uppercase">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveExerciseForm;
