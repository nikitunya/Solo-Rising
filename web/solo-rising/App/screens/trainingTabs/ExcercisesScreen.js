import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utils/colors/index.js";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

function ExcercisesScreen() {
  const muscles = [
    "biceps",
    "chest",
    "forearms",
    "triceps",
    "lats",
    "lower_back",
    "middle_back",
    "calves",
    "quadriceps",
  ];
  const type = [
    "cardio",
    "powerlifting",
    "strength",
    "streching",
    "plyometrics",
  ];
  const exerciseData = [
    {
      equipment: "Dumbbell",
      exercise_type: "Strength",
      experience: "Beginner",
      force_type: "Push (Bilateral)",
      mechanics: "Compound",
      name: "Dumbbell Bench Press",
      primary_muscles: "Chest",
      secondary_muscles: "['Shoulders', 'Triceps']",
    },
    {
      equipment: "Dumbbell",
      exercise_type: "Strength",
      experience: "Intermediate",
      force_type: "Push",
      mechanics: "Compound",
      name: "Dumbbell Pullover",
      primary_muscles: "Chest",
      secondary_muscles: "['Lats', 'Shoulders', 'Triceps']",
    },
    {
      equipment: "Dumbbell",
      exercise_type: "Strength",
      experience: "Beginner",
      force_type: "Push (Bilateral)",
      mechanics: "Compound",
      name: "Incline Dumbbell Bench Press",
      primary_muscles: "Chest",
      secondary_muscles: "['Shoulders', 'Triceps']",
    },
    {
      equipment: "Bodyweight",
      exercise_type: "Strength",
      experience: "Beginner",
      force_type: "Pull (Bilateral)",
      mechanics: "Compound",
      name: "Pull Up",
      primary_muscles: "Lats",
      secondary_muscles: "['Abs', 'Biceps', 'Shoulders', 'Upper Back']",
    },
    {
      equipment: "Dumbbell",
      exercise_type: "Strength",
      experience: "Beginner",
      force_type: "Pull",
      mechanics: "Isolation",
      name: "One Arm Standing Dumbbell Curl",
      primary_muscles: "Biceps",
      secondary_muscles: "[]",
    },
  ];

  const [exercise, setExercise] = useState(exerciseData);
  const navigation = useNavigation();

  const handleExercisePress = (selectedExercise) => {
    navigation.navigate("ExcerciseView", { exercise: selectedExercise });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <View className="flex-1 justify-center items-center bg-zinc-800 py-3 rounded-3xl my-2">
        <Text className="text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black px-4 pt-3">
      <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4">
        <TextInput className="flex-1 text-gray-700" placeholder="Freesearch" />
        <AntDesign name="search1" size={24} color={colors.textColor} />
      </View>
      <View className="flex-row justify-between mt-3">
        <SelectDropdown
          data={muscles}
          defaultButtonText="Muscle"
          onSelect={(selectedItem, index) => {
            // handle selection
          }}
          {...dropdownStyles}
        />
        <SelectDropdown
          data={type}
          defaultButtonText="Type"
          onSelect={(selectedItem, index) => {
            // handle selection
          }}
          {...dropdownStyles}
        />
      </View>
      <View
        className="py-2"
        style={{ borderBottomWidth: 1, borderBottomColor: colors.textColor }}
      />
      <FlatList
        data={exercise}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const dropdownStyles = {
  buttonStyle: {
    width: "45%",
    borderRadius: 20,
    backgroundColor: colors.background,
    height: 30,
    borderWidth: 2,
    borderColor: colors.mainGreen,
  },
  buttonTextStyle: {
    fontSize: 18,
    color: colors.mainGreen,
  },
  dropdownStyle: {
    maxHeight: 200,
    borderRadius: 20,
    maxWidth: 300,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.textColor,
  },
  rowStyle: {
    height: 30,
  },
  rowTextStyle: {
    fontSize: 18,
    color: colors.mainGreen,
  },
};

export default ExcercisesScreen;
