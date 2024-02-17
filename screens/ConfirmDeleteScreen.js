import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { logout, reset } from '../features/auth/authSlice';

const ConfirmDeleteScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user ? user._id : null;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const res = await axios.delete(`https://myperfectworkoutapi.onrender.com/api/users?id=${id}`);
    if (res.status == 200) {
      Alert.alert('Profile successfully deleted');
      navigation.navigate('Category Page');
      dispatch(logout());
      dispatch(reset());
    } else {
      Alert.alert('Error deleting profile');
    }
  };

  return (
    <View className="flex-1 bg-black justify-center">
      <Text className="text-white text-center text-5xl">
        Are you sure you want to delete your account?
      </Text>
      <Text className="text-white text-center text-2xl">This action cannot be undone</Text>
      <View className="flex-row justify-center">
        <TouchableOpacity className="bg-red-500 text-white p-2 m-2" onPress={() => handleDelete()}>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 text-white p-2 m-2"
          title="No"
          onPress={() => navigation.goBack()}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmDeleteScreen;
