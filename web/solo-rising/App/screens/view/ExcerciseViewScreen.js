import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { AntDesign } from "@expo/vector-icons";
import MuscleGroupImage from "../api/MuscleGroupsImage";

function ExcerciseViewScreen({ route }) {
  const { exercise } = route.params;
  const navigation = useNavigation();

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-black">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2 bg-blue-700"
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="justify-center items-center py-4">
          <Text className="text-white text-2xl font-bold mb-2">
            {exercise.name}
          </Text>
          <Text className="text-white text-lg capitalize mb-2">
            Type: {exercise.exercise_type}
          </Text>
          <Text className="text-white text-lg capitalize">
            difficulty: {exercise.experience}
          </Text>
        </View>
        <TouchableOpacity>
          <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <Text className="text-white text-lg">Personal Record:</Text>
            <Text className="text-white text-xl">100 kg</Text>
          </View>
        </TouchableOpacity>
        <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
          <MuscleGroupImage
            primaryMuscleGroups={String(exercise.primary_muscles)}
            secondaryMuscleGroups={String(exercise.secondary_muscles)}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default ExcerciseViewScreen;
