import React, { useEffect, useState } from "react";
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
import { ROUTES } from "../../constants/index.js";
import { getExercisesByPrimaryMuscle } from "../api/exerciseApi.ts";

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

  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchExercises = async () => {
  //     try {
  //       const exerciseList = await getExercisesByPrimaryMuscle("chest");
  //       setExercises(exerciseList);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchExercises();
  // }, []);

  // console.log(exercises);

  const handleExercisePress = (selectedExercise) => {
    navigation.navigate(ROUTES.EXERCISE_VIEW, { exercise: selectedExercise });
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
      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Text>Loading...</Text>
      )}
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
