import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ExerciseListModal from "../exercise/ExerciseListModal";
import { updateWorkout } from "../../../services/workoutService";
import AddExerciseModal from "../exercise/AddExerciseModal";

function WorkoutEditScreen({ route }) {
  const workout = route.params;

  const navigation = useNavigation();

  const [title, setTitle] = useState(workout.title);
  const [modal, setModal] = useState(false);
  const [exerciseList, setExerciseList] = useState(workout.exerciseList);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <View className="flex-row justify-between items-center bg-neutral-800 py-3 rounded-lg my-2 px-4">
        <Text className="text-white font-bold text-center flex-1">
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => handleDeleteExercise(item)}>
          <AntDesign name="close" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const addExerciseToList = (exercise) => {
    setExerciseList([...exerciseList, exercise]);
  };

  const handleExercisePress = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleDeleteExercise = (exercise) => {
    setExerciseList(prevExerciseList =>
      prevExerciseList.filter(x => x !== exercise)
    );
  }

  const handleUpdateWorkout = async () => {
    try {
      await updateWorkout(workout.id, {
        title,
        exerciseList,
      });
      navigation.navigate("Training");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-neutral-900">
        <SafeAreaView className="flex">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="flex text-white ml-20 text-xl font-bold">
              New Workout
            </Text>
          </View>
          <View
            className="py-2 border-neutral-700"
            style={{
              borderBottomWidth: 1,
            }}
          />
        </SafeAreaView>
        <View className="mx-5">
          <TextInput
            className="p-4 bg-neutral-950 text-white rounded-2xl text-xl font-bold text-center "
            placeholderTextColor="#aaaaaa"
            multiline={true}
            placeholder={"Untitled Workout\nE.G Chest Day"}
            value={title}
            onChangeText={setTitle}
          />
          <FlatList
            className="mt-4"
            data={exerciseList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
          <TouchableOpacity
            onPress={() => {
              setModal(true);
            }}
          >
            <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4">
              <Text className="flex text-white text-base font-bold p-1">
                ADD EXCERCISES TO WORKOUT
              </Text>
            </View>
          </TouchableOpacity>
          <ExerciseListModal
            modal={modal}
            onClose={() => setModal(false)}
            addExerciseToList={addExerciseToList}
          ></ExerciseListModal>
          <AddExerciseModal
            visible={modal}
            onClose={() => {
              setSelectedExercise(null);
              () => setModal(false);
            }}
            exercise={selectedExercise}
            addToWorkout={false}
            addExerciseToList={addExerciseToList}
          />
        </View>
        <TouchableOpacity
          onPress={handleUpdateWorkout}
          className="absolute bottom-4 left-0 right-0 m-6"
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4">
            <Text className="flex text-white text-base font-bold p-1">
              UPDATE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
}

export default WorkoutEditScreen;
