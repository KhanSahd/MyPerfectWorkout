import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `http://10.0.0.132:8000/api/users/`;

//Register user
const register = async (user) => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (user) => {
  const response = await axios.post(API_URL + 'login', user);

  if (response) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  } else {
    return response.data;
  }

  return response.data;
};

//Logout user
const logout = async () => {
  await AsyncStorage.removeItem('user');

  return {
    type: 'auth/logout',
  };
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
