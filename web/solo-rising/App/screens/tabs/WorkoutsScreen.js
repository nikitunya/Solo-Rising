import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function WorkoutsScreen() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("WorkoutCreate")}}>
      <View className="flex justify-center items-center bg-green-600 py-1 rounded-3xl my-4 mx-6">
        <AntDesign name="plus" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
}

export default WorkoutsScreen;
