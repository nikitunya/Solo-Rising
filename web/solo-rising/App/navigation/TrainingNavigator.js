import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import WorkoutCreateScreen from "../screens/workout/WorkoutCreateScreen";
import WorkoutEditScreen from "../screens/workout/WorkoutEditScreen";
import TrainingScreen from "../screens/bottomTabs/TrainingScreen";
import WorkoutStartScreen from "../screens/workout/WorkoutStartScreen";
import ExerciseViewScreen from "../screens/view/ExcerciseViewScreen";
import ExercisesScreen from "../screens/trainingTabs/ExcercisesScreen";
import WorkoutReviewScreen from "../screens/workout/WorkoutReviewScreen";

const Stack = createStackNavigator();

function TrainingNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.TRAINING}>
        <Stack.Screen name={ROUTES.TRAINING} component={TrainingScreen} />
        <Stack.Screen name={ROUTES.WORKOUT_CREATE} component={WorkoutCreateScreen} />
        <Stack.Screen name={ROUTES.WORKOUT_EDIT} component={WorkoutEditScreen} />
        <Stack.Screen name={ROUTES.WORKOUT_START} component={WorkoutStartScreen} />

        <Stack.Screen name={ROUTES.EXERCISE_LIST} component={ExercisesScreen} />
        <Stack.Screen name={ROUTES.EXERCISE_VIEW} component={ExerciseViewScreen} />

        <Stack.Screen name={ROUTES.WORKOUT_REVIEW} component={WorkoutReviewScreen} />
    </Stack.Navigator>
  );
}

export default TrainingNavigator;
