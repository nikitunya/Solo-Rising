import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MuscleGroupImage from "../api/MuscleGroupsImage";
import { FlatList } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

function WorkoutPreviewModal({ modal, onClose, workout }) {
  const navigation = useNavigation();

  if (!workout) return null;

  const primaryMuscles = [];
  const secondaryMuscles = [];
  const exerciseNames = [];

  workout.exerciseList.forEach((exercise) => {
    if (exercise.primary_muscles) {
      primaryMuscles.push(exercise.primary_muscles);
    }
    if (exercise.name) {
      exerciseNames.push(exercise.name);
    }
    if (exercise.secondary_muscles) {
      const jsonString = exercise.secondary_muscles.replace(/'/g, '"');
      const secondaryList = JSON.parse(jsonString);
      secondaryList.forEach((muscle) => {
        if (!secondaryMuscles.includes(muscle)) {
          secondaryMuscles.push(muscle);
        }
      });
    }
  });

  const primaryMusclesString = JSON.stringify(primaryMuscles).replace(
    /"/g,
    "'"
  );

  const secondaryMusclesString = JSON.stringify(secondaryMuscles).replace(
    /"/g,
    "'"
  );

  const renderItem = ({ item }) => (
    <Text className="text-white my-1">{item.name}</Text>
  );

  const handleStartWorkout = () => {
    navigation.navigate(ROUTES.WORKOUT_START);
    onClose(); // Close the modal
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
            Workout Preview
          </Text>
          <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <MuscleGroupImage
              primaryMuscleGroups={primaryMusclesString}
              secondaryMuscleGroups={secondaryMusclesString}
            />
          </View>
        </View>
        <View
          className="py-2 border-white"
          style={{
            borderBottomWidth: 1,
          }}
        />
        <View className="justify-center items-center py-4">
          <Text className="text-white font-bold mb-4">Planned exercises:</Text>
          <FlatList
            data={workout.exerciseList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
        <View className="absolute bottom-10 left-0 right-0 flex items-center">
          <TouchableOpacity
            className="py-2 px-16 rounded-lg bg-blue-700"
            onPress={() => handleStartWorkout()}
          >
            <Text className="text-xl font-bold text-white">Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default WorkoutPreviewModal;
