import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import WorkoutCreateScreen from "../screens/workout/WorkoutCreateScreen";
import WorkoutEditScreen from "../screens/workout/WorkoutEditScreen";
import TrainingScreen from "../screens/bottomTabs/TrainingScreen";

const Stack = createStackNavigator();

function TrainingNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.TRAINING}>
        <Stack.Screen name={ROUTES.TRAINING} component={TrainingScreen} />
        <Stack.Screen name={ROUTES.WORKOUT_CREATE} component={WorkoutCreateScreen} />
        <Stack.Screen name={ROUTES.WORKOUT_EDIT} component={WorkoutEditScreen} />
    </Stack.Navigator>
  );
}

export default TrainingNavigator;
