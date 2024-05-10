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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  COLORS,
  ROUTES,
  PRIMARY_MUCLES,
  MUCLE_GROUPS,
} from "../../constants/index.js";
import { getExercisesByPrimaryMuscle } from "../api/exerciseApi.ts";
import { getAllExercises, getExercisesByName } from "../../../services/exerciseService.js";

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
  const [searchInput, setSearchInput] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchExercises = async () => {
    try {
      const exerciseList = await getAllExercises(20);
      setExercises(exerciseList);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchExercises();
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchExercisesByName = async () => {
      try {
        const filteredExercises = await getExercisesByName(searchInput);
        setExercises(filteredExercises);
      } catch (error) {
        console.error("Error fetching exercises by name:", error);
      }
    };

    fetchExercisesByName();
  }, [searchInput]);

  const handleExercisePress = (selectedExercise) => {
    navigation.navigate(ROUTES.EXERCISE_VIEW, { exercise: selectedExercise });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.secondaryBackground,
          paddingVertical: 10,
          borderRadius: 20,
          marginVertical: 6,
        }}
      >
        <Text className="text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black px-4 pt-3">
      <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4">
        <TextInput
          className="flex-1 text-gray-700"
          placeholder="Freesearch"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <AntDesign name="search1" size={24} color={colors.textColor} />
      </View>
      <View className="flex-row justify-between mt-3">
        {/* <SelectDropdown
          data={PRIMARY_MUCLES}
          defaultButtonText="Muscle"
          onSelect={(selectedItem, index) => {
            // handle selection
          }}
          {...dropdownStyles}
        /> */}
        {/* <SelectDropdown
          data={type}
          defaultButtonText="Type"
          onSelect={(selectedItem, index) => {
            // handle selection
          }}
          {...dropdownStyles}
        /> */}
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
