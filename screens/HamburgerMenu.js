import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate('Category Page');
  };

  return (
    <View className="flex-1 justify-stretch items-center">
      {user && (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="w-full p-5">
          <Text className="text-center text-3xl">Profile</Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity className="w-full border-t-2 p-5">
        <Text className="text-center">Settings</Text>
      </TouchableOpacity> */}
      {user ? (
        <TouchableOpacity onPress={onLogout} className="w-full border-t-2 p-5">
          <Text className="text-center text-3xl">Logout</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              navigation.navigate('Login');
            }}
            className="w-full border-t-2 p-5">
            <Text className="text-center text-3xl">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              navigation.navigate('Register');
            }}
            className="w-full border-t-2 p-5">
            <Text className="text-center text-3xl">Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HamburgerMenu;
