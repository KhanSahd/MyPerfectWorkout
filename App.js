import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import { Provider } from 'react-redux';
import store from './store';
import BodyPartsScreen from './screens/BodyPartsScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import TargetMuscleScreen from './screens/TargetMuscleScreen';
import EquipmentScreen from './screens/EquipmentScreen';
import RegisterScreen from './screens/RegisterScreen';
import SaveExerciseMenu from './components/SaveExerciseMenu';
import SaveExerciseForm from './components/SaveExerciseForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Category Page"
            component={CategoriesScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Exercise Screen"
            component={ExerciseScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BodyParts"
            component={BodyPartsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Target Muscles"
            component={TargetMuscleScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Equipment"
            component={EquipmentScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, presentation: 'modal' }}
            name="SaveExerciseMenu"
            component={SaveExerciseMenu}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
