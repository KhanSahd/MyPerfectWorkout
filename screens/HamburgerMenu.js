import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate('Welcome');
  };

  return (
    <View className="flex-1 justify-stretch items-center">
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="w-full p-5">
        <Text className="text-center text-3xl">Profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity className="w-full border-t-2 p-5">
        <Text className="text-center">Settings</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onLogout} className="w-full border-t-2 p-5">
        <Text className="text-center text-3xl">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HamburgerMenu;
