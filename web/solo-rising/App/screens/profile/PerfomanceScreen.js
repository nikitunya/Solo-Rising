import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function PerfomanceScreen() {
  const navigation = useNavigation();

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-neutral-900">
        <View className="flex-row items-center justify-between mt-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3">
            <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4">
              <Text className="flex text-white text-base font-bold p-1">
                Workout History
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-2xl font-bold text-center">
          Perfomance Overview
        </Text>
        <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
          <View className="items-center justify-center">
            <Text className="text-white text-lg font-bold">
              Favorite Exercise
            </Text>
            <Text className="text-white text-lg font-bold">Pull Ups</Text>
          </View>
        </View>
        <View className="justify-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
          <View className="ml-4">
            <Text className="text-white text-base font-bold">
              Volume Overtime
            </Text>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default PerfomanceScreen;
