import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';

const LoginScreen = () => {
  // Navigation and dispatch objects
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const apiLink = 'http://localhost:8000/api/users/login';

  // Form data states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, isLoading, isError, isSuccess, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigation.navigate('Category Page');
    }

    dispatch(reset());

    if (isError) {
      Alert.alert('Invalid Credentials', errorMessage);
    }
  }, [user, isError, isSuccess, errorMessage, navigation, dispatch]);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    dispatch(login(user));
  };

  return (
    <SafeAreaView className="bg-[#F02D3A] flex-1 relative items-center justify-center ">
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 ">
        <ChevronLeftIcon size={40} color="white" />
      </TouchableOpacity>

      <View className="space-y-20">
        <Text className="text-4xl font-bold text-white text-center">Login</Text>

        {isError ? <Text className="text-white text-center">{errorMessage}</Text> : ''}

        <View>
          <TextInput
            onChangeText={(e) => setEmail(e)}
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            placeholder="email"
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleLogin()}
        className="absolute bottom-14 right-5 bg-white rounded-full p-2">
        <ChevronRightIcon size={40} color="#FF5C00" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
