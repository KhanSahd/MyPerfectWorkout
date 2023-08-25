import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Categories from "./screens/Categories";
import Test from "./screens/Test";
import { Provider } from "react-redux";
import store from "./store";
import BodyParts from "./screens/BodyParts";

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
            component={Categories}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Test"
            component={Test}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BodyParts"
            component={BodyParts}
          />
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
