import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import MuscleGroupImage from "../api/MuscleGroupsImage";
import { COLORS, ROUTES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { Timestamp } from "firebase/firestore";

const { height, width } = Dimensions.get("window");

function WorkoutStartScreen({ route }) {
  const navigation = useNavigation();
  const workout = route.params.workout;
  const [timer, setTimer] = useState(0);
  const [data, setData] = useState(
    workout.exerciseList.map((exercise) => ({
      ...exercise,
      sets: [{ reps: "", weight: "" }],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const addSet = (exerciseIndex) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[exerciseIndex].sets.push({ reps: "", weight: "" });
      return newData;
    });
  };

  const calculateVolume = (sets) => {
    return sets.reduce((totalVolume, set) => {
      const reps = parseInt(set.reps);
      const weight = parseFloat(set.weight);
      if (!isNaN(reps) && !isNaN(weight)) {
        totalVolume += reps * weight;
      }
      return totalVolume;
    }, 0);
  };

  const saveWorkout = () => {
    const currentDate = new Date();
    const totalVolume = data.reduce((total, exercise) => {
      return total + calculateVolume(exercise.sets);
    }, 0);

    const training = {
      title: workout.title,
      duration: formatTime(timer),
      date: Timestamp.fromDate(currentDate),
      time: currentDate.toLocaleTimeString(),
      exercises: data.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
        primary_muscles: exercise.primary_muscles,
        secondary_muscles: exercise.secondary_muscles
      })),
      volume: totalVolume
    };

    navigation.navigate(ROUTES.WORKOUT_REVIEW, { training: training });
    // Here you can save `newWorkout` to your data store or perform any other action with it
    // console.log("Saved Workout:", training);
  };

  const renderExerciseItem = ({ item, index }) => {
    const handleRepsChange = (text, setIndex) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index].sets[setIndex].reps = text;
        return newData;
      });
      // console.log(data[])
    };

    const handleWeightChange = (text, setIndex) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index].sets[setIndex].weight = text;
        return newData;
      });
    };

    const copySet = (setIndex) => {
      setData((prevData) => {
        const newData = [...prevData];
        const aboveSet = { ...newData[index].sets[setIndex - 1] };
        const newSet = { ...aboveSet };
        newData[index].sets.splice(setIndex, 0, newSet);
        return newData;
      });
    };

    const removeSet = (setIndexToRemove) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index].sets.splice(setIndexToRemove, 1);
        return newData;
      });
    };

    return (
      <View style={{ width: width, height: height, alignItems: "center" }}>
        <TouchableOpacity
          disabled={true}
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: COLORS.secondaryBackground,
            borderRadius: 20,
          }}
        >
          <View className="items-center">
            <Text className="text-white text-lg font-bold mt-2 text-center">
              {item.name}
            </Text>
            <MuscleGroupImage
              primaryMuscleGroups={item.primary_muscles}
              secondaryMuscleGroups={item.secondary_muscles}
              imageSize={250}
            />
            <ScrollView
              style={{ maxHeight: 250, width: "70%" }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {item.sets.map((set, setIndex) => (
                <View key={setIndex} className="flex-row justify-between mt-2">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      className="mr-3 justify-center"
                      onPress={() => copySet(setIndex + 1)}
                    >
                      <AntDesign
                        name="retweet"
                        size={30}
                        color={COLORS.primaryBlue}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholder="Reps"
                      placeholderTextColor={COLORS.white}
                      keyboardType="numeric"
                      className="mr-2 bg-neutral-900 rounded-lg text-lg text-white w-16 h-10 text-center"
                      value={set.reps}
                      onChangeText={(text) => handleRepsChange(text, setIndex)}
                    />
                    <Text className="text-lg mr-2 text-white">x</Text>
                    <TextInput
                      placeholder="Weight"
                      placeholderTextColor={COLORS.white}
                      keyboardType="numeric"
                      className="mr-2 bg-neutral-900 rounded-lg text-lg text-white w-16 h-10 text-center"
                      value={set.weight}
                      onChangeText={(text) =>
                        handleWeightChange(text, setIndex)
                      }
                    />
                    <TouchableOpacity
                      className="ml-3 justify-center"
                      onPress={() => removeSet(setIndex)}
                    >
                      <AntDesign name="close" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => addSet(index)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: COLORS.primaryBlue,
                  borderRadius: 50,
                }}
              >
                Add Set
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="bg-zinc-800 h-28 rounded-bl-3xl rounded-br-3xl flex-row justify-between px-4">
        <View>
          <Text className="mt-12 text-2xl font-bold text-white ml-6">
            {workout.title}
          </Text>
          <Text className="text-xl font-bold text-white ml-6">
            {formatTime(timer)}
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="py-1 px-5 rounded-full bg-blue-700 mt-16"
            onPress={saveWorkout}
          >
            <Text className="text-xl font-bold text-white">End</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-16 ml-3"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="close" size={35} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row mt-4">
        <View className="flex-1 justify-center items-center">
          <View
            style={{
              height: height / 2 + 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              renderItem={renderExerciseItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default WorkoutStartScreen;
