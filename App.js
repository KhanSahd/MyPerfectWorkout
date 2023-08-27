import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import Test from "./screens/Test";
import { Provider } from "react-redux";
import store from "./store";
import BodyPartsScreen from "./screens/BodyPartsScreen";
import ExerciseScreen from "./screens/ExerciseScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Category Page"
            component={CategoriesScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Test"
            component={Test}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BodyParts"
            component={BodyPartsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Exercise Screen"
            component={ExerciseScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
