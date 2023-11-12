import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const Backbutton = ({ color }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 z-50 ">
      <ChevronLeftIcon size={40} color={`${color ? color : 'white'}`} />
    </TouchableOpacity>
  );
};

export default Backbutton;
