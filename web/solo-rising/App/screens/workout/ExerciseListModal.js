import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import AddExerciseModal from "./AddExerciseModal";

const ExerciseListModal = ({ modal, onClose, addExerciseToList }) => {

  const [exerciseList, setExerciseList] = useState([
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
  ]);
  const [selectedExercise, setSelectedExercise] = useState(null);

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
        // onClose={() => setSelectedExercise(null)}
        exercise={selectedExercise}
        addToWorkout={true}
        addExerciseToList={addExerciseToList}
      />
    </Modal>
  );
};

export default ExerciseListModal;