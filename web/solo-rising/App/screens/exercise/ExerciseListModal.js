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
import { getAllExercises, getExercisesByName } from "../../../services/exerciseService";

const ExerciseListModal = ({ modal, onClose, addExerciseToList }) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const isFocused = useIsFocused();
  const [searchInput, setSearchInput] = useState("");

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
        const filteredExercises = await getExercisesByName(searchInput);
        setExerciseList(filteredExercises);
      } catch (error) {
        console.error("Error fetching exercises by name:", error);
      }
    };

    fetchExercisesByName();
  }, [searchInput]);

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

export default ExerciseListModal;
