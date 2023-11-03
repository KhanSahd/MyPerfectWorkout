import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

const RegisterScreen = () => {
  // Navigation and dispatch objects
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const apiLink = 'http://localhost:8000/api/users/';

  // Form data states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { user, isLoading, isError, isSuccess, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigation.navigate('Category Page');
    }
    if (isError) {
      Alert.alert(errorMessage);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, errorMessage, navigation, dispatch]);

  const onSubmit = (e) => {
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };

      dispatch(register(user));
    }
  };

  return (
    <SafeAreaView className="bg-[#F02D3A] flex-1 relative items-center justify-center ">
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 ">
        <ChevronLeftIcon size={40} color="white" />
      </TouchableOpacity>

      <View className="space-y-20">
        <Text className="text-4xl font-bold text-white text-center">Register</Text>

        {isError ? <Text className="text-white text-center">{errorMessage}</Text> : ''}

        <View>
          <TextInput
            onChangeText={(e) => setName(e)}
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            placeholder="name"
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(e) => setEmail(e)}
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            placeholder="email"
            autoCapitalize="none"
            secureTextEntry={false}
          />
          <TextInput
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(e) => setPassword2(e)}
            placeholder="Confirm Password"
            className="border-white text-white p-4 w-screen text-center text-2xl font-bold"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onSubmit()}
        className="absolute bottom-14 right-5 bg-white rounded-full p-2">
        <ChevronRightIcon size={40} color="#FF5C00" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
