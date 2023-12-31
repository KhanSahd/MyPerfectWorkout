import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XRAPIDAPIKEY, XRAPIDAPIHOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../features/SaveMenu/saveMenuSlice';
import { addToSaved } from '../features/exercises/exercisesSlice';
import { useNavigation } from '@react-navigation/native';

const SaveExerciseForm = ({ setShowForm }) => {
  const [exerciseName, setExerciseName] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { selectedSingleExercise } = useSelector((state) => state.selectedSingleExercise);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSave = async () => {
    const data = {
      data: selectedSingleExercise,
      name: exerciseName,
      userId: user._id,
    };

    try {
      const res = await axios.post('https://myperfectworkoutapi.onrender.com/api/exercises', data);
      alert('Exercise Saved!');
      setExerciseName('');
      setShowForm(false);
      navigation.goBack();
      return;
    } catch (err) {
      Alert.alert('Error saving exercise', err);
    }
  };

  return (
    <View className="absolute right-0 left-0 top-1/2 w-80 bg-red-600 mx-16 shadow-md shadow-slate-500 rounded-xl">
      <View className="flex flex-col justify-center items-center">
        <TextInput
          onChangeText={(e) => setExerciseName(e)}
          className=" text-white p-4 text-center text-2xl font-bold"
          placeholder="Workout Name"
          autoCapitalize="none"
        />
        <TouchableOpacity className="bg-white mb-2 p-4 rounded-full w-1/2" onPress={handleSave}>
          <Text className="text-center font-bold uppercase">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveExerciseForm;
