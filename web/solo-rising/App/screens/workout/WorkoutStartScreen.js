import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import MuscleGroupImage from "../api/MuscleGroupsImage";
const { height, width } = Dimensions.get("window");

function WorkoutStartScreen({ route }) {
  const navigation = useNavigation();
  const workout = route.params.workout;
  const [timer, setTimer] = useState(0);
  const [data, SetData] = useState(workout.exerciseList);
  const [sets, setSets] = useState([]);

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

  const updateSet = (exerciseIndex, field, value) => {
    const newSets = [...sets]; // Copy the sets state
    newSets[exerciseIndex][field] = value; // Update reps or weight for the exercise
    setSets(newSets); // Update the sets state
  };

  const renderExerciseItem = ({ item, index }) => {
    return (
      <View style={{ width: width - 50, height: height, alignItems: "center" }}>
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

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity className="mr-3 justify-center">
                <AntDesign name="retweet" size={30} color={COLORS.primaryBlue} />
              </TouchableOpacity>
              <View className="flex-row items-center">
                <TextInput
                  // value={sets[index]?.reps || ''} // Access reps from sets state
                  // onChangeText={(text) => updateSet(index, 'reps', text)}
                  placeholder="Reps"
                  placeholderTextColor={COLORS.white}
                  keyboardType="numeric"
                  style={{
                    width: 60,
                    height: 40,
                    marginRight: 10,
                    padding: 10,
                    backgroundColor: COLORS.primaryBackground,
                    borderRadius: 5,
                    fontSize: 16,
                    color: COLORS.white
                  }}
                />
                <Text className="text-lg mr-2 text-white">x</Text>
              </View>
              <TextInput
                // value={sets[index]?.weight || ''} // Access weight from sets state
                // onChangeText={(text) => updateSet(index, 'weight', text)}
                placeholder="Weight"
                placeholderTextColor={COLORS.white}
                keyboardType="numeric"
                style={{
                  width: 80,
                  height: 40,
                  padding: 10,
                  backgroundColor: COLORS.primaryBackground,
                  borderRadius: 5,
                  fontSize: 16,
                  color: COLORS.white
                }}
              />
            </View>

            {/* Add Set Button */}
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
          <TouchableOpacity className="py-1 px-5 rounded-full bg-blue-700 mt-16">
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
              // onScroll={(e) => {
              //   const x = e.nativeEvent.contentOffset.x;
              //   setCurrentIndex((x / width).toFixed(0));
              // }}
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
