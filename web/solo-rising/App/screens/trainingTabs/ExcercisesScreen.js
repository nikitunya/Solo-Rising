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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  COLORS,
  ROUTES,
  PRIMARY_MUCLES,
  MUCLE_GROUPS,
} from "../../constants/index.js";
import {
  getAllExercises,
  getExercisesByName,
} from "../../../services/exerciseService.js";
import CreateExerciseModal from "../exercise/CreateExerciseModal.js";

function ExcercisesScreen() {
  const [exercises, setExercises] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modal, setModal] = useState(false);

  const fetchExercises = async () => {
    try {
      const exerciseList = await getAllExercises();
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
      <View className="flex-row items-center mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text className="flex text-white ml-20 text-xl font-bold">
          Exercises
        </Text>
      </View>
      <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4 mt-8">
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
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          setModal(true)
        }}
      >
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <CreateExerciseModal
        visible={modal}
        onClose={() => {
          setModal(false);
        }}
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
