import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import authSlice, { checkForStoredUser, setUser } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user ? user._id : null;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleUpdate = async () => {
    const res = await axios.put(`https://myperfectworkoutapi.onrender.com/api/users?id=${id}`, {
      name: name,
      email: email,
      password: oldPassword,
      newPassword: newPassword,
    });
    if (newPassword !== confirm) {
      Alert.alert('passwords do not match');
      return;
    }
    if (res.status == 200) {
      Alert.alert('Profile successfully updated');
      navigation.goBack();
      // await AsyncStorage.setItem('user', JSON.stringify(res.data));
    } else {
      Alert.alert('Error updating profile');
    }
  };

  return (
    <View className="flex-1">
      <Text className="font-bold text-center mt-6 text-2xl">Your profile</Text>

      <View className="flex-1 items-center justify-center w-full">
        {/* Name */}
        <View className="flex-col items-center p-4">
          <Text className=" text-xl">Name</Text>
          <TextInput className="text-xl" value={name} onChangeText={setName} />
        </View>

        {/* Email */}
        <View className="flex-col items-center p-4">
          <Text className=" text-xl">Email</Text>
          <TextInput className="text-xl" value={email} onChangeText={setEmail} />
        </View>

        {/* Current Password */}
        <View className="flex-col items-center p-4">
          <Text className=" text-xl">Current Password: </Text>
          <TextInput className=" text-xl" value={oldPassword} onChangeText={setOldPassword} />
        </View>

        {/* New Password */}
        <View className="flex-col items-center p-4">
          <Text className=" text-xl">New Password: </Text>
          <TextInput className=" text-xl" value={newPassword} onChangeText={setNewPassword} />
        </View>

        {/* Confirm Password */}
        <View className="flex-col items-center p-4">
          <Text className=" text-xl">Confirm New Password: </Text>
          <TextInput className="text-xl" value={confirm} onChangeText={setConfirm} />
        </View>
        <TouchableOpacity onPress={() => handleUpdate()} className="bg-blue-500 p-4 rounded-full">
          <Text className="text-xl text-center text-white">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
