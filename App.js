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
import SavedExercisesScreen from './screens/SavedExercisesScreen';
import EditExerciseMenu from './components/EditExerciseMenu';
import Header from './components/Header';
import HamburgerMenu from './screens/HamburgerMenu';
import ProfileScreen from './screens/ProfileScreen';
import ConfirmDeleteScreen from './screens/ConfirmDeleteScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Category Page"
            component={CategoriesScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
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
            name="Saved Exercises"
            component={SavedExercisesScreen}
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
          <Stack.Screen
            options={{ headerShown: false, presentation: 'modal' }}
            name="EditExerciseMenu"
            component={EditExerciseMenu}
          />
          <Stack.Screen
            options={{ headerShown: false, presentation: 'modal' }}
            name="HamburgerMenu"
            component={HamburgerMenu}
          />
          <Stack.Screen
            options={{ headerShown: false, presentation: 'modal' }}
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, presentation: 'modal' }}
            name="ConfirmDelete"
            component={ConfirmDeleteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
