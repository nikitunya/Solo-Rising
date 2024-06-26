import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import HomeNavigator from "./HomeNavigator";
import { ROUTES } from "../constants";
import SignUpSecondScreen from "../screens/auth/SignUpSecondScreen";
import ProfileNavigator from "./ProfileNavigator";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTES.LOGIN}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTES.SIGNUP}
        options={{ headerShown: false }}
        component={SignUpScreen}
      />
      <Stack.Screen
        name={ROUTES.SIGNUP_SECOND}
        component={SignUpSecondScreen}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        options={{ headerShown: false }}
        component={HomeNavigator}
      />
      <Stack.Screen
        name={ROUTES.PROFILE_NAVIGATOR}
        options={{ headerShown: false }}
        component={ProfileNavigator}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
