import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../services/firebase.config";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView className="flex">
      <View className="flex-row justify-center">
        <TouchableOpacity onPress={() => handleSignOut()}>
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl m-4">
            <AntDesign name="plus" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
