import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ExcercisesScreen from "../trainingTabs/ExcercisesScreen";
import SelectDropdown from "react-native-select-dropdown";

function WorkoutCreateScreen() {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [exercise, setExercise] = useState([
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
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <View className="justify-center items-center bg-zinc-800 py-3 rounded-3xl my-2">
        <Text className="text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-black">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2 bg-green-600"
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="mx-5">
          <TextInput
            className="p-4 bg-zinc-700 text-green-600 rounded-2xl text-xl font-bold text-center"
            placeholder="email"
            value="Workout Name"
          />
          <TouchableOpacity
            onPress={() => {
              setModal(true);
            }}
          >
            <View className="flex justify-center items-center bg-green-600 py-1 rounded-3xl my-4">
              <AntDesign name="plus" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <Modal visible={modal}>
          <View className="flex-1 bg-green-600 px-4 pt-8">
            <View className="justify-center items-end py-1 rounded-3xl my-4">
              <AntDesign
                name="close"
                size={30}
                color="white"
                onPress={() => setModal(false)}
              />
            </View>
            <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4">
              <TextInput
                className="flex-1 text-gray-700"
                placeholder="Freesearch"
              />
              <AntDesign name="search1" size={24} color="white" />
            </View>
            <View
              className="py-2"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "white",
              }}
            />
            <FlatList
              data={exercise}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
            />
          </View>
        </Modal>
      </View>
    </DismissKeyboard>
  );
}

export default WorkoutCreateScreen;
