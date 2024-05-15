import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

function FriendsScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center justify-between mt-14">
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.VIEW_FRIENDS)}
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl ml-4">
            <Text className="text-white py-1 px-9">View Friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.ADD_FRIEND)}
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl mr-4">
            <Text className="text-white py-1 px-9">Add Friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.WORKOUT_CREATE);
        }}
      >
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <Text className="text-white font-bold text-lg">Create Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FriendsScreen;
