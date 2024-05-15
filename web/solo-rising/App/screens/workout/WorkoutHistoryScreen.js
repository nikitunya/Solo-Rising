import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Border from "../../components/Border";
import { useNavigation } from "@react-navigation/native";
import { getTrainings } from "../../../services/trainingService";
import { ROUTES } from "../../constants";

function WorkoutHistoryScreen() {
  const navigation = useNavigation();
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const trainingsData = await getTrainings();
      console.log(trainingsData);
      setTrainings(trainingsData);
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const formattedDate = new Date(date.seconds * 1000); // Convert seconds to milliseconds
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleWorkoutPress = (selectedWorkout) => {
    navigation.navigate(ROUTES.WORKOUT_REVIEW, { training: selectedWorkout, view: true });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-2" onPress={() => handleWorkoutPress(item)}>
      <View className="flex-row justify-between items-center bg-zinc-800 py-4 px-4 rounded-3xl my-1 mx-4">
        <View className="flex-1 flex-row items-center justify-between">
          <Text className="text-base text-white">{formatDate(item.date)}</Text>
          <Text className="text-3lg font-bold text-white">{item.title}</Text>
          <Text className="text-base text-white">{item.volume} kgs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <Text className="text-white font-bold text-3xl">My Workouts</Text>
      </View>
      <Border />
      {trainings.length > 0 ? (
        <FlatList
          data={trainings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default WorkoutHistoryScreen;
