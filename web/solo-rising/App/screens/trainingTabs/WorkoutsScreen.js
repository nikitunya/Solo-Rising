import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../services/firebase.config";
import { deleteWorkout, getWorkouts } from "../../../services/workoutService";
import ActionSheet from "react-native-actionsheet";

const OPTIONS = ["Edit", "Delete", "Cancel"];
const CANCEL_BUTTON_INDEX = 2;
const DESTRUCTIVE_BUTTON_INDEX = 1;

function WorkoutsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userWorkouts = await getWorkouts();
        setWorkouts(userWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    if (isFocused) {
      fetchWorkouts();
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedWorkout !== null) {
      this.ActionSheet.show();
    }
  }, [selectedWorkout]);

  const showActionSheet = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleAction = (index, workout) => {
    switch (index) {
      case 0:
        navigation.navigate("WorkoutEdit", selectedWorkout);
        break;
      case 1:
        let updatedWorkouts = deleteWorkout(workout.id);
        setWorkouts(updatedWorkouts);
        console.log("Succesfully Deleted");
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => showActionSheet(item)}>
      <View className="flex flex-row justify-between items-center bg-zinc-800 py-3 rounded-3xl my-2 mx-6">
        <Text className="text-white ml-4">{item.title}</Text>
        <TouchableOpacity>
          <View className="mr-4">
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              options={OPTIONS}
              cancelButtonIndex={CANCEL_BUTTON_INDEX}
              destructiveButtonIndex={DESTRUCTIVE_BUTTON_INDEX}
              onPress={(index) => {
                handleAction(index, item);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-5">
      <FlatList data={workouts} renderItem={renderItem} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("WorkoutCreate");
        }}
      >
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default WorkoutsScreen;
