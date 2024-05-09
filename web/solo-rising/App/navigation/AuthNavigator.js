import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import HomeNavigator from "./HomeNavigator";
import { ROUTES } from "../constants";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTES.SIGNUP}
        component={SignUpScreen}
      />
      <Stack.Screen name={ROUTES.HOME} options={{ headerShown: false }} component={HomeNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
