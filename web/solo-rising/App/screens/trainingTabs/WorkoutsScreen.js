import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { deleteWorkout, getWorkouts } from "../../../services/workoutService";
import ActionSheet from "react-native-actionsheet";
import { ROUTES } from "../../constants";
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
  const actionSheetRef = useRef(null);

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

  const showActionSheet = (workout) => {
    setSelectedWorkout(workout);
    actionSheetRef.current.show();
  };

  const handleAction = (index, workout) => {
    switch (index) {
      case 0:
        navigation.navigate(ROUTES.WORKOUT_EDIT, workout);
        break;
      case 1:
        setModal(true);
        setSelectedWorkout(workout);
        break;
      case 2:
        deleteWorkout(workout.id);
        fetchWorkouts();
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => showActionSheet(item)}>
      <View className="flex flex-row justify-between items-center bg-zinc-800 py-3 rounded-3xl my-2 mx-6">
        <Text className="text-white ml-4">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-5">
      <FlatList data={workouts} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.WORKOUT_CREATE)}>
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        options={OPTIONS}
        cancelButtonIndex={CANCEL_BUTTON_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_BUTTON_INDEX}
        onPress={(index) => {
          if (selectedWorkout) {
            handleAction(index, selectedWorkout);
          }
        }}
      />
      {modal && (
        <WorkoutPreviewModal
          modal={modal}
          onClose={() => setModal(false)}
          workout={selectedWorkout}
        />
      )}
    </View>
  );
}

export default WorkoutsScreen;
