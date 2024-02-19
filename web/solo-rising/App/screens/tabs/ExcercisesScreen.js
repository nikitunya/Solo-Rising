import React from "react";
import { TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utils/colors/index.js";

function ExcercisesScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-3 rounded-t-3xl">
        <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4">
          <TextInput
            className="flex-1 text-gray-700"
            placeholder="Freesearch"
          />
          <AntDesign name="search1" size={24} color={colors.textColor} />
        </View>
    </View>
  );
}

export default ExcercisesScreen;
