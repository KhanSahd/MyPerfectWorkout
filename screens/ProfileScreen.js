import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user ? user._id : null;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

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

        {/* Old Password */}
        <View className="flex-row items-center p-4">
          <Text className=" text-xl">Current Password: </Text>
          <TextInput className=" text-xl pb-2" value={oldPassword} onChangeText={setOldPassword} />
        </View>

        {/* New Password */}
        <View className="flex-row items-center p-4">
          <Text className=" text-xl">New Password: </Text>
          <TextInput className=" text-xl pb-2" value={newPassword} onChangeText={setNewPassword} />
        </View>

        {/* Confirm Password */}
        <View className="flex-row items-center p-4">
          <Text className=" text-xl">Confirm New Password: </Text>
          <TextInput className="text-xl pb-2" value={confirm} onChangeText={setConfirm} />
        </View>
        <TouchableOpacity className="bg-blue-500 p-4 rounded-full">
          <Text className="text-xl text-center text-white">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
