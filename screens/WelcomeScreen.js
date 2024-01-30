import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkForStoredUser, reset } from '../features/auth/authSlice';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkForStoredUser());
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Category Page');
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-[#F02D3A] items-center relative">
      <Text className="text-4xl font-bold text-white mt-24 w-screen text-center px-20">
        The Perfect Gym Routine
      </Text>

      <View className="justify-center items-center space-y-10 bg-white h-96 w-96 absolute -bottom-20 -right-20 rounded-full">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="bg-[#F02D3A] px-14 py-3 text-lg rounded-full mr-10">
          <Text className="text-center text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-11 py-3 text-lg rounded-full border-2 border-[#F02D3A] mr-10 mb-10"
          onPress={() => navigation.navigate('Register')}>
          <Text className="text-center text-[#F02D3A] text-lg font-bold">Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
