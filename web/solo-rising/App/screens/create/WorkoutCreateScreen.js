import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function WorkoutCreateScreen() {
  const navigation = useNavigation();

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-black">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2 bg-green-600"
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </DismissKeyboard>
  );
}

export default WorkoutCreateScreen;
