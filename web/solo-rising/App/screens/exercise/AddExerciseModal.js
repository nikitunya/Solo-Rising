import { Modal, Text, TouchableOpacity, View } from "react-native";
import MuscleGroupImage from "../api/MuscleGroupsImage";
import { AntDesign } from "@expo/vector-icons";

const AddExerciseModal = ({
  modal,
  onClose,
  exercise,
  addToWorkout,
  addExerciseToList,
}) => {
  if (!exercise) return null;

  const handleAddExercise = () => {
    if (addExerciseToList) {
      addExerciseToList(exercise);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={modal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-neutral-900">
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
        {addToWorkout ? (
          <TouchableOpacity onPress={() => handleAddExercise(onClose)}>
            <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl m-4">
              <AntDesign name="plus" size={30} color="white" />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </Modal>
  );
};

export default AddExerciseModal;