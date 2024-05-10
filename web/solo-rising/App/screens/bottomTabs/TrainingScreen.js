import React from "react";
import { View, Text } from "react-native";
import WorkoutsScreen from "../trainingTabs/WorkoutsScreen.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/index.js";

function TrainingScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="bg-zinc-800 h-24 rounded-bl-3xl rounded-br-3xl flex-row justify-center px-4 ">
        <Text className="text-2xl absolute bottom-6 font-bold text-white">
          My Workouts
        </Text>
      </View>
      <View className="flex-row items-center justify-around mt-3">
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXERCISE_LIST)}>
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
            <Text className="text-white py-1 px-9">Exercises</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
            <Text className="text-white py-1 px-9">Activities</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className="py-2"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      />
      <WorkoutsScreen />
    </View>
  );
}

export default TrainingScreen;
