import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import MuscleGroupImage from "../Components/MuscleGroupsImage";

function ExcerciseViewScreen({ route }) {
  const { exercise } = route.params;
  const navigation = useNavigation();
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    const options = {
      method: "GET",
      url: "https://muscle-group-image-generator.p.rapidapi.com/getMulticolorImage",
      params: {
        primaryColor: "240,100,80",
        secondaryColor: "200,100,80",
        primaryMuscleGroups: "chest",
        secondaryMuscleGroups: "triceps,shoulders",
        transparentBackground: "0",
      },
      headers: {
        "X-RapidAPI-Key": "e26bdbf131msha5c54e8eb398c29p145b98jsn32e1c9d486dd",
        "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
      },
      responseType: "arraybuffer",
    };

    try {
      const response = await axios.request(options);
      const imageFile = new Blob([response.data]);
      const imageUrl = URL.createObjectURL(imageFile);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []); // Run only once when component mounts

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
        <View className="justify-center items-center py-4">
          <Text className="text-white text-2xl font-bold mb-2">
            {exercise.name}
          </Text>
          <Text className="text-white text-lg capitalize mb-2">
            Type: {exercise.exercise_type}
          </Text>
          <Text className="text-white text-lg capitalize">
            difficulty: {exercise.experience}
          </Text>
        </View>
        <TouchableOpacity>
          <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <Text className="text-white text-lg">Personal Record:</Text>
            <Text className="text-white text-xl">100 kg</Text>
            <Text className="text-white">{exercise.secondary_muscles}</Text>
          </View>
        </TouchableOpacity>
        <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
          <MuscleGroupImage muscleGroups={["biceps", "triceps", "hamstring"]} />
          {/* <MuscleGroupImage primaryMuscles={['chest']} secondaryMuscles={['triceps', 'shoulders']} /> */}
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default ExcerciseViewScreen;
