import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import Backbutton from './Backbutton';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const Header = ({ backbutton }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate('Welcome');
  };

  /* 
    logout button styles: className="absolute top-14 right-5"
    backbutton styles: className="absolute top-14 left-5 z-50 "
  */

  return (
    <SafeAreaView className="w-full h-24 bg-gray-700 shadow-inner relative border-b-4 border-blue-950">
      {backbutton ? <Backbutton /> : null}
      <TouchableOpacity onPress={() => onLogout()} className="absolute right-0 bottom-0 p-3">
        <Text className="text-white text-xl text-center mr-3">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
