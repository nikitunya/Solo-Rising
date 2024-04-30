import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OptionsMenu from "react-native-option-menu";
import { auth } from "../../../services/firebase.config";
import { getWorkouts } from "../../../services/workoutService";

function WorkoutsScreen() {
  const navigation = useNavigation();
  const options = require("../../utils/images/more.png");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userId = auth.currentUser?.uid;
        const userWorkouts = await getWorkouts(userId);
        setWorkouts(userWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const editWorkout = (selectedWorkout) => {
    console.log(999);
    console.log(selectedWorkout);
    // navigation.navigate("ExcerciseView", { exercise: selectedWorkout });
  };

  const handleAction = () => {
    console.log(999)
    // switch (action) {
    //   case "Edit":
    //     console.log(86787687)
    //     // editWorkout(item);
    //     break;
    //   case "Share":
    //     shareWorkout(item);
    //     break;
    //   case "Delete":
    //     deleteWorkout(item);
    //     break;
    //   default:
    //     break;
    // }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View className="flex flex-row justify-between items-center bg-zinc-800 py-3 rounded-3xl my-2 mx-6">
        <Text className="text-white ml-4">{item.title}</Text>
        <TouchableOpacity onPress={() => handleKebabMenuPress(item)}>
          <View className="mr-4">
            <OptionsMenu
              button={
                options
                // <Entypo name="dots-three-vertical" size={18} color="white" />
              }
              buttonStyle={{ width: 30, height: 30, resizeMode: "contain" }}
              destructiveIndex={2}
              options={["Edit", "Share", "Delete", "Cancel"]}
              onSelect={handleAction()}
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
        <View className="flex justify-center items-center bg-green-600 py-1 rounded-3xl my-4 mx-6">
          <AntDesign name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default WorkoutsScreen;
