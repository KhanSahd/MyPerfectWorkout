import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { PlusIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Backbutton from './Backbutton';
import SaveExerciseForm from './SaveExerciseForm';

const SaveExerciseMenu = () => {
  const isMenuOpen = useSelector((state) => state.saveMenu.menuShown);
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <ScrollView className="w-full h-full bg-white">
      <TouchableOpacity className="absolute right-5 top-5 " onPress={() => navigation.goBack()}>
        <ChevronDownIcon color={'black'} size={30} />
      </TouchableOpacity>
      {/* Create a new workout */}
      <View className="m-7 ml-3 items-center w-28 ">
        <TouchableOpacity
          onPress={() => setShowForm(!showForm)}
          className="bg-white border border-black rounded-full w-12 h-12 justify-center items-center">
          <PlusIcon />
        </TouchableOpacity>
        <Text className="text-center mt-2">Create new workout</Text>
      </View>
      {/* End Create a new workout */}

      {/* Create A New Exercise */}
      {showForm ? <SaveExerciseForm setShowForm={setShowForm} /> : null}
    </ScrollView>
  );
};

export default SaveExerciseMenu;
