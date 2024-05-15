import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Border from "../../components/Border";
import { ROUTES, XP } from "../../constants";
import { createTraining } from "../../../services/trainingService";

function WorkoutReviewScreen({ route }) {
  const navigation = useNavigation();
  const [volumeXp, setVolumeXp] = useState(0);
  const [prXp, setPrXp] = useState(0);
  const [achivmentXp, setAchievmentXp] = useState(0);
  const [durationXp, setDurationXp] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const training = route.params.training;

  const calculateExpierience = () => {
    const totalSeconds = training.duration;
    const tenMinuteIntervals = Math.ceil(totalSeconds / 600) - 1;
  
    setDurationXp(tenMinuteIntervals * XP.XP_FOR_DURATION);
    setVolumeXp(training.volume * XP.XP_FOR_KG);
    setTotalXp(volumeXp + prXp + achivmentXp + durationXp);
  };

  const handleCreate = () => {
    calculateExpierience();
    const updatedTraining = {
      ...training,
      totalXp: totalXp,
      xp : {
        volumeXp,
        prXp,
        achivmentXp,
        durationXp
      }
    }
    createTraining(updatedTraining);
    navigation.navigate(ROUTES.TRAINING)
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="bg-zinc-800 h-28 rounded-bl-3xl rounded-br-3xl flex-row justify-between px-4">
        <View className="flex-row justify-start mt-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700"
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="items-center mr-5">
          <Text className="mt-12 text-lg font-bold text-white">
            Review your workout before finish
          </Text>
          <Text className="text-sm font-bold text-white">
            You can go back to edit your sets
          </Text>
        </View>
      </View>
      <View className="items-center justify-center">
        <Text className="text-3xl font-bold text-white mt-4">
          {training.title}
        </Text>
      </View>
      <Border />
      <View className="items-center flex-row justify-between">
        <View className="ml-10">
          <Text className="text-lg font-bold text-white">Volume</Text>
          <Text className="text-base text-white">{training.volume} kgs</Text>
        </View>
        <View className="mr-10">
          <Text className="text-lg font-bold text-white">Time</Text>
          <Text className="text-base text-white">{training.duration}</Text>
        </View>
      </View>
      <Border />
      <View className="items-center justify-center">
        <Text className="text-lg font-bold text-white">Breakdown</Text>
      </View>
      <ScrollView>
        {training.exercises.map((exercise) => (
          <View
            key={exercise.name}
            className="mt-4 px-4 justify-between bg-zinc-800 mx-3 rounded-lg"
            style={{ marginBottom: 20 }}
          >
            <Text className="text-lg font-bold text-white">
              {exercise.name}
            </Text>

            <View style={{ marginTop: 10 }}>
              {exercise.sets.map((set, setIndex) => (
                <View
                  key={setIndex}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    paddingBottom: 5,
                    marginBottom: 10,
                  }}
                >
                  <Text className="text-base text-white">
                    Set {setIndex + 1}
                  </Text>
                  <Text className="text-base text-white">{set.reps} reps</Text>
                  <Text className="text-base text-white">{set.weight} kgs</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => handleCreate()}>
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl m-4">
          <Text className="text-white text-lg">End Workout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default WorkoutReviewScreen;
