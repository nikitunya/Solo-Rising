import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpSecondScreen from '../screens/SignUpSecondScreen';
import ExcerciseViewScreen from '../screens/view/ExcerciseViewScreen';
import WorkoutCreateScreen from '../screens/workout/WorkoutCreateScreen';
import ExcercisesScreen from '../screens/trainingTabs/ExcercisesScreen';

const Stack = createNativeStackNavigator();

function appNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
            <Stack.Screen name="SignUpSecond" options={{headerShown: false}} component={SignUpSecondScreen} />
            <Stack.Screen name="ExcerciseView" options={{headerShown: false}} component={ExcerciseViewScreen} />
            <Stack.Screen name="WorkoutCreate" options={{headerShown: false}} component={WorkoutCreateScreen} />
            <Stack.Screen name="ExerciseList" options={{headerShown: false}} component={ExcercisesScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default appNavigation;