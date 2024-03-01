import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OptionsMenu from "react-native-option-menu";

function WorkoutsScreen() {
  const navigation = useNavigation();
  const options = require("../../utils/images/more.png");
  const workouts = [
    {
      name: "Arms",
    },
    {
      name: "Back",
    },
    {
      name: "Legs",
    },
    {
      name: "Cardio",
    },
  ];

  const handleWorkoutPress = (selectedWorkout) => {
    console.log(123);
    // navigation.navigate("ExcerciseView", { exercise: selectedWorkout });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
      <View className="flex flex-row justify-between items-center bg-zinc-800 py-3 rounded-3xl my-2 mx-6">
        <Text className="text-white ml-4">{item.name}</Text>
        <TouchableOpacity onPress={() => handleKebabMenuPress(item)}>
          <View className="mr-4">
            <OptionsMenu
              button={options
                // <Entypo name="dots-three-vertical" size={18} color="white" />
              }
              buttonStyle={{ width: 30, height: 30, resizeMode: "contain" }}
              destructiveIndex={2}
              options={["Edit", "Share", "Delete", "Cancel"]}
              // actions={[editPost, deletePost]}
              />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleKebabMenuPress = (item) => {
    // Handle kebab menu actions (e.g., Edit, Share, Delete)
  };
  return (
    <View className="mt-5">
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("WorkoutCreate");
        }}
      >
        <View className="flex justify-center items-center bg-green-600 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default WorkoutsScreen;
