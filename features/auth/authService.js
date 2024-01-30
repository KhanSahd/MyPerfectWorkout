import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = `https://myperfectworkoutapi.onrender.com/api/users/`;

//Register user
const register = async (user) => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    await SecureStore.setItemAsync('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (user) => {
  const response = await axios.post(API_URL + 'login', user);

  if (response) {
    await SecureStore.setItemAsync('user', JSON.stringify(response.data));
  } else {
    return response.data;
  }

  return response.data;
};

//Logout user
const logout = async () => {
  await SecureStore.deleteItemAsync('user');

  return {
    type: 'auth/logout',
  };
};

const update = async (user) => {
  await SecureStore.deleteItemAsync('user');
  await SecureStore.setItemAsync('user', JSON.stringify(user));

  return {
    type: 'auth/update',
    payload: user,
  };
};

const authService = {
  register,
  login,
  logout,
  update,
};

export default authService;
