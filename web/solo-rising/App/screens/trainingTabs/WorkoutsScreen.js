import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { deleteWorkout, getWorkouts } from "../../../services/workoutService";
import ActionSheet from "react-native-actionsheet";
import { ROUTES } from "../../constants";
import { saveExercises } from "../../../services/exerciseService";
import WorkoutPreviewModal from "../workout/WorkoutPreviewModal";

const OPTIONS = ["Edit", "Start", "Delete", "Cancel"];
const CANCEL_BUTTON_INDEX = 3;
const DESTRUCTIVE_BUTTON_INDEX = 2;

function WorkoutsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [workouts, setWorkouts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const userWorkouts = await getWorkouts();
      setWorkouts(userWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
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

  const handleAction = (index, workout) => { // TODO: fix here again deletes wrong index
    switch (index) {
      case 0:
        navigation.navigate(ROUTES.WORKOUT_EDIT, selectedWorkout);
        break;
      case 1:
        setModal(true);
        setSelectedWorkout(workout);
        // navigation.navigate(ROUTES.WORKOUT_START, selectedWorkout);
        break;
      case 2:
        console.log(index)
        deleteWorkout(workout.id);
        fetchWorkouts();
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
          navigation.navigate(ROUTES.WORKOUT_CREATE);
        }}
      >
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <Text className="text-white">{modal}</Text>
      <WorkoutPreviewModal
        modal={modal}
        onClose={() => setModal(false)}
        workout={selectedWorkout}
      />
    </View>
  );
}

export default WorkoutsScreen;
