import React from "react";
import { TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utils/colors/index.js";
import SelectDropdown from "react-native-select-dropdown";

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
  // const difficulty = ["begginer", "intermediate", "expert"];

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
