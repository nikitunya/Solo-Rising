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
  TYPES,
} from "../../constants/index.js";
import {
  getAllExercises,
  getExercisesByFilters,
  getExercisesByName,
} from "../../../services/exerciseService.js";
import CreateExerciseModal from "../exercise/CreateExerciseModal.js";
import { Dropdown } from "react-native-element-dropdown";

function ExcercisesScreen() {
  const [exercises, setExercises] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const navigation = useNavigation();
  const [primaryMuscle, setPrimaryMuscle] = useState(null);
  const [type, setType] = useState(null);
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
        if (searchInput !== null || primaryMuscle !== null || type !== null) {
          const filteredExercises = await getExercisesByFilters(
            searchInput,
            primaryMuscle,
            type
          );
          setExercises(filteredExercises);
        }
      } catch (error) {
        console.error("Error fetching exercises by name:", error);
      }
    };

    fetchExercisesByName();
  }, [searchInput, primaryMuscle, type]);

  const handleExercisePress = (selectedExercise) => {
    navigation.navigate(ROUTES.EXERCISE_VIEW, { exercise: selectedExercise });
  };

  const renderDropdownItem = (item, selectedItem) => (
    <View
      style={[
        styles.itemStyle,
        item.value === selectedItem ? styles.selectedItemStyle : null,
      ]}
    >
      <Text style={styles.itemTextStyle}>{item.label}</Text>
    </View>
  );

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

  const primaryMusclesWithEmptyOption = [{ label: 'None', value: null }, ...PRIMARY_MUCLES];
  const typesWithEmptyOption = [{ label: 'None', value: null }, ...TYPES];

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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={primaryMusclesWithEmptyOption}
          maxHeight={300}
          testID="primary-muscle-dropdown"
          labelField="label"
          valueField="value"
          placeholder={"Primary Muscle"}
          searchPlaceholder="Search..."
          value={primaryMuscle}
          onChange={(item) => {
            setPrimaryMuscle(item.value);
          }}
          renderItem={(item) => renderDropdownItem(item, primaryMuscle)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={typesWithEmptyOption}
          maxHeight={300}
          testID="primary-muscle-dropdown"
          labelField="label"
          valueField="value"
          placeholder={"Type"}
          searchPlaceholder="Search..."
          value={type}
          onChange={(item) => {
            setType(item.value);
          }}
          renderItem={(item) => renderDropdownItem(item, type)}
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
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          setModal(true);
        }}
        testID="add-exercise-button"
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
        testID="create-exercise-modal"
      />
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 8,
    backgroundColor: COLORS.primaryBackground,
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemStyle: {
    backgroundColor: COLORS.primaryBackground,
    padding: 10,
  },
  selectedItemStyle: {
    backgroundColor: COLORS.primaryBlue,
  },
  itemTextStyle: {
    color: "white",
  },
};

export default ExcercisesScreen;
