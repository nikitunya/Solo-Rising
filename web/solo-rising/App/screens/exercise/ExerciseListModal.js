import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AddExerciseModal from "./AddExerciseModal";
import { useIsFocused } from "@react-navigation/native";
import {
  getAllExercises,
  getExercisesByFilters,
  getExercisesByName,
} from "../../../services/exerciseService";
import { COLORS, PRIMARY_MUCLES, TYPES } from "../../constants";
import { Dropdown } from "react-native-element-dropdown";

const ExerciseListModal = ({ modal, onClose, addExerciseToList }) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const isFocused = useIsFocused();
  const [searchInput, setSearchInput] = useState(null);
  const [primaryMuscle, setPrimaryMuscle] = useState(null);
  const [type, setType] = useState(null);

  const fetchExercises = async () => {
    try {
      const exerciseList = await getAllExercises();
      setExerciseList(exerciseList);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    const fetchExercisesByName = async () => {
      try {
        if (searchInput !== null || primaryMuscle !== null || type !== null) {
          const filteredExercises = await getExercisesByFilters(
            searchInput,
            primaryMuscle,
            type
          );
          setExerciseList(filteredExercises);
        }
      } catch (error) {
        console.error("Error fetching exercises by name:", error);
      }
    };

    fetchExercisesByName();
  }, [searchInput, primaryMuscle, type]);

  useEffect(() => {
    if (isFocused) {
      fetchExercises();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <View className="justify-center items-center bg-neutral-800 py-3 rounded-lg my-2">
        <Text className="text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleExercisePress = (item) => {
    setSelectedExercise(item);
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

  const primaryMusclesWithEmptyOption = [
    { label: "None", value: null },
    ...PRIMARY_MUCLES,
  ];
  const typesWithEmptyOption = [{ label: "None", value: null }, ...TYPES];

  return (
    <Modal
      visible={modal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-neutral-900 pt-8">
        <View className="px-4">
          <View className="flex-row items-center justify-between bg-gray-100 rounded-lg py-2 px-4">
            <TextInput
              className="flex-1 text-gray-700"
              placeholder="Freesearch"
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
            <AntDesign name="search1" size={24} color="black" />
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
        </View>
        <View
          className="py-2"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "white",
          }}
        />
        <FlatList
          className="mt-4 mx-4"
          data={exerciseList}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
      <AddExerciseModal
        visible={modal}
        onClose={() => {
          setSelectedExercise(null);
          onClose();
        }}
        exercise={selectedExercise}
        addToWorkout={true}
        addExerciseToList={addExerciseToList}
      />
    </Modal>
  );
};

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

export default ExerciseListModal;
