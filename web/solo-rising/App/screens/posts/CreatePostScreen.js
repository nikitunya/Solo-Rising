import React, { useState } from "react";
import DismissKeyboard from "../../components/DismissKeyboard";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../../constants";
import { auth } from "../../../services/firebase.config";
import { createPost } from "../../../services/postsService";
import { Timestamp } from "firebase/firestore";

function CreatePostScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreatePost = () => {
    const currentDate = new Date();
    if (!name || !description) {
      alert("All fields are required.");
      return;
    }
    const post = {
      name: name,
      description: description,
      exercises: [],
      field: "",
      image: "",
      requirements: "",
      unlockedBy: [auth.currentUser.uid],
      date: Timestamp.fromDate(currentDate),
    };
    createPost(post);
    navigation.navigate(ROUTES.FRIENDS);
  };
  return (
    <DismissKeyboard>
      <View className="flex-1 bg-neutral-900">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2 bg-blue-700"
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="bg-zinc-800 p-6 rounded-3xl mt-5 mx-4">
          <View className="form space-y-2">
            <Text className="text-white ml-4">Name</Text>
            <TextInput
              className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={COLORS.white}
            />
          </View>
          <Text className="text-white ml-4">Description</Text>
          <TextInput
            className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleCreatePost();
          }}
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
            <Text className="text-lg text-white font-bold">Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
}

export default CreatePostScreen;
